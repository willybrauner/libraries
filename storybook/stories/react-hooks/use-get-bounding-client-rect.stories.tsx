import React, { useRef } from "react";
import useBoundingClientRect, {
  EListener
} from "@wbe/use-bounding-client-rect";
import README from "@wbe/use-bounding-client-rect/README.md";
import "../../global-style.css";

const storyName = "use-bounding-client-rect";

export const App = () => {
  const elementRef = useRef(null);
  const rect = useBoundingClientRect(
    elementRef,
    EListener.ON_SCROLL_AND_RESIZE
  );
  return (
    <div ref={elementRef}>
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
