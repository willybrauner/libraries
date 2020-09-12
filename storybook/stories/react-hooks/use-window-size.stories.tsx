import React from "react";
import README from "@wbe/use-window-size/README.md";
import useWindowSize from "@wbe/use-window-size";
import "../../global-style.css";

const storyName = "use-window-size";

export const App = () => {
  const windowSize = useWindowSize();
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
  parameters: {
    readme: {
      data: "coucou"
    }
  }
};
