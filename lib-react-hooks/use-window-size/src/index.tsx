import { useEffect, useState } from "react";

/**
 * Window size dimensions interface
 */
export interface IWindowSize {
  width: number;
  height: number;
}

/**
 * Window Size
 * return a object with innerDimension object
 * @constructor
 */
function useWindowSize(): IWindowSize {
  // --------------------------------------------------------------------------- STATES

  // Set a new state
  const [windowSize, setWindowSize] = useState<IWindowSize>({
    width: window?.innerWidth,
    height: window?.innerHeight
  });

  // --------------------------------------------------------------------------- EFFECTS

  useEffect(() => {
    // resize handler
    const resizeHandler = () => {
      setWindowSize({
        width: window?.innerWidth,
        height: window?.innerHeight
      });
    };
    // start check viewport dimensions
    resizeHandler();
    // listen rezise
    window.addEventListener("resize", resizeHandler);

    return () => {
      // stop to listen
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  // retourner l'objet
  return windowSize;
}

export { useWindowSize as default };
