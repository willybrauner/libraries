import React, {
  CSSProperties,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useWindowSize } from "@wbe/use-window-size";
import { lazyImage } from "@wbe/lazy-image";
import { DEFAULT_SRC_IMAGE_PLACEHOLDER } from "./common";
import { TImageData, TLazy } from "./types";

const componentName = "Image";

interface IProps {
  // image to display before lazyload, default is lightest base64 transparent image
  srcPlaceholder?: string;
  // src URL to lazyload
  src?: string;
  // srcset URL to lazyload
  srcset?: string;
  // list of images with dimension used to build srcset attr
  data?: TImageData[];

  // callback when lazyload state change (lazyload | lazyloading | lazyloaded)
  lazyCallback?: (lazyState: TLazy) => void;
  // intersection observer options
  observerOptions?: IntersectionObserverInit;

  // style attrs
  style?: CSSProperties;
  width?: number | string;
  height?: number | string;

  // alt attr and aria html
  alt: string;
  ariaLabel?: string;
  // class name added on root element
  className?: string;
}

/**
 * React Image
 */
export function Image(props: IProps) {
  const rootRef = useRef<HTMLImageElement>(null);
  const imageInstance = useRef(null);
  const [lazyState, setLazyState] = useState<TLazy>("lazyload");

  /**
   * 1. Root Dimension
   */
  const [rootRefWidth, setRootRefWidth] = useState<number>(null);
  const windowSize = useWindowSize();
  useEffect(() => {
    if (rootRef.current != null) setRootRefWidth(rootRef.current.offsetWidth);
  }, [windowSize]);

  /**
   * Create lazyImage instance
   */
  useLayoutEffect(() => {
    // create instance
    imageInstance.current = lazyImage({
      $element: rootRef.current,
      srcset:
        props.data?.map((el) => `${el.url} ${el.width}w`).join(", ") ||
        props.srcset,
      src: props.src,
      observerOptions: props.observerOptions || {},
      lazyCallback: (state: TLazy) => {
        props.lazyCallback?.(state);
        setLazyState(state);
      },
    });
    // start
    imageInstance.current.start();
    // stop
    return () => imageInstance.current.stop();
  }, [
    props.data,
    props.srcset,
    props.src,
    props.lazyCallback,
    props.observerOptions,
  ]);

  /**
   * Render
   */
  return (
    <img
      ref={rootRef}
      className={[componentName, props.className, lazyState]
        .filter((e) => e)
        .join(" ")}
      alt={props.alt}
      style={props.style}
      width={props.width}
      height={props.height}
      sizes={rootRefWidth && `${rootRefWidth}px`}
      src={props.srcPlaceholder || DEFAULT_SRC_IMAGE_PLACEHOLDER}
      data-srcset={props.srcset}
      data-src={props.src}
      aria-label={props.ariaLabel}
    />
  );
}
