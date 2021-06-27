import { MutableRefObject, useCallback, useEffect, useState } from "react";
import { useWindowSize, IWindowSize } from "@wbe/use-window-size";
import {
  useBoundingClientRect,
  EListener,
} from "@wbe/use-bounding-client-rect";

/**
 * Check if a component is visible in viewport
 * @param {MutableRefObject<HTMLElement>} pRef: element ref to check
 * @param {boolean} pToggleVisibility: Repeat the check visibility even if ref element visibility is already passed to true
 * @param {number} pOffset: Define a positive or negative offset to the ref element
 * @return {boolean}
 */
function useIsInViewport(
  pRef: MutableRefObject<HTMLElement>,
  pToggleVisibility: boolean = false,
  pOffset: number = 0
): boolean {
  // get component dimensions
  const refRect = useBoundingClientRect(pRef, EListener.ON_SCROLL_AND_RESIZE);
  // get window size
  const windowSize = useWindowSize();
  // create a visible state
  const [isVisible, setIsVisible] = useState<boolean>(false);

  /**
   * Is in Viewport
   * @param pRefRect
   * @param pWindowSize
   * @param pOffset
   */
  const isInViewPort = (
    pRefRect: ClientRect,
    pWindowSize: { width: number; height: number },
    pOffset: number
  ): boolean => {
    // check
    if (!pRefRect || !pWindowSize) return;

    // EL TOP
    const topIsVisible =
      // if el top is visible above the viewport bottom
      pRefRect.top < pWindowSize.height - pOffset &&
      // and his top is visible below viewport top
      pRefRect.top > 0;

    //  EL BOTTOM
    const bottomIsVisible =
      // if el bottom is visible above the viewport bottom
      pRefRect.bottom < pWindowSize.height &&
      // and el bottom is visible below viewport top
      pRefRect.bottom - pOffset > 0;

    // IN CASE ELEMENT IS BIGGER OR EGAL TO VIEWPORT
    const isCropOrEgalOnTopAndBottom =
      // if el top is above the viewport
      pRefRect.top <= 0 &&
      // and if the bottom of the el is at the same time below the viewport
      pRefRect.bottom >= pWindowSize.height;

    // return boolean result
    return topIsVisible || bottomIsVisible || isCropOrEgalOnTopAndBottom;
  };

  /**
   *  Update state depend of element size & position
   */
  const updateState = useCallback(
    (pRefRect: ClientRect, pWindowSize: IWindowSize, pOffset: number): void => {
      // if is in viewport
      if (isInViewPort(pRefRect, pWindowSize, pOffset)) {
        // the element is visible
        setIsVisible(true);
        // if element is not in viewport
      } else {
        // if element is already visible and toggle option is not activated, exit
        if (isVisible && !pToggleVisibility) return;
        // the element isn't visible in the window
        setIsVisible(false);
      }
    },
    [refRect, windowSize]
  );

  // Start check
  useEffect(
    () => updateState(refRect, windowSize, pOffset),
    [refRect, windowSize]
  );

  // return
  return isVisible;
}

export { useIsInViewport };
