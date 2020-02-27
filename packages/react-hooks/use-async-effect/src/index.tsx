// component name
import { useEffect, useLayoutEffect } from "react";

const componentName: string = "useAsyncEffect";
//  init debug tool
const debug = require("debug")(`lib:${componentName}`);

/**
 * useAsyncEffect
 */
function useAsyncEffect(pEffect: () => void, pInputs?: any[]) {
  useEffect(() => {
    pEffect();
  }, pInputs);
}
/**
 * useAsyncLayoutEffect
 */
function useAsyncLayoutEffect(pEffect: () => void, pInputs?: any[]) {
  useLayoutEffect(() => {
    pEffect();
  }, pInputs);
}

export { useAsyncEffect, useAsyncLayoutEffect };
