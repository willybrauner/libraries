import "../../global-style.css";
import React, { useMemo, useState } from "react";
import { storiesOf } from "@storybook/react";
//import README from "@wbe/react-video-player/README.md";
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
      //   sidebar: README
    }
  })
  .add("native", () => {
    const [play, setPlay] = useState<boolean>(false);

    // TODO updater la liste de fake data utils
    const url =
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";

    return (
      <>
        <button onClick={() => setPlay(!play)}>
          {play ? "pause" : "play"}
        </button>
        <NativeVideo
          className={`${storyName}_native`}
          url={url}
          play={play}
          autoPlay={true}
          muted={true}
          controls={true}
          style={{ width: 300 }}
          onPause={() => debug("pause callback")}
          onPlay={() => debug("play callback")}
          onEnded={() => debug("ended callback")}
          onCanPlay={() => debug("canplay callback")}
          poster={FakeDataUtils.getResponsiveImageData()[0].url}
        />
      </>
    );
  })

  .add("vimeo", () => {
    const [play, setPlay] = useState<boolean>(true);
    const url = useMemo(() => {
      return `https://vimeo.com/${FakeDataUtils.getVideoId(
        DataEVideoType.VIMEO
      )}`;
    }, []);
    return (
      <>
        <button onClick={() => setPlay(!play)}>
          {play ? "pause" : "play"}
        </button>
        <VimeoVideo
          className={`${storyName}_vimeo`}
          url={url}
          play={play}
          style={{ width: 300 }}
          controls={true}
          autoPlay={true}
          muted={true}
          loop={false}
          onPause={() => debug("pause callback")}
          onPlay={() => debug("play callback")}
          onEnded={() => debug("ended callback")}
          onLoaded={() => debug("loaded callback")}
        />
      </>
    );
  })

  .add("youtube", () => {
    const [play, setPlay] = useState<boolean>(false);

    const url = useMemo(() => {
      return `https://youtu.be/${FakeDataUtils.getVideoId(
        DataEVideoType.YOUTUBE
      )}`;
    }, []);
    return (
      <>
        <button onClick={() => setPlay(!play)}>
          {play ? "pause" : "play"}
        </button>
        <YoutubeVideo
          className={`${storyName}_youtube`}
          id={FakeDataUtils.getVideoId(DataEVideoType.YOUTUBE)}
          url={url}
          play={play}
          // onPause={() => debug("pause callback")}
          // onPlay={() => debug("play callback")}
          // onEnded={() => debug("ended callback")}
        />
      </>
    );
  });
