import "../../global-style.css";
import React, { useMemo, useState } from "react";
import { storiesOf } from "@storybook/react";
import README from "@wbe/react-video-player/README.md";
// @ts-ignore
import VideoPlayer, {
  EVideoPlayState,
  EVideoType
} from "../../../packages/react-components/react-video-player/src/index";
import FakeDataUtils, {
  EVideoType as DataEVideoType
} from "@wbe/fake-data-utils";

// set story name
const storyName = "react-video-player";
const debug = require("debug")(`lib:${storyName}`);

storiesOf(`react-components/${storyName}`, module)
  .addParameters({
    readme: {
      sidebar: README
    }
  })
  // .add("youtube", () => (
  //   <VideoPlayer
  //     type={EVideoType.YOUTUBE}
  //     url={`https://youtu.be/${FakeDataUtils.getVideoId(
  //       DataEVideoType.YOUTUBE
  //     )}`}
  //   />
  // ))
  .add("vimeo", () => {
    const [play, setPlay] = useState(false);
    const url = useMemo(
      () =>
        `https://vimeo.com/${FakeDataUtils.getVideoId(DataEVideoType.VIMEO)}`,
      []
    );

    return (
      <>
        <button onClick={() => setPlay(!play)}>
          {play ? "pause" : "play"}
        </button>

        <VideoPlayer
          className={"Stories_videoPlayer"}
          type={EVideoType.VIMEO}
          url={url}
          playState={play ? EVideoPlayState.PLAY : EVideoPlayState.PAUSE}
          showControls={false}
        />
      </>
    );
  });
