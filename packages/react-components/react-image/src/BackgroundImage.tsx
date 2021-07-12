import React, { CSSProperties, useLayoutEffect, useRef, useState } from "react";
import { lazyBackgroundImage } from "@wbe/lazy-image";
import { DEFAULT_SRC_IMAGE_PLACEHOLDER } from "./common";
import { TImageData, TLazy } from "./types";

const componentName = "BackgroundImage";

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
  // intersection observer options
  observerOptions?: IntersectionObserverInit;

  // style attrs
  style?: CSSProperties;
  // class name added on root element
  className?: string;
  // aria label on component
  ariaLabel?: string;
}

export function BackgroundImage(props: IProps) {
  const rootRef = useRef(null);
  const backgroundImage = useRef(null);
  const [lazyState, setLazyState] = useState<TLazy>("lazyload");

  useLayoutEffect(() => {
    // prepare URL to inject in DOM
    let url =
      props.data?.map((el) => `${el.url} ${el.width}w`).join(", ") ||
      props.srcset ||
      props.src;

    // create instance
    backgroundImage.current = lazyBackgroundImage({
      $element: rootRef.current,
      srcset: url,
      observerOptions: props.observerOptions || {},
      lazyCallback: (state: TLazy) => {
        props.lazyCallback?.(state);
        setLazyState(state);
      },
    });
    // start
    backgroundImage.current.start();
    // stop
    return () => backgroundImage.current.stop();
  }, [
    props.data,
    props.srcset,
    props.src,
    props.lazyCallback,
    props.observerOptions,
  ]);

  return (
    <div
      ref={rootRef}
      className={[componentName, props.className, lazyState]
        .filter((e) => e)
        .join(" ")}
      style={{
        ...{
          backgroundImage: `url(${
            props.srcPlaceholder || DEFAULT_SRC_IMAGE_PLACEHOLDER
          })`,
          ...(props.style || {}),
        },
      }}
      aria-label={props.ariaLabel}
    />
  );
}
