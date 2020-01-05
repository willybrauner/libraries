import React, { useRef } from "react";
import useBoundingClientRect, {
  EListener
} from "@wbe/use-bounding-client-rect";
import { storiesOf } from "@storybook/react";
import README from "@wbe/use-bounding-client-rect/README.md";
const storyName = "use-bounding-client-rect";
import "../../global-style.css";

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
