import React, { CSSProperties, useEffect, useRef, useState } from "react";
// @ts-ignore
import Player from "@vimeo/player";

const componentName: string = "VimeoVideo";
const debug = require("debug")(`lib:${componentName}`);

interface IProps {
  className: string;
  url: string;
  playing: boolean;
  style?: CSSProperties;

  // Player Parameters
  // @doc https://vimeo.zendesk.com/hc/en-us/articles/360001494447-Using-Player-Parameters

  // Video must be hosted by a Plus account or higher
  showControls?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  autoPause?: boolean;
  playsInline?: boolean;

  allowFullScreen?: boolean;

  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
}

VimeoVideo.defaultProps = {
  autoPlay: false,
  showControls: false,
  loop: false,
  muted: false,
  autoPause: true,
  playsInline: true,
  allowFullScreen: true,
  style: { width: "auto", height: "auto" }
};

/**
 * Vimeo player using SDK
 * @doc: https://developer.vimeo.com/player/sdk/basics
 * @param props
 * @constructor
 */
function VimeoVideo(props: IProps) {
  const rootRef = useRef(null);
  const [player, setPlayer] = useState<Player>(null);

  /**
   * Extract id from URL
   * @param url
   * return {string} vimeo ID
   */
  const getIdFromUrl = (url: string): string => {
    const regExp = /(http|https)?:\/\/(www\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|)(\d+)(?:|\/\?)/;
    const match = url?.match(regExp);
    return match?.[4] ?? null;
  };

  /**
   * Build src
   * @param id
   */
  const srcBuilder = (id: string = getIdFromUrl(props.url)): string =>
    [
      `https://player.vimeo.com/video/`,
      id,
      `?`,
      `autoplay=${props?.autoPlay}`,
      `&`,
      `controls=${props?.showControls}`,
      `&`,
      `loop=${props?.loop}`,
      `&`,
      `muted=${props?.muted}`,
      `&`,
      `autopause=${props?.autoPause}`,
      `&`,
      `playsinline=${props?.playsInline}`
    ].join("");

  /**
   * use Vimeo SDK and bind events
   */
  const initPlayer = (): void => {
    if (!props.url) return;

    // Create player
    const player = new Player(rootRef.current);
    debug("player instance", player);

    // bind events
    player.on("play", onPlayHandler);
    player.on("pause", onPauseHandler);
    player.on("ended", onEndedHandler);
    setPlayer(player);
  };

  /**
   * Unbind events
   */
  const destroyPlayer = () => {
    player?.off("play", onPlayHandler);
    player?.off("pause", onPauseHandler);
    player?.off("ended", onEndedHandler);
  };

  /**
   * Init
   */
  useEffect(() => {
    initPlayer();
    // destroy on unmount
    if (player) return destroyPlayer;
  }, [props.url]);

  /**
   * Listen PlayState
   */
  useEffect(() => {
    if (!player) return;
    debug("props.playing", props.playing);
    props.playing ? player.play() : player.pause();
  }, [props.playing]);

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
    <iframe
      ref={rootRef}
      className={[componentName, props.className].filter(e => e).join(" ")}
      src={srcBuilder()}
      frameBorder="0"
      style={props?.style}
      // @ts-ignore
      webkitallowfullscreen={props.allowFullScreen}
      mozallowfullscreen={props.allowFullScreen}
      allowFullScreen={props.allowFullScreen}
    />
  );
}

export { VimeoVideo };
