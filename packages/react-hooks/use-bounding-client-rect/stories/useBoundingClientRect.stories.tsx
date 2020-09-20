// @ts-ignore
import { useBoundingClientRect, EListener } from "../src/useBoundingClientRect";
import React, { useRef } from "react";
import "../../../../storybook/global-style.css";

const storyName = "use-bounding-client-rect";

export const App = () => {
  const rootRef = useRef(null);
  const rect = useBoundingClientRect(rootRef, EListener.ON_SCROLL_AND_RESIZE);
  return (
    <div ref={rootRef}>
      <p> Resize your browser and check element properties change.</p>
      <pre>{JSON.stringify(rect, null, 2)}</pre>
    </div>
  );
};

App.storyName = "basic example";

export default {
  title: `react-hooks/${storyName}`,
  component: App
};
