import React from "react";
import { storiesOf } from "@storybook/react";
import README from "@wb/use-window-size/README.md";
import { useWindowSize } from "@wb/use-window-size";
const storyName = "use-window-size";
import "../style.css";

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
storiesOf(storyName, module)
  .addParameters({
    readme: {
      sidebar: README
    }
  })
  .add("basic example", () => <App />, {
    info: README
  });
