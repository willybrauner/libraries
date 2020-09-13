import "../../global-style.css";
import React, { useState } from "react";
import README from "@wbe/use-async-effect/README.md";
import { useAsyncEffect, useAsyncLayoutEffect } from "@wbe/use-async-effect";

const storyName = "use-async-effect";

export const UseAsyncEffectExample = () => {
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
    <p>
      Promise is resolved?{" "}
      <span
        style={{ color: promiseIsResolved ? "green" : "red" }}
      >{`${promiseIsResolved}`}</span>
    </p>
  );
};

UseAsyncEffectExample.storyName = "with async effect";

export const UseAsyncLayoutEffectExample = () => {
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
    <p>
      Promise is resolved?{" "}
      <span
        style={{ color: promiseIsResolved ? "green" : "red" }}
      >{`${promiseIsResolved}`}</span>
    </p>
  );
};
UseAsyncLayoutEffectExample.storyName = "with async layout effect";

export default {
  title: `react-hooks/${storyName}`,
  component: UseAsyncEffectExample
};
