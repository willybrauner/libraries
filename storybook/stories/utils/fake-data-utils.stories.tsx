import "../../global-style.css";
import React from "react";
import { storiesOf } from "@storybook/react";
import FakeDataUtils, { EVideoType } from "@wbe/fake-data-utils";
import README from "@wbe/fake-data-utils/README.md";
import { withKnobs, text, number } from "@storybook/addon-knobs";

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

const FakeTitle = () => {
  return (
    <div>
      <p>Fake Title</p>
      <code>{FakeDataUtils.getTitle(number("pWords", 3))}</code>
    </div>
  );
};

const FakeText = () => {
  return (
    <div>
      <p>Fake text</p>
      <code>{FakeDataUtils.getText(number("pSentencies", 2))}</code>
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
  .addDecorator(withKnobs)
  .add("fake image", () => <FakeImage />)
  .add("fake video URL", () => <FakeVideoUrl />)
  .add("fake video ID", () => <FakeVideoId />)
  .add("fake title", () => <FakeTitle />)
  .add("fake text", () => <FakeText />);
