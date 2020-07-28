import React, { CSSProperties, useEffect, useRef, useState } from "react";
import { Vimeo } from "./Vimeo";

/**
 * Type of video
 */
export enum EVideoType {
  YOUTUBE = "youtube",
  VIMEO = "vimeo",
  NATIVE = "native"
}

/**
 * Play state of the video
 */
export enum EVideoPlayState {
  PAUSE,
  PLAY
}

/**
 * Props
 */
interface IProps {
  className?: string;
  // Video Type
  type: EVideoType;
  // Video url
  url: string;
  // Use this to pause / resume video
  playState?: EVideoPlayState;
  // Auto play the video on iframe show
  autoplay?: boolean;
  // Show player controls (needs a pro account for Vimeo)
  showControls?: boolean;
  // style nodes
  style?: CSSProperties;
}

/**
 * Default props
 */
VideoPlayer.defaultProps = {
  showControls: true,
  autoplay: false,
  playState: EVideoPlayState.PAUSE
};

const componentName: string = "VideoPlayer";
const debug = require("debug")(`lib:${componentName}`);

/**
 * @name VideoPlayer
 */
function VideoPlayer(props: IProps) {
  // --------------------------------------------------------------------------- INIT

  const rootRef = useRef(null);

  // Video ID for Youtube and Vimeo
  const [videoSrc, setVideoSrc] = useState<string>(null);

  // --------------------------------------------------------------------------- YOUTUBE

  const youtubeUrlParser = (url: string): string | null => {
    const regExp = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
    const match = url?.match(regExp);
    return match?.[1] ?? null;
  };

  const youtubeSrcBuilder = (id: string): string =>
    [
      `https://www.youtube.com/embed/`,
      id,
      `?`,
      `autoplay=${props?.autoplay ? 1 : 0}`,
      `&`,
      `controls=${props?.showControls ? 1 : 0}`
    ].join("");

  /**
   * Prepare src URL
   */
  useEffect(() => {
    if (props?.type !== EVideoType.YOUTUBE) return;
    // parse and prepare URL
    const id = youtubeUrlParser(props.url);
    const src = youtubeSrcBuilder(id);
    setVideoSrc(src);
  }, [props.type, props.url, props.autoplay, props.showControls]);

  // --------------------------------------------------------------------------- NATIVE
  /**
   * Native video ended callback.
   */
  const videoEndedCallback = () => {};

  /**
   * Creates listener for native video end event.
   */
  useEffect(() => {
    if (props.type !== EVideoType.NATIVE || !rootRef?.current) return;

    // Listen to native video ended
    rootRef.current?.addEventListener("ended", videoEndedCallback);
    // Remove event listeners on unmount
    return () => {
      rootRef.current?.removeEventListener("ended", videoEndedCallback);
    };
  }, [props.type]);

  /**
   * On props.playState update
   */
  useEffect(() => {
    if (props.type !== EVideoType.NATIVE) return;
    if (props.playState === EVideoPlayState.PLAY) rootRef.current?.play();
    if (props.playState === EVideoPlayState.PAUSE) rootRef.current?.pause();
  }, [props.playState]);

  // --------------------------------------------------------------------------- FINAL RENDER

  const className = [
    `VideoPlayer`,
    `VideoPlayer-${props.type}`,
    props.className
  ]
    .filter(e => e)
    .join(" ");

  /**
   * Native Render
   */
  if (props?.type === EVideoType.NATIVE) {
    return (
      <video
        ref={rootRef}
        className={className}
        src={props?.url}
        autoPlay={props?.autoplay}
        controls={props?.showControls}
        style={props?.style}
      />
    );
  }

  /**
   * Youtube Render
   */
  if (props?.type === EVideoType.YOUTUBE) {
    // exit
    if (!videoSrc) return null;

    return (
      <iframe
        ref={rootRef}
        className={className}
        src={videoSrc}
        frameBorder="0"
        allow="autoplay"
        allowFullScreen
        style={props?.style}
      />
    );
  }

  /**
   * Vimeo render
   */
  if (props?.type === EVideoType.VIMEO) {
    return <Vimeo className={"URL"} url={props.url} />;
  }
}

export { VideoPlayer as default };
