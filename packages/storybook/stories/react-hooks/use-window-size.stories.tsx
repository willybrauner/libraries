import React from "react";
import { storiesOf } from "@storybook/react";
import README from "@wbe/use-window-size/README.md";
import useWindowSize from "@wbe/use-window-size";
import "../../style.css";

// set story name
const storyName = "use-window-size";

/**
 * Demo
 */
export const App = () => {
  // get window size
  const windowSize = useWindowSize();

  return (
    <div>
      <p> Resize your browser and check width & height change.</p>
      <ul>
        <li>window width: {windowSize.width}</li>
        <li>window height: {windowSize.height}</li>
      </ul>
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
