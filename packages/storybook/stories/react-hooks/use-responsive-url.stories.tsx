import React from "react";
import { storiesOf } from "@storybook/react";
import README from "@wbe/use-responsive-url/README.md";
import useResponsiveUrl from "@wbe/use-responsive-url/src";
import "../../global-style.css";

// set story name
const storyName = "use-use-responsive-url";

/**
 * Demo
 */
export const App = () => {
  /**
   * Demo
   */

  const thumbs = [
    {
      width: 200,
      height: 150,
      url: "https://picsum.photos/200/150"
    },
    {
      width: 400,
      height: 600,
      url: "https://picsum.photos/400/600"
    },
    {
      width: 600,
      height: 400,
      url: "https://picsum.photos/600/400"
    },
    {
      width: 800,
      height: 600,
      url: "https://picsum.photos/800/600"
    },
    {
      width: 1000,
      height: 800,
      url: "https://picsum.photos/1000/800"
    },
    {
      width: 1400,
      height: 1200,
      url: "https://picsum.photos/1400/1200"
    }
  ];

  const responsiveImage = useResponsiveUrl(thumbs);

  return (
    <div>
      <p> Resize your browser and check responsive url change.</p>
      <pre>{JSON.stringify(responsiveImage?.url, null, 2)}</pre>
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
