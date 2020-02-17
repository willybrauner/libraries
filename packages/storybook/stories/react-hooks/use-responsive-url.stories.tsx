import React from "react";
import { storiesOf } from "@storybook/react";
import README from "@wbe/react-use-responsive-url/README.md";
import useResponsiveUrl from "@wbe/use-responsive-url/src";
import "../../global-style.css";

// set story name
const storyName = "use-use-responsive-url";

/**
 * Demo
 */
export const App = () => {
  //useResponsiveUrl();

  return (
    <div>
      <p> Resize your browser and check responsive url change.</p>
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
