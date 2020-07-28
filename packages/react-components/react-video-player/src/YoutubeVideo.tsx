import React, { CSSProperties, useEffect, useRef, useState } from "react";
const componentName: string = "YoutubeVideo";
const debug = require("debug")(`lib:${componentName}`);

/**
 * Props
 */
interface IProps {
  className?: string;
  url: string;
  playing: boolean;
  style?: CSSProperties;

  // @doc: https://developers.google.com/youtube/iframe_api_reference

  showControls?: boolean;
  autoPlay?: boolean;
}

YoutubeVideo.defaultProps = {
  showControls: true,
  autoPlay: false,
  style: { width: "auto", height: "auto" }
};

/**
 * YoutubeVideo
 * @param props
 * @constructor
 */
function YoutubeVideo(props: IProps) {
  const rootRef = useRef(null);
  const [videoSrc, setVideoSrc] = useState<string>(null);

  // --------------------------------------------------------------------------- YOUTUBE

  const getIdFromUrl = (url: string): string | null => {
    const regExp = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
    const match = url?.match(regExp);
    return match?.[1] ?? null;
  };

  const srcBuilder = (id: string = getIdFromUrl(props.url)): string =>
    [
      `https://www.youtube.com/embed/`,
      id,
      `?`,
      `autoplay=${props?.autoPlay ? 1 : 0}`,
      `&`,
      `controls=${props?.showControls ? 1 : 0}`
    ].join("");

  /**
   * Prepare src URL
   */
  useEffect(() => {
    setVideoSrc(srcBuilder());
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
