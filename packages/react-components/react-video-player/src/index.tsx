import React, { CSSProperties } from "react";
import { NativeVideo } from "./NativeVideo";
import { VimeoVideo } from "./VimeoVideo";
import { YoutubeVideo } from "./YoutubeVideo";

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
   * Inquire video ID
   * Will overwride props url if both are set
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
   * Add root component style
   */
  style?: CSSProperties;

  /**
   * Show controls on video
   * @type all
   * Vimeo: must be hosted by a Plus account or higher
   */
  controls?: boolean;

  /**
   * Autoplay video on init
   * native: playsInline and muted props need to be true
   * vimeo: muted props need to be true
   * @type all
   */
  autoPlay?: boolean;

  /**
   * @type all
   */
  loop?: boolean;

  /**
   * @type all
   */
  muted?: boolean;

  /**
   * Whether the video plays inline on supported mobile devices.
   * To force the device to play the video in fullscreen mode instead, set this value to false.
   * @type all
   */
  playsInline?: boolean;

  /**
   * Execute function when video is ready
   * @type all
   */
  onReady?: (event?: any) => void;

  /**
   * Execute function on play state callback
   * @type all
   */
  onPlay?: (event?: any) => void;

  /**
   * Execute function on pause state callback
   * @type all
   */
  onPause?: (event?: any) => void;

  /**
   * Execute function on ended state callback
   * @type all
   */
  onEnded?: (event?: any) => void;

  /**
   * Add className to component root
   * @type all
   */
  className?: string;
}

/**
 * Default props
 */
VideoPlayer.defaultProps = {
  autoPlay: false,
  controls: true,
  loop: false,
  playsInline: true,
  muted: false,
  autoplay: false
};

const componentName: string = "VideoPlayer";
const debug = require("debug")(`lib:${componentName}`);

/**
 * @name VideoPlayer
 * More props are available in each video component.
 * If you need specific video props, create your own VideoPlayer and import
 * Sub components as needed
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
    return (
      <NativeVideo
        className={className}
        url={props.url}
        play={props.play}
        style={props.style}
        controls={props.controls}
        autoPlay={props?.autoPlay}
        loop={props.loop}
        muted={props.muted}
        playsInline={props.playsInline}
        onCanPlay={props.onReady}
        onPlay={props.onPlay}
        onPause={props.onPause}
        onEnded={props.onEnded}
      />
    );
  }

  /**
   * Vimeo render
   */
  if (props?.type === EVideoType.VIMEO) {
    return (
      <VimeoVideo
        id={props.id}
        url={props.url}
        play={props.play}
        style={props.style}
        controls={props.controls}
        autoPlay={props?.autoPlay}
        loop={props.loop}
        muted={props.muted}
        playsInline={props.playsInline}
        onReady={props.onReady}
        onPlay={props.onPlay}
        onPause={props.onPause}
        onEnded={props.onEnded}
      />
    );
  }

  /**
   * Youtube Render
   */
  if (props?.type === EVideoType.YOUTUBE) {
    return (
      <YoutubeVideo
        id={props.id}
        url={props.url}
        play={props.play}
        style={props.style}
        controls={props.controls}
        // clean player if we don't show controls
        modestBranding={props.controls}
        autoPlay={props.autoPlay}
        loop={props.loop}
        muted={props.muted}
        playsInline={props.playsInline}
        onReady={props.onReady}
        onPlay={props.onPlay}
        onPause={props.onPause}
        onEnded={props.onEnded}
      />
    );
  }
}

export { VideoPlayer as default };
