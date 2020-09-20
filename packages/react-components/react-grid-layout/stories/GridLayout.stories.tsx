import { GridLayout, EOrientation } from "../src/GridLayout";
import React, { CSSProperties, useEffect, useState } from "react";
import "../../../../storybook/global-style.css";

const storyName = "react-grid-layout";

export const App = ({
  columnNumber,
  gutterSize,
  maxSize,
  center,
  color,
  orientation
}: {
  columnNumber: number;
  gutterSize: string | number;
  maxSize: string | number;
  center: boolean;
  color: string;
  orientation: EOrientation;
}) => {
  // Allow to toggle grid visibility
  const [showGrid, setShowGrid] = useState(true);
  useEffect(() => {
    document.body.onkeyup = pEvent => {
      if (pEvent.code === "KeyG") setShowGrid(!showGrid);
    };
  });

  return (
    <div className="App">
      {showGrid && (
        <GridLayout
          orientation={orientation}
          columnsNumber={columnNumber}
          gutterSize={gutterSize}
          maxSize={maxSize}
          center={center}
          color={color}
        />
      )}
      <div className="App_wrapper" style={css.wrapper}>
        <h1 className="App_title" style={css.title}>
          React Grid Layout Component
        </h1>
        <p>Just press "G Key" on your keyboard to toggle the grid. 💪</p>
      </div>
    </div>
  );
};

const css: { [x: string]: CSSProperties } = {
  wrapper: {
    position: "absolute",
    top: "50%",
    left: "calc(100vw/6*1)",
    transform: "translateY(-50%)"
  },
  title: {
    fontSize: "3rem"
  }
};

App.storyName = "basic example";

export default {
  title: `react-components/${storyName}`,
  component: App,
  args: {
    columnNumber: 9,
    gutterSize: 30,
    maxSize: 1024,
    center: true,
    color: "rgba(255, 0, 0, 0.14)"
  }
};
