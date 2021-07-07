import React, { CSSProperties, useLayoutEffect, useRef } from "react";

// TODO move in COMMON TYPE file
import { TImageData, TLazy } from "./Image";

// TODO import real lib
// @ts-ignore
import { lazyBackgroundImage } from "../../../utils/lazy-background-image/src";

const componentName = "BackgroundImage";

interface IProps {
  // TODO injecter une image placeholder avant le preload (dans la methode native)
  // image to display before lazyload
  // default is lightest base64 transparent image
  srcPlaceholder?: string;
  // src URL to lazyload
  src?: string;
  // srcset URL to lazyload
  srcset?: string;
  // list of images with dimension used to build srcset attr
  data?: TImageData[];

  // TODO remonter le lazy callback de la function native
  // callback when lazyload state change (lazyload | lazyloading | lazyloaded)
  lazyCallback?: (lazyState: TLazy) => void;

  // intersection observer options
  // TODO remonter les options
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

  useLayoutEffect(() => {
    let url =
      props.data?.map((el) => `${el.url} ${el.width}w`).join(", ") ||
      props.srcset ||
      props.src;

    backgroundImage.current = lazyBackgroundImage({
      $element: rootRef.current,
      srcset: url,
    });
    backgroundImage.current.start();
    return () => backgroundImage.current.stop();
  }, [props.data, props.srcset, props.src]);

  return (
    <div
      ref={rootRef}
      className={`${componentName}`}
      style={props.style}
      aria-label={props.ariaLabel}
    />
  );
}
