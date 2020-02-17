import "../../global-style.css";
import React from "react";
import { storiesOf } from "@storybook/react";
import README from "@wbe/fake-data-generator/README.md";
import FakeDataGenerator from "@wbe/fake-data-generator/src";

// set story name
const storyName = "fake-data-generator";

/**
 * Demo
 */
export const FakeDataImage = () => {
  return (
    <div>
      <h1>Fake image array</h1>
      <p>Ratio 16/9</p>
      <pre>
        {JSON.stringify(
          FakeDataGenerator.instance.getResponsiveImageData(16 / 9),
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
      <h1>Fake text</h1>
      <pre>TODO</pre>
    </div>
  );
};

export const FakeVideo = () => {
  return (
    <div>
      <h1>Fake video</h1>
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
      sidebar: README,
      codeTheme: "darcula"
    }
  })
  .add("fake image", () => <FakeDataImage />, {
    info: README
  })
  .add("fake text", () => <FakeText />, {
    info: README
  })
  .add("fake video", () => <FakeVideo />, {
    info: README
  });
