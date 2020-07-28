import React, { CSSProperties, useEffect, useRef, useState } from "react";
import { EVideoPlayState } from "./index";
// @ts-ignore
import Player from "@vimeo/player";

const componentName: string = "Vimeo";
const debug = require("debug")(`lib:${componentName}`);

interface IProps {
  className: string;
  url: string;
  playState?: EVideoPlayState;

  style?: CSSProperties;

  muted?: boolean;
  autoPlay?: boolean;
  loop?: boolean;

  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
}

Vimeo.defaultProps = {
  muted: false,
  autoPlay: false,
  loop: false
};

/**
 * Vimeo player using SDK
 * @doc: https://developer.vimeo.com/player/sdk/basics
 * @param props
 * @constructor
 */
function Vimeo(props: IProps) {
  const rootRef = useRef(null);

  const [player, setPlayer] = useState<Player>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // ---------------------------------------------------------------------------

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
   * use Vimeo SDK and bind events
   */
  const initPlayer = (): void => {
    if (!props.url) return;

    // Create player
    const player = new Player("vimeo", {
      url: `https://vimeo.com/${getIdFromUrl(props.url)}`,
      loop: props.loop,
      muted: props.muted,
      autoplay: props.autoPlay
    });

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
    player?.destroy();
    setPlayer(null);
  };

  /**
   * Init
   */
  useEffect(() => {
    // if no url, unload current player if exist and exit.
    if (!props.url) {
      player?.unload();
      return;
    }

    // init player if this is first load or inject new ID
    !player ? initPlayer() : player.loadVideo(getIdFromUrl(props.url));

    // on unmount, destroy
    if (player) return destroyPlayer;
  }, [props.url, player]);

  /**
   * Listen PlayState
   */
  useEffect(() => {
    if (!player) return;
    if (props.playState === EVideoPlayState.PLAY && !isPlaying) {
      player.play();
    }
    if (props.playState === EVideoPlayState.PAUSE && isPlaying) {
      player.pause();
    }
  }, [props.playState, player]);

  /**
   * Listen Muted
   */
  useEffect(() => {
    if (!player) return;
    player.setMuted(props.muted);
  }, [props.muted, player]);

  /**
   * Listen Loop
   */
  useEffect(() => {
    if (!player) return;
    player.setMuted(props.loop);
  }, [props.loop, player]);

  const onPlayHandler = () => {
    setIsPlaying(true);
    props?.onPlay?.();
  };

  const onPauseHandler = () => {
    setIsPlaying(false);
    props?.onPause?.();
  };

  const onEndedHandler = () => {
    setIsPlaying(false);
    props?.onEnded?.();
  };

  // --------------------------------------------------------------------------- RENDER

  return (
    <div
      className={[componentName, props.className].filter(e => e).join("")}
      id="vimeo"
      ref={rootRef}
      style={props.style}
    />
  );
}

export { Vimeo };
