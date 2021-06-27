import { useEffect, useLayoutEffect } from "react";

/**
 * useAsyncEffect
 */
export function useAsyncEffect(pEffect: () => void, pInputs?: any[]): void {
  useEffect(() => {
    pEffect();
  }, pInputs);
}

/**
 * useAsyncLayoutEffect
 */
export function useAsyncLayoutEffect(
  pEffect: () => void,
  pInputs?: any[]
): void {
  useLayoutEffect(() => {
    pEffect();
  }, pInputs);
}
