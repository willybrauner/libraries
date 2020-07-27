import React, { CSSProperties, useEffect, useRef, useState } from "react";

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
  PLAY,
  INITIAL
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
  // Show player controls (needs a pro account for Vimeo)
  // Was not yet tested with a vimeo pro account
  showControls?: boolean;
  // Auto play the video on iframe show
  autoplay?: boolean;
  // Use this to pause / resume video
  playState?: EVideoPlayState;
  // Stop video playing on out of viewport
  playOnlyInViewport?: boolean;
  // style nodes
  style?: CSSProperties;
}

/**
 * Default props
 */
VideoPlayer.defaultProps = {
  showControls: true,
  autoplay: false,
  playState: EVideoPlayState.INITIAL,
  playOnlyInViewport: true
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

  // --------------------------------------------------------------------------- VIMEO

  const vimeoUrlParser = (url: string): string => {
    const regExp = /(http|https)?:\/\/(www\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|)(\d+)(?:|\/\?)/;
    const match = url?.match(regExp);
    return match?.[4] ?? null;
  };

  const vimeoSrcBuilder = (id: string): string =>
    [`https://player.vimeo.com/video/`, id].join("");

  useEffect(() => {
    if (props.type !== EVideoType.VIMEO) return;
    // parse and prepare URL
    const id = vimeoUrlParser(props.url);
    const src = vimeoSrcBuilder(id);
    setVideoSrc(src);
  }, [props.type, props.url]);

  /**
   * use Vimeo SDK
   * @doc: https://developer.vimeo.com/player/sdk/basics
   */
  // keep vimeo player lib instance in this ref
  const vimeoPlayer = useRef<any>(null);

  useEffect(() => {
    if (props.type !== EVideoType.VIMEO || !rootRef.current) return;

    //let Vimeo = require("@vimeo/player");
    let Vimeo = require("@vimeo/player");

    // keep new instance in ref
    vimeoPlayer.current = new Vimeo.Player(rootRef.current);
  }, [props.type]);
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

  const className = `VideoPlayer VideoPlayer-${props.type}`;

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
    // exit if ID is missing
    if (!videoSrc) return null;

    return (
      <iframe
        ref={rootRef}
        className={className}
        src={videoSrc}
        frameBorder="0"
        // @ts-ignore
        webkitallowfullscreen="true"
        mozallowfullscreen="true"
        allowFullScreen
        style={props?.style}
      />
    );
  }
}

export { VideoPlayer as default };
