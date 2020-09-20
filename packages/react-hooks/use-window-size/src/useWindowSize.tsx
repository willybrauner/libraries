import { useEffect, useState } from "react";

/**
 * Window size dimensions interface
 */
interface IWindowSize {
  width: number;
  height: number;
}

/**
 * Window Size
 * return a object with innerDimension
 */
function useWindowSize(): IWindowSize {
  // --------------------------------------------------------------------------- STATES

  const [windowSize, setWindowSize] = useState<IWindowSize>({
    width: window?.innerWidth,
    height: window?.innerHeight
  });

  // --------------------------------------------------------------------------- EFFECTS

  useEffect(() => {
    const resizeHandler = () => {
      setWindowSize({
        width: window?.innerWidth,
        height: window?.innerHeight
      });
    };
    resizeHandler();
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return windowSize;
}

export { useWindowSize, IWindowSize };
