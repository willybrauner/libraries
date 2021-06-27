import { useEffect, useLayoutEffect } from "react";

/**
 * useAsyncEffect
 */
function useAsyncEffect(pEffect: () => void, pInputs?: any[]): void {
  useEffect(() => {
    pEffect();
  }, pInputs);
}

/**
 * useAsyncLayoutEffect
 */
function useAsyncLayoutEffect(pEffect: () => void, pInputs?: any[]): void {
  useLayoutEffect(() => {
    pEffect();
  }, pInputs);
}

export { useAsyncEffect, useAsyncLayoutEffect };
