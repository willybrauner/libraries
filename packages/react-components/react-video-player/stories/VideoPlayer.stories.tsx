// @ts-ignore
// prettier-ignore
import VideoPlayer, { EVideoType as EVideoPlayerType } from "../src/VideoPlayer";
import FakeDataUtils, { EVideoType } from "@wbe/fake-data-utils";
import React, { CSSProperties } from "react";
import "../../../../storybook/global-style.css";

const storyName = "react-video-player";
const debug = require("debug")(`lib:${storyName}`);

// VideoPlayer props interface
interface IProps {
  type: EVideoPlayerType;
  id?: string;
  url?: string;
  play: boolean;
  style?: CSSProperties;
  controls?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  className?: string;
  onReady?: (event?: any) => void;
  onPlay?: (event?: any) => void;
  onPause?: (event?: any) => void;
  onEnded?: (event?: any) => void;
}

export const Template = (props: IProps) => <VideoPlayer {...props} />;
Template.storyName = "youtube";

export default {
  title: `react-components/${storyName}`,
  component: Template,
  args: {
    type: EVideoPlayerType.YOUTUBE,
    id: FakeDataUtils.getVideoId(EVideoType.YOUTUBE),
    url: null,
    play: true,
    style: { width: 400, height: 300 },
    controls: false,
    autoPlay: false,
    loop: false,
    muted: false,
    playsInline: true,
    className: "Youtube",
    onReady: e => debug("onReady callback", e),
    onPlay: e => debug("onPlay callback", e),
    onPause: e => debug("onPause callback", e),
    onEnded: e => debug("onEnded callback", e)
  } as IProps
};

export const Vimeo = Template.bind({});
Vimeo.storyName = "vimeo";
Vimeo.args = {
  type: EVideoPlayerType.VIMEO,
  id: FakeDataUtils.getVideoId(EVideoType.VIMEO),
  url: null,
  play: true,
  style: { width: 400, height: 300 },
  controls: false,
  autoPlay: false,
  loop: false,
  muted: false,
  playsInline: true,
  className: "Vimeo",
  onReady: e => debug("onReady callback", e),
  onPlay: e => debug("onPlay callback", e),
  onPause: e => debug("onPause callback", e),
  onEnded: e => debug("onEnded callback", e)
};

export const Native = Template.bind({});
Native.storyName = "native";
Native.args = {
  type: EVideoPlayerType.NATIVE,
  url: FakeDataUtils.getVideoUrl(EVideoType.NATIVE),
  play: true,
  style: { width: 400, height: 300 },
  controls: false,
  autoPlay: false,
  loop: true,
  muted: true,
  playsInline: true,
  className: "Native",
  onReady: e => debug("onReady callback", e),
  onPlay: e => debug("onPlay callback", e),
  onPause: e => debug("onPause callback", e),
  onEnded: e => debug("onEnded callback", e)
};
