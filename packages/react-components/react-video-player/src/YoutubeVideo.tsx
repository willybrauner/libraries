import React, {
  CSSProperties,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
const componentName: string = "YoutubeVideo";
const debug = require("debug")(`lib:${componentName}`);

/**
 * YoutubeVideo Props
 */
interface IProps {
  /**
   * Inquire video ID
   */
  id?: string;

  /**
   * Inquire video URL
   */
  url?: string;

  /**
   * Play, pause, resume video
   */
  play: boolean;

  /**
   * Add root component style
   */
  style?: CSSProperties;

  /**
   * Show controls on video
   * Must be hosted by a Plus account or higher
   * @doc: https://developers.google.com/youtube/iframe_api_reference
   * @default true
   */
  controls?: boolean;

  /**
   * TODO TEST
   */
  autoPlay?: boolean;

  /**
   * Add className to component root
   */
  className?: string;
}

YoutubeVideo.defaultProps = {
  controls: true,
  autoPlay: false
};

/**
 * resolver
 */
// @ts-ignore
const previous = window.onYouTubeIframeAPIReady;
const youtubeReady = new Promise(resolve => {
  if (previous) {
    return previous();
  }
  // @ts-ignore
  window.onYouTubeIframeAPIReady = () => {
    // @ts-ignore
    resolve(window.YT);
  };
});

/**
 * YoutubeVideo
 * @param props
 */
function YoutubeVideo(props: IProps) {
  const rootRef = useRef(null);
  const [player, setPlayer] = useState(null);
  const youtubeScriptId = "__youtube";

  /**
   * Extract ID from youtube URL
   */
  const getIdFromUrl = useMemo((): string | null => {
    if (!props?.url) return;
    const regExp = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
    const match = props?.url?.match(regExp);
    return match?.[1] ?? null;
  }, [props?.url]);

  /**
   * Select ID from id props or url prod, depends on who inquired
   */
  const [selectedId, setSelectedId] = useState<string>(
    props?.id || getIdFromUrl
  );
  useEffect(() => {
    setSelectedId(props?.id || getIdFromUrl);
  }, [props?.id, getIdFromUrl]);

  /**
   * Check if script tag exist
   * @param scriptId
   */
  const scriptTagExist = (scriptId = youtubeScriptId): boolean =>
    document.getElementById(scriptId) != null;

  /**
   * Create script tag
   */
  const injectScriptTag = (
    youtubeScriptSrc = "https://www.youtube.com/iframe_api",
    scriptId = youtubeScriptId
  ) => {
    // create script tag
    const scriptTag = document.createElement("script");
    scriptTag.src = youtubeScriptSrc;
    scriptTag.setAttribute("id", scriptId);
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(scriptTag, firstScriptTag);
  };

  /**
   * Init
   * @param videoId
   */
  useEffect(() => {
    //if (!scriptTagExist()) {
    //debug("Youtube script tag doesn't exist, inject it...");
    injectScriptTag();
    //}

    youtubeReady.then(YT => {
      // @ts-ignore
      const myPlayer = new YT.Player(`${componentName}-${selectedId}`, {
        videoId: selectedId,
        playerVars: {
          width: props?.style?.width,
          height: props?.style?.height,
          autoplay: props?.autoPlay,
          controls: props?.controls
          // loop: props?.loop
          // showinfo: props?.showinfo
        },
        events: {
          onReady: (e: any) => {
            debug("onReady", e);
          },
          onStateChange: (e: any) => {
            debug("onStateChange", e);
          },
          onError: (e: any) => {
            debug("onError", e);
          }
        }
      });

      setPlayer(myPlayer);
    });
  }, [selectedId]);

  useEffect(() => {
    debug("player", player);
  }, [player]);

  return (
    <div
      ref={rootRef}
      className={[`${componentName}-${selectedId}`, props.className]
        .filter(e => e)
        .join(" ")}
      id={`${componentName}-${selectedId}`}
      style={props?.style}
    />
  );
}

export { YoutubeVideo };
