import "../../global-style.css";
import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import README from "@wbe/react-video-player/README.md";
import FakeDataUtils, {
  EVideoType as DataEVideoType
} from "@wbe/fake-data-utils";
import VideoPlayer, { EVideoType } from "@wbe/react-video-player";

const storyName = "react-video-player";
const debug = require("debug")(`lib:${storyName}`);

/**
 * Youtube
 * @constructor
 */
const YoutubeVideoTest = () => {
  const [play, setPlay] = useState<boolean>(false);
  const [id, setId] = useState<string>(
    FakeDataUtils.getVideoId(DataEVideoType.YOUTUBE)
  );
  const switchVideo = () => {
    setId(FakeDataUtils.getVideoId(DataEVideoType.YOUTUBE));
  };

  return (
    <>
      <button onClick={switchVideo}>switch video</button>
      <button onClick={() => setPlay(!play)}>{play ? "pause" : "play"}</button>
      <VideoPlayer
        type={EVideoType.YOUTUBE}
        className={`${storyName}_youtube`}
        id={id}
        play={play}
        style={{ width: 400, height: 300 }}
        controls={false}
        muted={false}
        onPause={e => debug("pause callback", e)}
        onPlay={e => debug("play callback", e)}
        onEnded={e => debug("ended callback", e)}
        onReady={e => debug("ready callback", e)}
      />
    </>
  );
};

/**
 * Vimeo
 */
const VimeoVideoTest = () => {
  const [play, setPlay] = useState<boolean>(false);
  const [id, setId] = useState<string>(
    FakeDataUtils.getVideoId(DataEVideoType.VIMEO)
  );
  const switchVideo = () => {
    setId(FakeDataUtils.getVideoId(DataEVideoType.VIMEO));
  };

  return (
    <>
      <button onClick={switchVideo}>switch video</button>
      <button onClick={() => setPlay(!play)}>{play ? "pause" : "play"}</button>
      <VideoPlayer
        type={EVideoType.VIMEO}
        className={`${storyName}_vimeo`}
        id={id}
        play={play}
        style={{ width: 400, height: 300 }}
        controls={true}
        muted={true}
        autoPlay={true}
        onPause={e => debug("pause callback", e)}
        onPlay={e => debug("play callback", e)}
        onEnded={e => debug("ended callback", e)}
        onReady={e => debug("ready callback", e)}
      />
    </>
  );
};

/**
 * Native
 */
const NativeVideoTest = () => {
  const [play, setPlay] = useState<boolean>(true);

  const url =
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";

  return (
    <>
      <button onClick={() => setPlay(!play)}>{play ? "pause" : "play"}</button>
      <VideoPlayer
        type={EVideoType.NATIVE}
        className={`${storyName}_native`}
        url={url}
        play={play}
        style={{ width: 400, display: "block" }}
        controls={false}
        muted={true}
        autoPlay={true}
        onPause={e => debug("pause callback", e)}
        onPlay={e => debug("play callback", e)}
        onEnded={e => debug("ended callback", e)}
        onReady={e => debug("ready callback", e)}
      />
    </>
  );
};

storiesOf(`react-components/${storyName}`, module)
  .addParameters({
    readme: {
      sidebar: README
    }
  })
  .add("native", () => <NativeVideoTest />)
  .add("vimeo", () => {
    return (
      <>
        <VimeoVideoTest />
        <VimeoVideoTest />
      </>
    );
  })

  .add("youtube", () => {
    return (
      <>
        <YoutubeVideoTest />
        <YoutubeVideoTest />
      </>
    );
  });
