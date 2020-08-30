import React, {
  CSSProperties,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
// @ts-ignore
import YouTubePlayer from "youtube-player";
const componentName: string = "YoutubeVideo";
const debug = require("debug")(`lib:${componentName}`);

/**
 * YoutubeVideo Props
 */
interface IProps {
  /**
   * Inquire video ID
   */
  id?: string;

  /**
   * Inquire video URL
   */
  url?: string;

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
   * Must be hosted by a Plus account or higher
   * @default true
   */
  controls?: boolean;

  /**
   * @default false
   */
  autoPlay?: boolean;

  /**
   * @default false
   */
  loop?: boolean;

  /**
   * Whether the video plays inline on supported mobile devices.
   * To force the device to play the video in fullscreen mode instead, set this value to false.
   * @default true
   */
  playsInline?: boolean;

  /**
   * Remove decorative elements on video
   * @default false
   */
  modestBranding?: boolean;

  /**
   * Disable keyboard video shortcuts
   * @default false
   */
  disableKb?: boolean;

  /**
   *
   */
  end?: (time: number) => void;

  /**
   * Active fullScreen button
   * @default true
   */
  fs?: boolean;

  /**
   * Execute function on play state callback
   */
  onPlay?: (event: any) => void;

  /**
   * Execute function on pause state callback
   */
  onPause?: (event: any) => void;

  /**
   * Execute function on ended state callback
   * Is not fired if loop is true
   */
  onEnded?: (event: any) => void;

  /**
   * Execute function when a new video is buffering
   */
  onBuffering?: (event: any) => void;

  /**
   * Add className to component root
   */
  className?: string;
}

YoutubeVideo.defaultProps = {
  controls: true,
  autoPlay: false,
  playsinline: true,
  modestBranding: false,
  disableKb: false,
  fs: true
};

const playerState = {
  UNSTARTED: -1,
  ENDED: 0,
  PLAYING: 1,
  PAUSED: 2,
  BUFFERING: 3,
  CUED: 5
};

/**
 * YoutubeVideo
 * use youtube iframe API with youtube-player (https://github.com/gajus/youtube-player)
 * @doc: https://developers.google.com/youtube/iframe_api_reference
 * @param props
 */
function YoutubeVideo(props: IProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [player, setPlayer] = useState(null);

  // --------------------------------------------------------------------------- CONFIG

  /**
   * Extract ID from youtube URL
   */
  const getIdFromUrl = useMemo((): string | null => {
    if (!props?.url) {
      debug(`props.url doesn't exist. Return.`);
      return;
    }
    debug(`Get Id from Url ${props?.url}`);
    const regExp = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
    const match = props?.url?.match(regExp);
    return match?.[1] ?? null;
  }, [props?.url]);

  /**
   * Select ID from id props or url prod, depends on who inquired
   */
  const [selectedId, setSelectedId] = useState<string>(
    props?.id || getIdFromUrl
  );
  useEffect(() => {
    setSelectedId(props?.id || getIdFromUrl);
  }, [props?.id, getIdFromUrl]);

  // prepare DOM id name
  const domId = `${componentName}-${selectedId}`;

  // --------------------------------------------------------------------------- PLAYER

  /**
   * Create Player
   */
  const createPlayer = (): void => {
    const options = {
      videoId: selectedId,
      width: props?.style?.width,
      height: props?.style?.height,
      playerVars: {
        autoplay: props?.autoPlay ? 1 : 0,
        controls: props?.controls ? 1 : 0,
        loop: props?.loop ? 1 : 0,
        playsinline: props.playsInline ? 1 : 0,
        modestbranding: 1
      }
    };

    const el = rootRef?.current?.querySelector(`#${domId}`);
    debug("el inside we create player", el);
    if (el) {
      debug("el exist, create instance...");
      const instance = YouTubePlayer(domId, options);
      setPlayer(instance);
    }
  };

  /**
   * Update player
   */
  const updatePlayer = () => {
    // If autoplay, load new video
    if (props?.autoPlay) {
      player?.loadVideoById(selectedId);
      // reset player
    } else {
      player?.getIframe().then((iframe: any): void => {
        resetPlayer();
      });
    }
  };

  /**
   * Reset an recreate player
   */
  const resetPlayer = () => {
    player?.destroy().then(() => createPlayer());
  };

  /**
   * Start
   */
  useEffect(() => {
    createPlayer();
  }, []);

  /**
   * Update
   */
  const initialMount = useRef(true);
  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false;
      return;
    } else {
      // only on update
      updatePlayer();
    }
  }, [selectedId]);

  /**
   * Events
   */
  useEffect(() => {
    const handler = (event: any) => {
      if (!event?.data) return;
      debug(event);
      switch (event?.data) {
        case playerState.UNSTARTED:
          debug("unstart");
          break;
        case playerState.ENDED:
          props?.onEnded?.(event);
          break;
        case playerState.PLAYING:
          props?.onPlay?.(event);
          break;
        case playerState.PAUSED:
          props?.onPause?.(event);
          break;
        case playerState.BUFFERING:
          props?.onBuffering?.(event);
          break;
        case playerState.CUED:
          debug("video cued");
          break;
      }
    };

    const listener = player?.on("stateChange", handler);
    return () => player?.off(listener);
  }, [player]);

  /**
   * PlayPause
   */
  useEffect(() => {
    props.play ? player?.playVideo() : player?.pauseVideo();
  }, [props.play]);

  return (
    <div
      ref={rootRef}
      className={[componentName, props.className].filter(e => e).join(" ")}
      style={props?.style}
    >
      <div id={domId} />
    </div>
  );
}

export { YoutubeVideo };
