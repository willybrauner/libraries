import React, { CSSProperties } from "react";

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
  playing: boolean;
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
  }

  /**
   * Youtube Render
   */
  if (props?.type === EVideoType.YOUTUBE) {
  }

  /**
   * Vimeo render
   */
  if (props?.type === EVideoType.VIMEO) {
  }
}

export { VideoPlayer as default };
