// @ts-ignore
import { useResponsiveImageData } from "../src/useResponsiveImageData";
import FakeDataUtils from "@wbe/fake-data-utils";
import useWindowSize from "@wbe/use-window-size";
import React from "react";
import "../../../../storybook/global-style.css";

const storyName = "use-responsive-image-data";

export const App = () => {
  // get fake thumbs array
  const thumbs = FakeDataUtils.getResponsiveImageData(16 / 9);
  // get current width
  const { width } = useWindowSize();
  // get selected responsive image data object
  const responsiveImageData = useResponsiveImageData(thumbs, width);

  return (
    <div>
      <p>
        Hook returns image data depend here to current window width, you can
        observe image data object changing if you resize your browser.
      </p>
      <pre>{JSON.stringify(responsiveImageData, null, 2)}</pre>
    </div>
  );
};

App.storyName = "basic example";

export default {
  title: `react-hooks/${storyName}`,
  component: App
};
