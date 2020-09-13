// @ts-ignore
import useWindowSize, { IWindowSize } from "../src/useWindowSize";
import React from "react";
import "../../../../storybook/global-style.css";

const storyName = "use-window-size";

export const App = () => {
  const windowSize: IWindowSize = useWindowSize();
  return (
    <div>
      <p> Resize your browser. and check values change.</p>
      <pre>{JSON.stringify(windowSize, null, 2)}</pre>
    </div>
  );
};

App.storyName = "basic example";

export default {
  title: `react-hooks/${storyName}`,
  component: App
};
