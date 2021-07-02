import React, {
  CSSProperties,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useWindowSize } from "@wbe/use-window-size";

const componentName = "Image";
const debug = require("debug")(`front:${componentName}`);

export type TImageData = {
  url: string;
  width?: number;
  height?: number;
};

export type TLazy = "lazyload" | "lazyloading" | "lazyloaded";

interface IProps {
  srcset?: string;
  data?: TImageData[];
  lazy?: boolean;
  lazyCallback?: (lazyState: TLazy) => void;
  alt: string;
  ariaLabel?: string;
  placeholderColor?: string;
  placeholderImgSrc?: string;
  verticalRatio?: number;
  className?: string;
  style?: {
    root: CSSProperties;
    placeholder: CSSProperties;
    img: CSSProperties;
  };
}

Image.defaultProps = {
  lazy: true,
  placeholderColor: "transparent",
  placeholderImgSrc:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
};

/**
 * React Image
 *
 * TODO
 * - gérer le cas du non "lazy"
 * - gérer le background image type
 * - type img est ce qu'on garde object-fit par defaut ?
 */
export function Image(props: IProps) {
  const rootRef = useRef(null);
  const imgRef = useRef(null);

  /**
   * Root Dimension
   */
  const [rootRect, setRootRect] = useState<ClientRect>(null);
  const windowSize = useWindowSize();
  useEffect(() => {
    if (rootRef.current != null)
      setRootRect(rootRef.current?.getBoundingClientRect());
  }, [windowSize]);

  /**
   * Lazy
   * - Check if is in viewport
   * - Preload image
   */
  const [lazyState, setLazyState] = useState<TLazy>("lazyload");

  useLayoutEffect(() => {
    const intersectionObserverInWindow = "IntersectionObserver" in window;
    if (!props.lazy || !intersectionObserverInWindow || !imgRef.current) return;

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          let element: any = entry.target;

          lazyImageObserver.unobserve(element);

          // start preload
          element.src = element.dataset.src;
          element.srcset = element.dataset.srcset;

          // when img is loading, change lazy state
          element.onload = () => setLazyState("lazyloaded");
        }
      });
    };

    // create observer
    const lazyImageObserver = new IntersectionObserver(observerCallback);

    // start to observe
    [imgRef.current].forEach((lazyImage) =>
      lazyImageObserver.observe(lazyImage)
    );
  }, [props.lazy]);

  // execute callback each type lazy state change
  useEffect(() => {
    if (!props.lazy) return;
    props.lazyCallback?.(lazyState);
  }, [lazyState]);

  /**
   * srcset
   */
  const [srcSet, setSrcSet] = useState<string>(null);

  useLayoutEffect(() => {
    if (!props.data) return;

    // prepare srcset attr
    const buildSrcSet = (data = props.data): string =>
      data.map((el) => `${el.url} ${el.width}w`).join(", ");

    setSrcSet(buildSrcSet());
  }, [props.data]);

  /**
   * Style
   */
  const paddingRatio = useMemo((): string => {
    let ratio: number;
    const firstImageData = props.data?.[0];
    // if vertical ratio is set
    if (props.verticalRatio) {
      ratio = props.verticalRatio;
    }
    // else if image as dimensions, calc ratio
    else if (firstImageData?.width && firstImageData?.height) {
      ratio = firstImageData.height / firstImageData.width;
    }

    return ratio ? `${(ratio * 100).toFixed(3)}%` : null;
  }, [props.data, props.verticalRatio]);

  // prepare dom style
  const style: { [x: string]: CSSProperties } = useMemo(
    () => ({
      root: {
        width: "100%",
        height: "auto",
        ...(props.style?.root || {}),
      },

      placeholder: {
        display: "block",
        position: "relative",
        backgroundColor: props.placeholderColor,
        paddingBottom: paddingRatio,
        ...(props.style?.placeholder || {}),
      },

      img: {
        display: "block",
        position: "absolute",
        top: "0",
        bottom: "0",
        left: "0",
        right: "0",
        width: "100%",
        height: "100%",
        objectFit: "cover",
        ...(props.style?.img || {}),
      },
    }),
    [props.style, props.placeholderColor, paddingRatio]
  );

  /**
   * Render
   */

  return (
    <div
      className={["Image", props.className].filter((e) => e).join(" ")}
      style={style.root}
      ref={rootRef}
    >
      <span className={"Image_placeholder"} style={style.placeholder} />
      <img
        sizes={rootRect?.width && `${rootRect.width}px`}
        className={`Image_img ${lazyState}`}
        data-srcset={props.srcset || srcSet}
        data-src={props.data?.[0]?.url}
        src={props.placeholderImgSrc}
        alt={props.alt}
        aria-label={props.ariaLabel}
        style={style.img}
        ref={imgRef}
      />
    </div>
  );
}
