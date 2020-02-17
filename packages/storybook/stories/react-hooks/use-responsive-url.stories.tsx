import "../../global-style.css";
import React from "react";
import { storiesOf } from "@storybook/react";
import README from "@wbe/use-responsive-url/README.md";
import useResponsiveUrl from "@wbe/use-responsive-url/src";
import FakeDataUtils from "@wbe/fake-data-utils/src";

// set story name
const storyName = "use-use-responsive-url";

/**
 * Demo
 */
export const App = () => {
  // get thumbs
  const thumbs = FakeDataUtils.instance.getResponsiveImageData(16 / 9);
  // get responsive url
  const responsiveImage = useResponsiveUrl(thumbs);

  return (
    <div>
      <p>Resize your browser and check responsive image object changing.</p>
      <pre>{JSON.stringify(responsiveImage, null, 2)}</pre>
    </div>
  );
};

/**
 * Config
 */
storiesOf(`react-hooks/${storyName}`, module)
  .addParameters({
    readme: {
      sidebar: README,
      codeTheme: "darcula"
    }
  })
  .add("basic example", () => <App />, {
    info: README
  });
