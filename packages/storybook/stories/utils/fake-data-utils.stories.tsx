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
        {JSON.stringify(
          FakeDataUtils.instance.getResponsiveImageData(16 / 9),
          null,
          2
        )}
      </pre>
    </div>
  );
};

const FakeVideoUrl = () => {
  return (
    <div>
      <p>Random youtube url</p>
      <pre>
        {JSON.stringify(
          FakeDataUtils.instance.getVideoUrl(EVideoType.YOUTUBE),
          null,
          2
        )}
      </pre>
      <p>Random vimeo url</p>
      <pre>
        {JSON.stringify(
          FakeDataUtils.instance.getVideoUrl(EVideoType.VIMEO),
          null,
          2
        )}
      </pre>
      <p>Random native video url</p>
      <pre>
        {JSON.stringify(
          FakeDataUtils.instance.getVideoUrl(EVideoType.NATIVE),
          null,
          2
        )}
      </pre>
    </div>
  );
};

const FakeVideoId = () => {
  return (
    <div>
      <p>Random youtube ID</p>
      <pre>
        {JSON.stringify(
          FakeDataUtils.instance.getVideoId(EVideoType.YOUTUBE),
          null,
          2
        )}
      </pre>
      <p>Random vimeo ID</p>
      <pre>
        {JSON.stringify(
          FakeDataUtils.instance.getVideoId(EVideoType.VIMEO),
          null,
          2
        )}
      </pre>
    </div>
  );
};

const FakeText = () => {
  return (
    <div>
      <p>Fake text BRUT</p>
      <pre>{JSON.stringify(FakeDataUtils.instance.getText(), null, 2)}</pre>
      <p>Fake text HTML</p>
      <pre>
        {JSON.stringify(
          FakeDataUtils.instance.getText(ETextType.HTML),
          null,
          2
        )}
      </pre>
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
