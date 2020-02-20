import React from "react";
import { storiesOf } from "@storybook/react";
import README from "@wbe/use-window-size/README.md";
import useWindowSize from "@wbe/use-window-size";
import "../../global-style.css";

// set story name
const storyName = "use-window-size";

/**
 * Demo
 */
export const App = () => {
  // get window size
  const { width, height } = useWindowSize();

  return (
    <div>
      <p> Resize your browser and check width & height change.</p>
      <ul>
        <li>window width: {width}</li>
        <li>window height: {height}</li>
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
      sidebar: README
    }
  })
  .add("basic example", () => <App />, {
    info: README
  });
