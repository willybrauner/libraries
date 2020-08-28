import React, {
  CSSProperties,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
// @ts-ignore
import YouTubePlayer from "youtube-player";
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
   * @default true
   */
  controls?: boolean;

  /**
   * @default false
   */
  autoPlay?: boolean;

  /**
   * @default false
   */
  loop?: boolean;

  /**
   * Whether the video plays inline on supported mobile devices.
   * To force the device to play the video in fullscreen mode instead, set this value to false.
   * @default true
   */
  playsInline?: boolean;

  /**
   * Remove decorative elements on video
   * @default false
   */
  modestBranding?: boolean;

  /**
   * Disable keyboard video shortcuts
   * @default false
   */
  disableKb?: boolean;

  /**
   *
   */
  end?: (time: number) => void;

  /**
   * Active fullScreen button
   * @default true
   */
  fs?: boolean;

  /**
   * Execute function on play state callback
   */
  onPlay?: () => void;

  /**
   * Execute function on pause state callback
   */
  onPause?: () => void;

  /**
   * Execute function on ended state callback
   * Is not fired if loop is true
   */
  onEnded?: () => void;

  /**
   * Execute function when a new video is buffering
   */
  onBuffering?: () => void;

  /**
   * Add className to component root
   */
  className?: string;
}

YoutubeVideo.defaultProps = {
  controls: true,
  autoPlay: false,
  playsinline: true,
  modestBranding: false,
  disableKb: false,
  fs: true
};

/**
 * YoutubeVideo
 * use youtube iframe API with youtube-player (https://github.com/gajus/youtube-player)
 * @doc: https://developers.google.com/youtube/iframe_api_reference
 * @param props
 */
function YoutubeVideo(props: IProps) {
  const rootRef = useRef(null);
  const [player, setPlayer] = useState(null);

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
  const [selectedId, setSelectedId] = useState<string>(null);
  const previousSelectedId = useRef(null);
  useEffect(() => {
    setSelectedId(props?.id || getIdFromUrl);
  }, [props?.id, getIdFromUrl]);

  useEffect(() => {
    previousSelectedId.current = selectedId;
  }, [selectedId]);

  /**
   * Init
   * @param videoId
   */
  useEffect(() => {
    const myPlayer = YouTubePlayer(selectedId, {
      videoId: selectedId,
      width: props?.style?.width,
      height: props?.style?.height,
      playerVars: {
        autoplay: props?.autoPlay ? 1 : 0,
        controls: props?.controls ? 1 : 0,
        loop: props?.loop ? 1 : 0,
        playsinline: props.playsInline ? 1 : 0,
        modestbranding: 1
      }
    });

    setPlayer(myPlayer);
  }, [selectedId]);

  /**
   * TODO
   * test to reset
   */
  const initialMount = useRef(true);
  useEffect(() => {
    if (initialMount) {
      initialMount.current = false;
      return;
    }
    debug("update player...");
    player?.getIframe().then((iframe: any) => {
      debug("el to transform as iframe", iframe);
      if (selectedId) iframe.setAttribute("id", selectedId);
      else iframe.removeAttribute("id");
    });
  }, [selectedId]);

  /**
   * Events
   * "-1": "unstarted",
   0: "ended",
   1: "playing",
   2: "paused",
   3: "buffering",
   5: "video cued"
   */
  useEffect(() => {
    const playerState = {
      UNSTARTED: -1,
      ENDED: 0,
      PLAYING: 1,
      PAUSED: 2,
      BUFFERING: 3,
      CUED: 5
    };

    const handler = (e: any) => {
      if (!e?.data) return;

      debug(e);
      switch (e?.data) {
        case playerState.UNSTARTED:
          debug("unstart");
          break;
        case playerState.ENDED:
          props?.onEnded?.();
          break;
        case playerState.PLAYING:
          props?.onPlay?.();
          break;
        case playerState.PAUSED:
          props?.onPause?.();
          break;
        case playerState.BUFFERING:
          props?.onBuffering?.();
          break;
        case playerState.CUED:
          debug("video cued");
          break;
      }
    };

    // listen
    const listener = player?.on("stateChange", handler);

    // destroy events
    //return () => player?.off(listener);
  }, [player]);

  /**
   * PlayPause
   */
  useEffect(() => {
    debug("player", player);
    props.play ? player?.playVideo() : player?.pauseVideo();
  }, [player, props.play]);

  return (
    <div
      ref={rootRef}
      className={[componentName, props.className].filter(e => e).join(" ")}
      style={props?.style}
    >
      <div id={selectedId} />
    </div>
  );
}

export { YoutubeVideo };
