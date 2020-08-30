import React, { CSSProperties, useEffect, useRef } from "react";
const componentName: string = "NativeVideo";
const debug = require("debug")(`lib:${componentName}`);

/**
 * NativeVideo Props
 */
interface IProps {
  /**
   * Inquire video URL
   */
  url: string;

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
   * @default true
   */
  controls?: boolean;

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
   * Whether the video plays inline on supported mobile devices.
   * To force the device to play the video in fullscreen mode instead, set this value to false.
   * @default true
   */
  playsInline?: boolean;

  /**
   * Execute function on play state callback
   */
  onPlay?: (event?: any) => void;

  /**
   * Execute function on pause state callback
   */
  onPause?: (event?: any) => void;

  /**
   * Execute function on ended state callback
   */
  onEnded?: (event?: any) => void;

  /**
   * Execute function on canplay state callback
   * "The canplay event is fired when the user agent can play the media [...]"
   * @doc https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/canplay_event
   */
  onCanPlay?: (event?: any) => void;

  /**
   * Add image as poster on video
   */
  poster?: string;

  /**
   * Add className to component root
   */
  className?: string;
}

NativeVideo.defaultProps = {
  controls: true,
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
    if (props.play) rootRef.current?.play();
    if (!props.play) rootRef.current?.pause();
  }, [props.play]);

  /**
   * Bind events
   */
  useEffect(() => {
    if (!rootRef?.current) return;

    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#Events
    rootRef.current?.addEventListener("play", onPlayHandler);
    rootRef.current?.addEventListener("pause", onPauseHandler);
    rootRef.current?.addEventListener("ended", onEndedHandler);
    rootRef.current?.addEventListener("canplay", onCanPlayHandler);
    return () => {
      rootRef.current?.removeEventListener("play", onPlayHandler);
      rootRef.current?.removeEventListener("pause", onPauseHandler);
      rootRef.current?.removeEventListener("ended", onEndedHandler);
      rootRef.current?.removeEventListener("canplay", onCanPlayHandler);
    };
  }, []);

  const onPlayHandler = (event: any) => {
    debug("play");
    props?.onPlay?.(event);
  };

  const onPauseHandler = (event: any) => {
    debug("pause");
    props?.onPause?.(event);
  };

  const onEndedHandler = (event: any) => {
    debug("ended");
    props?.onEnded?.(event);
  };

  const onCanPlayHandler = (event: any) => {
    debug("onCanPlay");
    props?.onCanPlay?.(event);
  };

  return (
    <video
      ref={rootRef}
      className={[componentName, props.className].filter(e => e).join(" ")}
      style={props?.style}
      src={props?.url}
      controls={props?.controls}
      autoPlay={props?.autoPlay}
      muted={props.muted}
      loop={props.loop}
      playsInline={props.playsInline}
      poster={props.poster}
    />
  );
}

export { NativeVideo };
