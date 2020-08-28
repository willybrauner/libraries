import React, { CSSProperties, useEffect, useRef } from "react";
const componentName: string = "NativeVideo";
const debug = require("debug")(`lib:${componentName}`);

/**
 * NativeVideo Props
 */
interface IProps {
  /**
   * Add className to component root
   */
  className?: string;

  /**
   * Inquire video URL
   */
  url: string;

  /**
   * Play, pause, resume video
   */
  playing: boolean;

  /**
   * Add root component style
   */
  style?: CSSProperties;

  /**
   * @default true
   */
  showControls?: boolean;

  /**
   * Autoplay works only if muted is set to true
   * @default false
   */
  autoPlay?: boolean;

  /**
   * @default false
   */
  loop?: boolean;

  /**
   * @default false
   */
  muted?: boolean;

  /**
   * @default true
   */
  playsInline?: boolean;

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
   */
  onEnded?: () => void;

  /**
   * Add image as poster on video
   */
  poster?: string;
}

NativeVideo.defaultProps = {
  showControls: true,
  autoPlay: false,
  loop: false,
  muted: false,
  playsInline: true
};

/**
 * NativePlayer
 * @doc https://developer.mozilla.org/fr/docs/Web/HTML/Element/video
 * @param props
 */
function NativeVideo(props: IProps) {
  const rootRef = useRef(null);

  /**
   * On playing update
   */
  useEffect(() => {
    if (props.playing) rootRef.current?.play();
    if (!props.playing) rootRef.current?.pause();
  }, [props.playing]);

  /**
   * Bind events
   */
  useEffect(() => {
    if (!rootRef?.current) return;

    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#Events
    rootRef.current?.addEventListener("play", onPlayHandler);
    rootRef.current?.addEventListener("pause", onPauseHandler);
    rootRef.current?.addEventListener("ended", onEndedHandler);
    return () => {
      rootRef.current?.removeEventListener("play", onPlayHandler);
      rootRef.current?.removeEventListener("pause", onPauseHandler);
      rootRef.current?.removeEventListener("ended", onEndedHandler);
    };
  }, []);

  const onPlayHandler = () => {
    debug("play");
    props?.onPlay?.();
  };

  const onPauseHandler = () => {
    debug("pause");
    props?.onPause?.();
  };

  const onEndedHandler = () => {
    debug("ended");
    props?.onEnded?.();
  };

  return (
    <video
      ref={rootRef}
      className={[componentName, props.className].filter(e => e).join(" ")}
      src={props?.url}
      autoPlay={props?.autoPlay}
      controls={props?.showControls}
      style={props?.style}
      loop={props.loop}
      muted={props.muted}
      playsInline={props.playsInline}
      poster={props.poster}
    />
  );
}

export { NativeVideo };
