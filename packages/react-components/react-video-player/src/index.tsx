import React, { CSSProperties } from "react";

/**
 * Type of video
 */
export enum EVideoType {
  NATIVE = "native",
  VIMEO = "vimeo",
  YOUTUBE = "youtube"
}

/**
 * VideoPlayer Props
 */
interface IProps {
  /**
   * Choose video type <native | vimeo | youtube>
   */
  type: EVideoType;

  /**
   * Add className to component root
   * @type all
   */
  className?: string;

  /**
   * Inquire video ID
   * @type VIMEO | YOUTUBE
   */
  id?: string;

  /**
   * Inquire video URL
   * @type all
   */
  url?: string;

  /**
   * Play, pause, resume video
   * @type all
   */
  play: boolean;

  /**
   * Show controls on video
   * @type NATIVE | VIMEO (Plus account)
   * Vimeo: must be hosted by a Plus account or higher
   * Youtube: TODO check
   */
  showControls?: boolean;

  /**
   * Autoplay video on init
   * native: playsInline and muted props need to be true
   * vimeo: muted props need to be true
   * youtube: TODO check
   * @type NATIVE | VIMEO
   */
  autoPlay?: boolean;

  /**
   * @type NATIVE | VIMEO
   */
  loop?: boolean;

  /**
   * @type NATIVE | VIMEO
   */
  muted?: boolean;

  /**
   * @type NATIVE
   */
  playsInline?: boolean;

  /**
   * Execute function on play state callback
   * @type NATIVE | VIMEO
   */
  onPlay?: () => void;

  /**
   * Execute function on pause state callback
   * @type NATIVE | VIMEO
   */
  onPause?: () => void;

  /**
   * Execute function on ended state callback
   * @type NATIVE | VIMEO
   */
  onEnded?: () => void;
}

/**
 * Default props
 */
VideoPlayer.defaultProps = {
  autoPlay: false,
  showControls: true,
  loop: false,
  muted: false,
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
   * Vimeo render
   */
  if (props?.type === EVideoType.VIMEO) {
  }

  /**
   * Youtube Render
   */
  if (props?.type === EVideoType.YOUTUBE) {
  }
}

export { VideoPlayer as default };
