import "../../global-style.css";
import React, { useMemo, useState } from "react";
import { storiesOf } from "@storybook/react";
import README from "@wbe/react-video-player/README.md";
// @ts-ignore
import FakeDataUtils, {
  EVideoType,
  EVideoType as DataEVideoType
} from "@wbe/fake-data-utils";
// @ts-ignore
import { VimeoVideo } from "../../../packages/react-components/react-video-player/src/VimeoVideo";
// @ts-ignore
import { NativeVideo } from "../../../packages/react-components/react-video-player/src/NativeVideo";
// @ts-ignore
import { YoutubeVideo } from "../../../packages/react-components/react-video-player/src/YoutubeVideo";

// set story name
const storyName = "react-video-player";
const debug = require("debug")(`lib:${storyName}`);

storiesOf(`react-components/${storyName}`, module)
  .addParameters({
    readme: {
      sidebar: README
    }
  })
  .add("native", () => {
    const [playing, setPlaying] = useState<boolean>(false);
    const url =
      "https://cher-ami.tv/user/pages/02.works/01.ifas-art-of-comics/1_BLOC_VIDEO.mp4";

    return (
      <>
        <button onClick={() => setPlaying(!playing)}>
          {playing ? "pause" : "play"}
        </button>
        <NativeVideo
          className={`${storyName}_ native`}
          url={url}
          playing={playing}
          onPause={() => debug("pause callback")}
          onPlay={() => debug("play callback")}
          onEnded={() => debug("ended callback")}
        />
      </>
    );
  })

  .add("vimeo", () => {
    const [playing, setPlaying] = useState<boolean>(false);
    const url = useMemo(() => {
      return `https://vimeo.com/${FakeDataUtils.getVideoId(
        DataEVideoType.VIMEO
      )}`;
    }, []);
    return (
      <>
        <button onClick={() => setPlaying(!playing)}>
          {playing ? "pause" : "play"}
        </button>
        <VimeoVideo
          className={`${storyName}_vimeo`}
          url={url}
          playing={playing}
          onPause={() => debug("pause callback")}
          onPlay={() => debug("play callback")}
          onEnded={() => debug("ended callback")}
        />
      </>
    );
  })

  .add("youtube", () => {
    const [playing, setPlaying] = useState<boolean>(false);
    const url = useMemo(() => {
      return `https://youtu.be/${FakeDataUtils.getVideoId(
        DataEVideoType.YOUTUBE
      )}`;
    }, []);
    return (
      <>
        <button onClick={() => setPlaying(!playing)}>
          {playing ? "pause" : "play"}
        </button>
        <YoutubeVideo
          className={`${storyName}_youtube`}
          url={url}
          playing={playing}
          // onPause={() => debug("pause callback")}
          // onPlay={() => debug("play callback")}
          // onEnded={() => debug("ended callback")}
        />
      </>
    );
  });
