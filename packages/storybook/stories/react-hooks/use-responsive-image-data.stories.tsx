import "../../global-style.css";
import React from "react";
import { storiesOf } from "@storybook/react";
import README from "@wbe/use-responsive-image-data/README.md";
import useWindowSize from "@wbe/use-window-size";
import FakeDataUtils from "@wbe/fake-data-utils/src";
import useResponsiveImageData, {
  IImage
} from "@wbe/use-responsive-image-data/src";

// set story name
const storyName = "use-responsive-image-data";

/**
 * Demo
 */
// get fake thumbs array
const thumbs = FakeDataUtils.instance.getResponsiveImageData(16 / 9);

export const App = () => {
  // get current width
  const { width } = useWindowSize();
  // get selected responsive image data object
  const responsiveImageData: IImage = useResponsiveImageData(thumbs, width);

  return (
    <div>
      <pre>{JSON.stringify(responsiveImageData, null, 2)}</pre>
      <p>
        Internal hook <em>useResponsiveImageData</em> return image data depend
        to dynamic or static width value. In this example, width value depend of
        current window width, so, you can observe image data object changing if
        you resize your browser.
      </p>
    </div>
  );
};

/**
 * Config
 */
storiesOf(`react-hooks/${storyName}`, module)
  .addParameters({
    readme: {
      sidebar: README
    }
  })
  .add(
    "basic example",
    () => <App />
    //{info: README}
  );
