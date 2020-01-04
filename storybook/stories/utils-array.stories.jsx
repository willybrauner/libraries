import React from "react";
import { storiesOf } from "@storybook/react";
import README from "@wbe/utils-array/README.md";
import { merge } from "@wbe/utils-array";
const storyName = "utils-array";
import "../style.css";

/**
 * Demo
 */
export const App = () => {
  const arr = merge([...["collection", "hello"], ["test", "second-array"]]);
  console.log(arr);
  return <div>final string: {arr}</div>;
};

/**
 * Config
 */
storiesOf(storyName, module)
  .addParameters({
    readme: {
      sidebar: README,
      codeTheme: "darcula"
    }
  })
  .add("basic example", () => <App />, {
    info: README
  });
