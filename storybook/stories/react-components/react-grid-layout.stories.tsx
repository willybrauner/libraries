import React, { CSSProperties, useEffect, useState } from "react";
import { storiesOf } from "@storybook/react";
import GridLayout, { EOrientation } from "@wbe/react-grid-layout";
import README from "@wbe/react-grid-layout/README.md";
import "../../global-style.css";
import {
  withKnobs,
  text,
  number,
  boolean,
  optionsKnob as options
} from "@storybook/addon-knobs";

const storyName = "react-grid-layout";
/**
 * Demo
 */
const App = ({ gutter }: { gutter: number }) => {
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
      {showGrid && (
        <GridLayout
          orientation={options(
            "orientation",
            {
              vertical: EOrientation.VERTICAL,
              horizontal: EOrientation.HORIZONTAL
            },
            EOrientation.VERTICAL,
            {
              display: "select"
            }
          )}
          columnsNumber={number("columnNumber", 6)}
          gutterSize={number("gutterSize", gutter)}
          maxSize={text("maxSize", "1024")}
          center={boolean("center", true)}
          color={text("color", "rgba(255, 0, 0, 0.14)")}
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

/**
 * Config
 */
storiesOf(`react-components/${storyName}`, module)
  .addParameters({
    readme: {
      sidebar: README
    }
  })
  .addDecorator(withKnobs)
  .add("basic example", () => <App gutter={20} />)
  .add("column line", () => <App gutter={0} />);