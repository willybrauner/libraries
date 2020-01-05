import React, { useRef } from "react";
import { storiesOf } from "@storybook/react";
import README from "@wbe/use-is-in-viewport/README.md";
import useIsInViewport from "@wbe/use-is-in-viewport";
import "../../style.css";

// set story name
const storyName = "use-is-in-viewport";

/**
 * Demo
 */
export const App = () => {
  const rootRef = useRef(null);
  const isInViewport = useIsInViewport();

  return <div ref={rootRef}>{storyName} TODO</div>;
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
