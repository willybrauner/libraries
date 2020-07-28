import React, { CSSProperties, useEffect, useRef } from "react";
const componentName: string = "NativeVideo";
const debug = require("debug")(`lib:${componentName}`);

/**
 * Props
 */
interface IProps {
  className?: string;
  url: string;
  playing: boolean;
  style?: CSSProperties;

  showControls?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;

  playsInline?: boolean;
  poster?: string;

  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
}

NativeVideo.defaultProps = {
  showControls: true,
  autoPlay: false,
  loop: false,
  muted: false,
  playsInline: true,
  style: { width: "100%", height: "auto" }
};

/**
 * NativePlayer
 * @param props
 * @constructor
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
