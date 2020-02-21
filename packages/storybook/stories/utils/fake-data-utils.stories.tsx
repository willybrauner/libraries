import "../../global-style.css";
import React from "react";
import { storiesOf } from "@storybook/react";
import README from "@wbe/fake-data-utils/README.md";
import FakeDataUtils from "@wbe/fake-data-utils/src";

// set story name
const storyName = "fake-data-utils";

/**
 * Demo
 */
export const FakeDataImage = () => {
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

export const FakeText = () => {
  return (
    <div>
      <h2>Fake text</h2>
      <pre>TODO</pre>
    </div>
  );
};

export const FakeVideo = () => {
  return (
    <div>
      <h2>Fake video</h2>
      <pre>TODO</pre>
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
  .add("fake image", () => <FakeDataImage />)
  .add("fake text", () => <FakeText />)
  .add("fake video", () => <FakeVideo />);
