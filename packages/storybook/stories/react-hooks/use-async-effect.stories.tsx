import "../../global-style.css";
import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import README from "@wbe/use-async-effect/README.md";
import { useAsyncEffect, useAsyncLayoutEffect } from "@wbe/use-async-effect";

// set story name
const storyName = "use-async-effect";

/**
 * Demo
 */
const UseAsyncEffectExample = () => {
  const [promiseIsResolved, setPromiseIsResolved] = useState(false);

  useAsyncEffect(async () => {
    new Promise(resolve =>
      setTimeout(() => {
        setPromiseIsResolved(true);
        resolve();
      }, 1000)
    );
  });

  return (
    <div>
      Promise is resolved?{" "}
      <span
        style={{ color: promiseIsResolved ? "green" : "red" }}
      >{`${promiseIsResolved}`}</span>
    </div>
  );
};

const UseAsyncLayoutEffectExample = () => {
  const [promiseIsResolved, setPromiseIsResolved] = useState(false);

  useAsyncLayoutEffect(async () => {
    new Promise(resolve =>
      setTimeout(() => {
        setPromiseIsResolved(true);
        resolve();
      }, 1000)
    );
  });

  return (
    <div>
      Promise is resolved?{" "}
      <span
        style={{ color: promiseIsResolved ? "green" : "red" }}
      >{`${promiseIsResolved}`}</span>
    </div>
  );
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
  .add("with useAsyncEffect", () => <UseAsyncEffectExample />)
  .add("with useAsyncLayoutEffect", () => <UseAsyncLayoutEffectExample />);
