import React, { CSSProperties, useEffect, useRef, useState } from "react";
import { storiesOf } from "@storybook/react";
import README from "@wbe/use-is-in-viewport/README.md";
import useIsInViewport from "@wbe/use-is-in-viewport";
import "../../global-style.css";

// set story name
const storyName = "use-is-in-viewport";

/**
 * Demo
 */
export const App = ({ offset }: { offset: number }) => {
  // Get element ref
  const elementRef = useRef<HTMLDivElement>(null);

  // Check if is in viewport (hook return boolean)
  const isInViewport: boolean = useIsInViewport(elementRef, true, offset);

  // Create a state we want to toggle each time element is or not in viewport
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // Toggle the state
  useEffect(() => setIsVisible(isInViewport), [isInViewport]);

  return (
    <div style={css.root}>
      <div style={css.text}>
        <div>
          Element is visible?{" "}
          <span
            style={{ color: isVisible ? "green" : "red" }}
          >{`${isVisible}`}</span>
        </div>
        {offset !== 0 && <div style={css.note}>with {offset}px offset</div>}
        <div style={css.note}>(scroll down ↓)</div>
      </div>
      <div
        ref={elementRef}
        style={{
          ...css.element,
          background: isVisible ? "green" : "red"
        }}
      />
    </div>
  );
};

/**
 * Style
 */
const css: { [x: string]: CSSProperties } = {
  text: {
    position: "fixed",
    top: "0",
    left: "0",
    padding: "1rem"
  },
  note: {
    marginTop: "1rem"
  },
  element: {
    marginTop: "100vh",
    marginBottom: "5rem",
    width: "200px",
    height: "200px",
    background: "green"
  }
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
  .add("basic example", () => <App offset={0} />)
  .add("with offset", () => <App offset={100} />);
