import { useLayoutEffect } from "react";

const componentName: string = "useAsyncLayoutEffect";
const debug = require("debug")(`lib:${componentName}`);

/**
 * useAsyncLayoutEffect
 */
function useAsyncLayoutEffect(pEffect: () => void, pInputs?: any[]): void {
  useLayoutEffect(() => {
    pEffect();
  }, pInputs);
}

export { useAsyncLayoutEffect };
