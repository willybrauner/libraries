import { useEffect, useRef } from "react";

/**
 * Execute effect only on component is update
 * @param effect
 * @param dependencies
 */
export function useDidUpdate(effect: () => void, dependencies?: any[]): void {
  // initial reference
  const initialRef = useRef<boolean>(true);
  // listen to initial Action
  useEffect(() => {
    if (initialRef.current) {
      // set to false the initial ref
      initialRef.current = false;
    } else {
      // do something
      effect();
    }
  }, dependencies);
}

export { useDidUpdate as default };
