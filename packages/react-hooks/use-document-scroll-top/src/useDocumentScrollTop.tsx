import { useEffect, useState } from "react";

const componentName: string = "useDocumentScrolltop";
const debug = require("debug")(`lib:${componentName}`);

/**
 * useDocumentScrollTop
 * return {number}
 */
function useDocumentScrollTop(): number | null {
  // Disable utils for SSR
  if (typeof window === "undefined") return null;

  // init set scroll top position
  const [scrollTopPosition, setScrollTopPosition] = useState<number>(
    (window.pageYOffset || document.documentElement.scrollTop) -
      (document.documentElement.clientTop || 0)
  );

  // scroll Handler
  const scrollHandler = () => {
    // set new document scroll Top (distance px scroll to top document )
    setScrollTopPosition(
      (window.pageYOffset || document.documentElement.scrollTop) -
        (document.documentElement.clientTop || 0)
    );
  };

  useEffect(() => {
    // start first
    scrollHandler();
    // listen scroll event
    document.addEventListener("scroll", scrollHandler);
    return () => {
      // stop to listen scroll event
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  // return scroll top position
  return scrollTopPosition;
}

export { useDocumentScrollTop };
