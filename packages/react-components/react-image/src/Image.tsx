import React, {
  CSSProperties,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useWindowSize } from "@wbe/use-window-size";
const componentName = "Image";

export type TImageData = {
  url: string;
  width?: number;
  height?: number;
};

export type TLazy = "lazyload" | "lazyloading" | "lazyloaded";

interface IProps {
  // image to display before lazyload
  // default is lightest base64 transparent image
  srcPlaceholder?: string;

  // src URL to lazyload
  src?: string;

  // srcset URL to lazyload
  srcset?: string;

  // list of images with dimension used to build srcset attr
  data?: TImageData[];

  // callback when lazyload state change (lazyload | lazyloading | lazyloaded)
  lazyCallback?: (lazyState: TLazy) => void;

  // alt attr and aria html
  alt: string;
  ariaLabel?: string;

  // class name added on root element
  className?: string;

  // style attrs
  style?: CSSProperties;
  width?: number | string;
  height?: number | string;

  // intersection observer options
  observerOptions?: IntersectionObserverInit;
}

Image.defaultProps = {
  srcPlaceholder:
    "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
};

/**
 * React Image
 *
 * - lazyload src or srcset
 *
 */
export function Image(props: IProps) {
  const rootRef = useRef<HTMLImageElement>(null);

  /**
   * 1. Root Dimension
   */
  const [rootRefWidth, setRootRefWidth] = useState<number>(null);
  const windowSize = useWindowSize();
  useEffect(() => {
    if (rootRef.current != null) setRootRefWidth(rootRef.current.offsetWidth);
  }, [windowSize]);

  /**
   * 2. Prepare srcSet from data
   */
  const [srcSet, setSrcSet] = useState<string>(null);

  useLayoutEffect(() => {
    if (!props.data) return;
    setSrcSet(props.data.map((el) => `${el.url} ${el.width}w`).join(", "));
  }, [props.data]);

  /**
   * 3. Lazy
   * - Check if is in viewport
   * - Preload image
   * - copy data-src on src / data-srcset on srcset
   */
  const [lazyState, setLazyState] = useState<TLazy>("lazyload");

  useLayoutEffect(() => {
    if (!("IntersectionObserver" in window) || !rootRef.current) return;
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setLazyState("lazyloading");

          const $img: HTMLImageElement = entry.target;
          lazyImageObserver.unobserve($img);

          const dataSrcValue = $img.getAttribute("data-src");

          if (dataSrcValue) {
            $img.src = dataSrcValue;
          }

          const dataSrcSetValue = $img.getAttribute("data-srcset");
          if (dataSrcSetValue) {
            $img.srcset = dataSrcSetValue;
          }
          // when img is loading, update lazy state
          $img.onload = () => setLazyState("lazyloaded");
        }
      });
    };
    // create observer
    const lazyImageObserver = new IntersectionObserver(
      observerCallback,
      props.observerOptions
    );
    // start to observe
    [rootRef.current].forEach((lazyImage) =>
      lazyImageObserver.observe(lazyImage)
    );
  }, []);

  // execute callback each type lazy state change
  useEffect(() => {
    props.lazyCallback?.(lazyState);
  }, [lazyState]);

  /**
   * Render
   */
  return (
    <img
      ref={rootRef}
      className={`${componentName} ${lazyState}`}
      alt={props.alt}
      style={props.style}
      width={props.width}
      height={props.height}
      sizes={rootRefWidth && `${rootRefWidth}px`}
      src={props.srcPlaceholder}
      data-srcset={props.srcset || srcSet}
      data-src={props.src}
      aria-label={props.ariaLabel}
    />
  );
}
