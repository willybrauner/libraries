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
   * Execute function on canplay state callback
   * "The canplay event is fired when the user agent can play the media [...]"
   * @doc https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/canplay_event
   */
  onCanPlay?: () => void;

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

  const onCanPlayHandler = () => {
    debug("onCanPlay");
    props?.onCanPlay?.();
  };

  return (
    <video
      ref={rootRef}
      className={[componentName, props.className].filter(e => e).join(" ")}
      style={props?.style}
      src={props?.url}
      controls={props?.showControls}
      autoPlay={props?.autoPlay}
      muted={props.muted}
      loop={props.loop}
      playsInline={props.playsInline}
      poster={props.poster}
    />
  );
}

export { NativeVideo };
