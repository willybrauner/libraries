import "../../global-style.css";
import React from "react";
import { storiesOf } from "@storybook/react";
import README from "@wbe/react-video-player/README.md";
// @ts-ignore
import VideoPlayer, {
  EVideoType
} from "../../../packages/react-components/react-video-player/src/index";
import FakeDataUtils, {
  EVideoType as DataEVideoType
} from "@wbe/fake-data-utils";

// set story name
const storyName = "react-video-player";
const debug = require("debug")(`lib:${storyName}`);

/**
 * Demo
 */
const Youtube = () => {
  return (
    <div>
      <VideoPlayer
        type={EVideoType.YOUTUBE}
        url={`https://youtu.be/${FakeDataUtils.getVideoId(
          DataEVideoType.YOUTUBE
        )}`}
      />
    </div>
  );
};

const Vimeo = () => {
  return (
    <div>
      <VideoPlayer
        type={EVideoType.VIMEO}
        url={`https://vimeo.com/${FakeDataUtils.getVideoId(
          DataEVideoType.VIMEO
        )}`}
      />
    </div>
  );
};

/**
 * Config
 */
storiesOf(`react-components/${storyName}`, module)
  .addParameters({
    readme: {
      sidebar: README
    }
  })
  //.add("youtube", () => <Youtube />)
  .add("vimeo", () => <Vimeo />);
