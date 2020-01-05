import React, { useEffect, useState } from "react";
import { storiesOf } from "@storybook/react";
import GridLayout from "@wbe/react-grid-layout";
import README from "@wbe/react-grid-layout/README.md";
import "../../style.css";
const storyName = "react-grid-layout";

/**
 * Demo
 */
export const App = ({ gutterSize }) => {
  // show grid state
  const [showGrid, setShowGrid] = useState(true);

  /**
   * On key up listener
   * Allow to toggle grid visibility
   */
  useEffect(() => {
    document.body.onkeyup = pEvent => {
      if (pEvent.code === "KeyG") setShowGrid(!showGrid);
    };
  });

  return (
    <div className="App">
      <div className="App_wrapper" style={css.wrapper}>
        <h1 className="App_title" style={css.title}>
          React Grid Layout Component
        </h1>
        <p>Just press "G Key" on your keyboard to toggle the grid. 💪</p>
      </div>
      {showGrid && (
        <GridLayout columnsNumber={6} gutterSize={gutterSize} maxWidth={1024} />
      )}
    </div>
  );
};

const css = {
  wrapper: {
    position: "absolute",
    top: "50%",
    left: "calc(100vw/6*1)",
    transform: "translateY(-50%)"
  },
  title: {
    "font-size": "3rem"
  }
};

/**
 * Config
 */
storiesOf(`react-components/${storyName}`, module)
  .addParameters({
    readme: {
      sidebar: README,
      codeTheme: "darcula"
    }
  })
  .add("basic example", () => <App gutterSize={20} />)
  .add("column line", () => <App gutterSize={0} />);
