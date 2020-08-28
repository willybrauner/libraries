import React, {
  CSSProperties,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
// @ts-ignore
import Player from "@vimeo/player";
const componentName: string = "VimeoVideo";
const debug = require("debug")(`lib:${componentName}`);

/**
 * VimeoVideo Props
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
   * Pause playing video if another start in the same window
   * @doc https://developer.vimeo.com/player/sdk/reference#get-the-autopause-state-of-a-player-or-browser
   * @default false
   */
  autoPause?: boolean;

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
   * Is not fired if loop is true
   */
  onEnded?: () => void;

  /**
   * Execute function when a new video is loaded in the player
   */
  onLoaded?: () => void;

  /**
   * Add className to component root
   */
  className?: string;
}

VimeoVideo.defaultProps = {
  controls: true,
  autoPlay: false,
  loop: false,
  muted: false,
  playsInline: true,
  autoPause: true
};

/**
 * Vimeo video player using SDK
 * @doc: https://developer.vimeo.com/player/sdk/basics
 * @param props
 */
function VimeoVideo(props: IProps) {
  const rootRef = useRef(null);
  const [player, setPlayer] = useState<Player>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  /**
   * Extract id from URL
   * @param url
   * return {string} vimeo ID
   */
  const getIdFromUrl = useMemo((): string => {
    if (!props?.url) return;
    const regExp = /(http|https)?:\/\/(www\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|)(\d+)(?:|\/\?)/;
    const match = props?.url?.match(regExp);
    return match?.[4] ?? null;
  }, [props?.url]);

  /**
   * Select ID from id props or url prod, depends on who inquired
   */
  const [selectedId, setSelectedId] = useState<string>(
    props?.id || getIdFromUrl
  );
  useEffect(() => {
    setSelectedId(props?.id || getIdFromUrl);
  }, [props?.id, props?.url]);

  /**
   * use Vimeo SDK and bind events
   */
  const initPlayer = (): void => {
    debug(selectedId);

    if (!selectedId) {
      throw new Error(
        "No ID and no URL found in props; Component need one of these props."
      );
    }

    // select options
    const options = {
      url: `https://vimeo.com/${selectedId}`,
      autoplay: props.autoPlay,
      muted: props.muted,
      loop: props.loop,
      controls: props?.controls,
      playsinline: props?.playsInline,
      autopause: props?.autoPause,

      // If exist, set props.style size properties to child iframe
      // because iframe size is automatically set
      width: props?.style?.width,
      height: props?.style?.height,
      maxWidth: props?.style?.maxWidth,
      maxHeight: props?.style?.maxHeight
    };

    // Create player
    const player = new Player("vimeo", options);

    debug("player instance", player);

    if (!player) {
      debug("No player instance found. Return.");
    }

    player?.on("play", onPlayHandler);
    player?.on("pause", onPauseHandler);
    player?.on("ended", onEndedHandler);
    player?.on("loaded", onLoadedHandler);
    setPlayer(player);
  };

  /**
   * Unbind events
   */
  const destroyPlayer = () => {
    player?.off("play", onPlayHandler);
    player?.off("pause", onPauseHandler);
    player?.off("ended", onEndedHandler);
    player?.off("loaded", onLoadedHandler);
    player?.destroy();
    setPlayer(null);
  };

  /**
   * Init
   */
  useEffect(() => {
    // if no id, unload current player if exist and exit.
    if (!selectedId) {
      player?.unload();
      return;
    }

    // init player if this is first load or inject new ID
    !player ? initPlayer() : player.loadVideo(selectedId);

    // destroy on unmount
    if (player) return destroyPlayer;
  }, [selectedId, player]);

  /**
   * Listen PlayState
   */
  useEffect(() => {
    if (!player) return;
    debug("props.playing", props.play);
    props.play ? player.play() : player.pause();
  }, [props.play, player]);

  const onPlayHandler = () => {
    debug("play");
    setIsPlaying(true);
    props?.onPlay?.();
  };

  const onPauseHandler = () => {
    debug("pause");
    setIsPlaying(false);
    props?.onPause?.();
  };

  const onEndedHandler = () => {
    debug("ended");
    setIsPlaying(false);
    props?.onEnded?.();
  };

  const onLoadedHandler = () => {
    debug("loaded");
    props?.onLoaded?.();
  };

  return (
    <div
      className={[componentName, props.className].filter(e => e).join("")}
      id="vimeo"
      ref={rootRef}
      style={props.style}
    />
  );
}

export { VimeoVideo };
