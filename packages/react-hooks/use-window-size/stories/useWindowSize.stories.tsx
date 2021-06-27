import { useWindowSize, IWindowSize } from "../src";
import React from "react";
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
  component: App,
};
