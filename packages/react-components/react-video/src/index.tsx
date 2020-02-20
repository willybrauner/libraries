/**
 * TODO
 *  - Fixer les imports
 *  - Mettre les bonnes dépendances dans le package.json
 */

import css from "./ReactVideo.module.less";
import React, {LegacyRef, useEffect, useRef, useState} from "react";
import { merge } from "../../common/lib/helpers/classNameHelper";
import { prepare } from "../../common/helpers/prepare";
import {
  EImageType,
  IImage,
  ResponsiveImage
} from "../../common/lib/react-components/responsiveImage/ResponsiveImage";
import { useIsInViewport } from "../../common/lib/react-hooks/useIsInViewport";

/**
 * Type of video
 */
export enum EVideoType {
  YOUTUBE,
  VIMEO,
  NATIVE
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
  classNames?: string[];

  // Video Type (origin)
  type: EVideoType;

  // Video url
  url?: string;

  // Show player controls (needs a pro account for Vimeo)
  // Was not yet tested with a vimeo pro account
  showControls?: boolean;

  // Cover Image
  // Can be null if no poster is needed
  poster?: IImage[] | null;

  // Play button code (SVG if possible)
  playButtonSvg?: any;

  // Auto play the video on iframe show
  autoplay?: boolean;

  // Use this to pause / resume video
  playState?: EVideoPlayState;

  // Stop video playing on out of viewport
  playOnlyInViewport?: boolean;

  // PlayIn animation (between poster and video)
  playIn?: (pRootRef: LegacyRef<HTMLDivElement>, pPosterRef:LegacyRef<HTMLDivElement>, pOnCompleted: () => any) => void;

  // PlayOut animation (between poster and video)
  playOut?: (pRootRef: LegacyRef<HTMLDivElement>, pPosterRef:LegacyRef<HTMLDivElement>, pOnCompleted: () => any) => void;

  // Background color of the component. May be used to avoid fading out on white.
  backgroundColor?: string;
}

/**
 * Default props
 */
ReactVideo.defaultProps = {
  url: "",
  showControls: true,
  poster: null,
  playButtonSvg: null,
  autoplay: true,
  playState: EVideoPlayState.INITIAL,
  playOnlyInViewport: true,
  playIn: () => null,
  playOut: () => null,
  backgroundColor: "transparent"
};

// prepare
const { componentName, log } = prepare("ReactVideo");

/**
 * @name ReactVideo
 */
function ReactVideo(props: IProps) {
  // --------------------------------------------------------------------------- DECLARATIONS

  // Root element ref
  const rootRef = useRef(null);

  // Poster element ref
  const posterRef = useRef(null);

  // <video> element ref
  const videoRef = useRef(null);

  // Detects if is in viewport
  const inViewport = useIsInViewport(rootRef, true);

  // Show the player or not
  const [showPlayer, setShowPlayer] = useState<boolean>(false);

  // Video ID for Youtube and Vimeo
  const [videoId, setVideoId] = useState<string>(null);

  // --------------------------------------------------------------------------- LOCAL UTILITIES

  /**
   * Extracts the ID from an url from Youtube or Vimeo.
   * Handles different types of urls for each platform.
   * @return string ID extracted from the video
   */
  function extractHostedVideoIdFromUrl(): string {
    // URL of the video
    let url = props?.url;

    // Will contain the extracted ID
    let videoId: string;

    // On step 3, will contain the start position of eventual extra elements
    let followingAmperstandPosition: number;

    /** 1. Extract ID from URL */
    // Youtube video
    if (props?.type === EVideoType.YOUTUBE) {
      // Browser URL
      if (url.includes("youtube.com/watch")) {
        videoId = url.split("v=")[1];
      }
      // Short URL
      else if (url.includes("youtu.be")) {
        videoId = url.split(".be/")[1];
      }
      // Embed URL
      else if (url.includes("youtube.com/embed")) {
        videoId = url.split("embed/")[1];
      }
    }
    // Vimeo video
    else if (props?.type === EVideoType.VIMEO) {
      // Embed URL
      if (url.includes("player.vimeo.com")) {
        videoId = url.split("video/")[1];
      }
      // Browser URL
      else {
        videoId = url.split(".com/")[1];
      }
    }

    log(`ReactVideo -> videoId ${videoId}`);

    /** 2. Watching for extra content after the ID */
    followingAmperstandPosition = videoId.indexOf(
        props?.type === EVideoType.YOUTUBE ? "&" : "?"
    );

    /** 3. If there is content after the ID, remove it */
    if (followingAmperstandPosition !== -1) {
      videoId = videoId.substring(0, followingAmperstandPosition);
    }

    return videoId;
  }

  // --------------------------------------------------------------------------- LOCAL CALLBACKS

  /**
   * Native video ended callback.
   */
  function nativeVideoEndedCallback() {
    if (props.poster)
      props?.playOut?.(rootRef, posterRef, posterAnimationCompleted);
  }

  /**
   * On poster click.
   */
  function posterClickHandler() {
    props?.playIn?.(rootRef, posterRef, posterAnimationCompleted);
  }

  /**
   * Poster animation completed callback.
   */
  function posterAnimationCompleted() {
    setShowPlayer(!showPlayer);
  }

  // --------------------------------------------------------------------------- PREPARE

  /**
   * Init debug logs
   */
  useEffect(() => {
    log(`ReactVideo -> Hello`);
  }, []);

  /**
   * Inits the component depending on props
   */
  useEffect(() => {
    // Extract the id if the video is from Youtube or Vimeo
    if (props?.type !== EVideoType.NATIVE) {
      setVideoId(extractHostedVideoIdFromUrl());
    }

    // If no poster, show iFrame (or video)
    if (!props?.poster) setShowPlayer(true);

    // Set component background color
    if(rootRef.current) rootRef.current.style.backgroundColor= props?.backgroundColor;
  }, []);

  /**
   * Creates listener for native video end event.
   */
  useEffect(() => {
    log(`ReactVideo -> showPlayer ${showPlayer}`);

    if (!videoRef) return;

    // Listen to native video ended
    videoRef?.current?.addEventListener("ended", nativeVideoEndedCallback);

    // Remove event listeners on unmount
    return () => {
      videoRef?.current?.removeEventListener("ended", nativeVideoEndedCallback);
    };
  }, [showPlayer]);

  /**
   * Each time user scrolls
   */
  useEffect(() => {
    if(!props?.playOnlyInViewport) return;

    // Reset player if the component is out of viewport
    if (!inViewport && props.poster) {
      setShowPlayer(false);
    }
    // If the poster is null and the video is native, pause it on out of viewport
    else if(!inViewport && !props.poster && props.type === EVideoType.NATIVE) {
      videoRef?.current?.pause();
    }
  }, [inViewport]);

  /**
   * On props.playState update
   */
  useEffect(() => {
    log(`ReactVideo -> props.playState ${props?.playState}`);

    // Native video
    if(props.type === EVideoType.NATIVE) {
      // If player is already shown
      if(props.playState === EVideoPlayState.PLAY && showPlayer) {
        videoRef?.current?.play();
      }
      // If poster is on
      else if(props.playState === EVideoPlayState.PLAY && !showPlayer) {
        setShowPlayer(true);
      }
      // On pause
      else videoRef?.current?.pause();
    }
    // Youtube and Vimeo
    else {
      // Reset component and show poster
      if(props.poster && props.playState === EVideoPlayState.PLAY) setShowPlayer(true);
      else if(!props.poster) setShowPlayer(true);
      else setShowPlayer(false);
    }

  }, [props.playState]);

  // --------------------------------------------------------------------------- RENDER PARTS

  /**
   * Renders the video Player.
   * @returns The video DOM element
   */
  function renderVideoPlayer(): any {
    // Native video
    if (props?.type === EVideoType.NATIVE) {
      return (
          <video
              ref={videoRef}
              className={css.videoPlayer}
              src={props?.url}
              autoPlay={props?.autoplay}
              controls={props?.showControls}
          />
      );
    }

    // Youtube or Vimeo video
    else {
      let videoSrc;

      if (props?.type === EVideoType.YOUTUBE) {
        videoSrc = `https://www.youtube.com/embed/${videoId}`;
      } else if (props?.type === EVideoType.VIMEO) {
        videoSrc = `https://player.vimeo.com/video/${videoId}`;
      }

      return (
          <iframe
              className={css.videoPlayer}
              src={`${videoSrc}?autoplay=${props?.autoplay ? 1 : 0}&controls=${
                  props?.showControls ? 1 : 0
              }`}
              frameBorder="0"
              allowFullScreen
              allow="autoplay"
              width="300"
              height="150"
          />
      );
    }
  }

  // --------------------------------------------------------------------------- FINAL RENDER

  return (
      <div ref={rootRef} className={merge([css.Root, props?.classNames])}>
        {/* Show Player */}
        {showPlayer && renderVideoPlayer()}

        {/* Show poster & play btn */}
        {props?.poster && !showPlayer && (
            <div ref={posterRef} onClick={() => posterClickHandler()}>
              <ResponsiveImage
                  classNames={[css.cover]}
                  data={props?.poster}
                  type={EImageType.BACKGROUND_IMAGE}
              />
              {props?.playButtonSvg}
            </div>
        )}
      </div>
  );
}

export  { ReactVideo as default };
