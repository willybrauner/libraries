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

/**
 * Vimeo
 * @param props
 * @constructor
 */
const Vimeo = (props: IProps) => {
  const rootRef = useRef(null);
  // Video ID for Youtube and Vimeo
  const [videoSrc, setVideoSrc] = useState<string>(null);

  const [player, setPlayer] = useState<Player>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // ---------------------------------------------------------------------------

  const getIdFromUrl = (url: string): string => {
    const regExp = /(http|https)?:\/\/(www\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|)(\d+)(?:|\/\?)/;
    const match = url?.match(regExp);
    return match?.[4] ?? null;
  };

  // const vimeoSrcBuilder = (id: string): string =>
  //   [`https://player.vimeo.com/video/`, id].join("");
  //
  // useEffect(() => {
  //   // parse and prepare URL
  //   const id = vimeoUrlParser(props.url);
  //   const src = vimeoSrcBuilder(id);
  //   setVideoSrc(src);
  // }, [props.url]);

  /**
   * use Vimeo SDK
   * @doc: https://developer.vimeo.com/player/sdk/basics
   */
  const initPlayer = (): void => {
    // Create player
    const player = new Player("vimeo", {
      //id: props.id,
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
   * TODO continuer ici
   */
  useEffect(() => {
    initPlayer();
  }, []);

  /**
   * Unbind events
   */
  const destroyPlayer = () => {
    player?.off("play", onPlayHandler);
    player?.off("pause", onPauseHandler);
    player?.off("ended", onEndedHandler);

    player?.destroy();
  };

  const onPlayHandler = () => {
    setIsPlaying(true);
    props?.onPlay();
  };

  const onPauseHandler = () => {
    setIsPlaying(false);
    props?.onPause();
  };

  const onEndedHandler = () => {
    setIsPlaying(false);
    props?.onEnded();
  };

  // --------------------------------------------------------------------------- RENDER

  return (
    <div
      className={[componentName, props.className].filter(e => e).join("")}
      ref={rootRef}
      style={props.style}
    >
      <div className={`Vimeo_vimeo`} id="vimeo" />
    </div>
  );
};

export { Vimeo };
