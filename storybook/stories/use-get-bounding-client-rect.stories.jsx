import React, { useRef } from "react";
import { storiesOf } from "@storybook/react";
import { EListener, useBoundingClientRect } from "@wb/use-bounding-client-rect";
import README from "@wb/use-bounding-client-rect/README.md";
const storyName = "use-bounding-client-rect";
import "../style.css";

/**
 * Demo
 */
export const App = () => {
  // get ref
  const elementRef = useRef(null);

  // get ref rect
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
