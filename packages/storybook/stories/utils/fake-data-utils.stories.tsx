import "../../global-style.css";
import React from "react";
//import README from "@wbe/fake-data-utils/README.md";
//import FakeDataUtils from "@wbe/fake-data-utils/dist";

// prettier-ignore
// @ts-ignore
import FakeDataUtils, {ETextType, EVideoType} from "../../../utils/fake-data-utils/src";
import README from "../../../utils/fake-data-utils/README.md";
import { storiesOf } from "@storybook/react";

// set story name
const storyName = "fake-data-utils";

/**
 * Demo
 */
const FakeImage = () => {
  return (
    <div>
      <h2>Fake image array</h2>
      <p>Ratio 16/9</p>
      <pre>
        {JSON.stringify(FakeDataUtils.getResponsiveImageData(16 / 9), null, 2)}
      </pre>
    </div>
  );
};

const FakeVideoUrl = () => {
  return (
    <div>
      <p>Random youtube url</p>
      <pre>
        {JSON.stringify(FakeDataUtils.getVideoUrl(EVideoType.YOUTUBE), null, 2)}
      </pre>
      <p>Random vimeo url</p>
      <pre>
        {JSON.stringify(FakeDataUtils.getVideoUrl(EVideoType.VIMEO), null, 2)}
      </pre>
      <p>Random native video url</p>
      <pre>
        {JSON.stringify(FakeDataUtils.getVideoUrl(EVideoType.NATIVE), null, 2)}
      </pre>
    </div>
  );
};

const FakeVideoId = () => {
  return (
    <div>
      <p>Random youtube ID</p>
      <pre>
        {JSON.stringify(FakeDataUtils.getVideoId(EVideoType.YOUTUBE), null, 2)}
      </pre>
      <p>Random vimeo ID</p>
      <pre>
        {JSON.stringify(FakeDataUtils.getVideoId(EVideoType.VIMEO), null, 2)}
      </pre>
    </div>
  );
};

const FakeText = () => {
  return (
    <div>
      <p>Fake title</p>
      {FakeDataUtils.getTitle(6)}
      {FakeDataUtils.getText(6)}
    </div>
  );
};

/**
 * Config
 */
storiesOf(`utils/${storyName}`, module)
  .addParameters({
    readme: {
      sidebar: README
    }
  })
  .add("fake image", () => <FakeImage />)
  .add("fake video URL", () => <FakeVideoUrl />)
  .add("fake video ID", () => <FakeVideoId />)
  .add("fake text", () => <FakeText />);
