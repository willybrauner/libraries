import { useEffect } from "react";

const componentName: string = "useAsyncEffect";
const debug = require("debug")(`lib:${componentName}`);

/**
 * useAsyncEffect
 */
function useAsyncEffect(pEffect: () => void, pInputs?: any[]): void {
  useEffect(() => {
    pEffect();
  }, pInputs);
}

export { useAsyncEffect };
