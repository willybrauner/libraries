import {
  VideoPlayer,
  EVideoType as EVideoPlayerType,
} from "../src/VideoPlayer";
import { FakeDataUtils, EFakeVideoType } from "@wbe/fake-data-utils";
import React, { CSSProperties } from "react";

const storyName = "react-video-player";

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
    id: FakeDataUtils.getVideoId(EFakeVideoType.YOUTUBE),
    url: null,
    play: true,
    style: { width: 400, height: 300 },
    controls: false,
    autoPlay: false,
    loop: false,
    muted: false,
    playsInline: true,
    className: "Youtube",
  } as IProps,
};

export const Vimeo = Template.bind({});
Vimeo.storyName = "vimeo";
Vimeo.args = {
  type: EVideoPlayerType.VIMEO,
  id: FakeDataUtils.getVideoId(EFakeVideoType.VIMEO),
  url: null,
  play: true,
  style: { width: 400, height: 300 },
  controls: false,
  autoPlay: false,
  loop: false,
  muted: false,
  playsInline: true,
  className: "Vimeo",
};

export const Native = Template.bind({});
Native.storyName = "native";
Native.args = {
  type: EVideoPlayerType.NATIVE,
  url: FakeDataUtils.getVideoUrl(EFakeVideoType.NATIVE),
  play: true,
  style: { width: 400, height: 300 },
  controls: false,
  autoPlay: false,
  loop: true,
  muted: true,
  playsInline: true,
  className: "Native",
};
