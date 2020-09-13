// @ts-ignore
import useIsInViewport from "../src";
import React, { CSSProperties, useEffect, useRef, useState } from "react";
import "../../../../storybook/global-style.css";

const storyName = "use-is-in-viewport";

const css: { [x: string]: CSSProperties } = {
  text: {
    position: "fixed",
    top: "0",
    left: "0",
    padding: "1rem"
  },
  element: {
    marginTop: "100vh",
    marginBottom: "5rem",
    width: "200px",
    height: "200px",
    background: "green"
  }
};

export const App = ({ offset = 0 }: { offset: number }) => {
  const elementRef = useRef<HTMLDivElement>(null);
  // Check if is in viewport
  const isInViewport: boolean = useIsInViewport(elementRef, true, offset);
  // Create a state we want to toggle each time element is or not in viewport
  const [isVisible, setIsVisible] = useState<boolean>(false);
  // toggle this state
  useEffect(() => setIsVisible(isInViewport), [isInViewport]);

  return (
    <div style={css.root} key={offset}>
      <div style={css.text}>
        <p>
          Element is visible?{" "}
          <span
            style={{ color: isVisible ? "green" : "red" }}
          >{`${isVisible}`}</span>
        </p>
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
App.storyName = "basic example";

export default {
  title: `react-hooks/${storyName}`,
  component: App
};

export const Secondary = App.bind({});
Secondary.args = { offset: 100 };
Secondary.storyName = "with offset";
