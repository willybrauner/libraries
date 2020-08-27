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
 * Props
 */
interface IProps {
  className?: string;
  type: EVideoType;
  url: string;
  // Use this to pause / resume video
  playing?: boolean;
  autoPlay?: boolean;
  showControls?: boolean;
  // style nodes
  style?: CSSProperties;
}

/**
 * Default props
 */
VideoPlayer.defaultProps = {
  playing: true,
  showControls: true,
  autoplay: false
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
