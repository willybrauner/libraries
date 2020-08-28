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
   * Add className to component root
   */
  className?: string;

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
   * TODO TEST
   * @doc: https://developers.google.com/youtube/iframe_api_reference
   */
  showControls?: boolean;

  /**
   * TODO TEST
   */
  autoPlay?: boolean;
}

YoutubeVideo.defaultProps = {
  showControls: true,
  autoPlay: false
};

/**
 * YoutubeVideo
 * @param props
 */
function YoutubeVideo(props: IProps) {
  const rootRef = useRef(null);
  const [videoSrc, setVideoSrc] = useState<string>(null);

  // --------------------------------------------------------------------------- YOUTUBE

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
  }, [props?.id, props?.url]);

  const srcBuilder = useMemo((): string => {
    if (!selectedId) {
      debug(`No selectedId, Can't build URL, return.`);
      return;
    }

    return [
      `https://www.youtube.com/embed/`,
      selectedId,
      `?`,
      `autoplay=${props?.autoPlay ? 1 : 0}`,
      `&`,
      `controls=${props?.showControls ? 1 : 0}`
    ].join("");
  }, [selectedId]);

  /**
   * Prepare src URL
   */
  useEffect(() => {
    setVideoSrc(srcBuilder);
  }, [props.url, props.autoPlay, props.showControls]);

  return (
    <iframe
      ref={rootRef}
      className={[componentName, props.className].filter(e => e).join(" ")}
      src={videoSrc}
      style={props?.style}
      frameBorder="0"
      allow="autoplay"
      allowFullScreen
    />
  );
}

export { YoutubeVideo };
