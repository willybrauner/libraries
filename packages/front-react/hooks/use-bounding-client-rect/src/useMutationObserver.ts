import {useEffect, MutableRefObject} from 'react';

/**
 * useMutationObserver hook
 * Returns a mutation observer for a React Ref and fires a callback
 *
 * @doc: https://github.com/imbhargav5/rooks/blob/dev/packages/shared/useMutationObserver.ts
 *
 * @param {MutableRefObject<HTMLElement>} pRef React pRef on which mutations are to be observed
 * @param {MutationCallback} pCallback Function that needs to be fired on mutation
 * @param {MutationObserverInit} pOptions
 */

const config: MutationObserverInit = {
  attributes: true,
  characterData: true,
  subtree: true,
  childList: true
};

export function useMutationObserver(
  pRef: MutableRefObject<HTMLElement>,
  pCallback: MutationCallback,
  pOptions: MutationObserverInit = config
) {
  // fire, init, when all arg change
  useEffect(() => {
    // Create an observer instance linked to the callback function
    if (pRef.current) {
      const observer = new MutationObserver(pCallback);

      // Start observing the target node for configured mutations
      observer.observe(pRef.current, pOptions);

      // on did mount, disconnect observer
      return () => observer.disconnect();
    }
  }, [pRef.current, pCallback, pOptions]);
}
