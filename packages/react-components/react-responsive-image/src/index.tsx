import React, {
  CSSProperties,
  ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from "react";
import useBoundingClientRect, {
  EListener
} from "@wbe/use-bounding-client-rect";
import useIsInViewport from "@wbe/use-is-in-viewport";
import useResponsiveImageData from "@wbe/use-responsive-image-data";

// ----------------------------------------------------------------------------- CONFIG

// component name
const componentName: string = "ResponsiveImage";
//  init debug tool
const debug = require("debug")(`lib:${componentName}`);

// ----------------------------------------------------------------------------- STRUCT

interface IProps {
  // element classes
  classNames?: string[];
  // type of image
  type: EImageType;
  // Array of image object
  data: IImage[];
  // alt text
  alt?: string;
  // children element in Background image
  children?: ReactNode;
  // lazyLoading
  lazy?: boolean;
  // load image at Xpx of top/bottom window
  // ex: -40 allow to preload image when it's top or bottom is to 40px before or after border window
  lazyOffset?: number;
  // Force to display the image whose size is closest to the value provided in px
  forceImageWidth?: number;
  // force a custom vertical ratio : vertical ratio = height / width
  forceVerticalRatio?: number;
  // show placeholder
  placeholder?: boolean;
  // set specific background color
  placeholderColor?: string;
  // change css backgroundPosition
  backgroundPosition?: number[];
  // style first child style
  rootStyle?: CSSProperties;
  // style child element
  imageStyle?: CSSProperties;
}

/**
 * Default props
 */
ResponsiveImage.defaultProps = {
  placeholder: false,
  placeholderColor: "transparent",
  lazy: false,
  lazyOffset: 0
};

/**
 * Image Type
 */
export enum EImageType {
  // <img> HTML tag
  IMAGE_TAG = "imageTag",
  // <div> background image
  BACKGROUND_IMAGE = "backgroundImage"
}

/**
 * Single Image Object properties
 */
export interface IImage {
  url: string;
  width?: number;
  height?: number;
  ratio?: number;
}

// transparent image URL
const transparentImageUrl =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

/**
 *  @name: ResponsiveImage
 *  @description: Display simple Image Tag or div Background Image with options:
 *  - responsive src / url depend of image container size
 *  - lazyloading with preloading before showing
 *  - set aspect ratio background color behind image during lazyloading
 */
function ResponsiveImage(props: IProps) {
  // get root ref
  const rootRef = useRef(null);
  // get root rect
  const rootRect = useBoundingClientRect(
    rootRef,
    EListener.ON_SCROLL_AND_RESIZE
  );

  // --------------------------------------------------------------------------- SELECT IMAGE

  /**
   * Select responsive image
   */
  const responsiveImage = useResponsiveImageData(
    props.data,
    !!props.forceImageWidth
      ? // select force image width props value as width reference
        props.forceImageWidth
      : // else, select component root as width reference
        rootRect && rootRect.width
  );

  // init separatly url of this object
  const [requiredURL, setRequiredURL] = useState<string>(transparentImageUrl);

  /**
   *  Start URL selector
   *  Depend of width reference
   */
  useLayoutEffect(() => {
    // exit if no data is set by props
    if (!props?.data) return;

    debug(
      "useResponsiveImageData hook return image data object",
      responsiveImage
    );

    // set required URL
    setRequiredURL(
      // if lazy is active
      props.lazy
        ? // set transparent image URL
          transparentImageUrl
        : // else, set automaticaly the image url
          responsiveImage?.url
    );
  }, [responsiveImage]);

  // --------------------------------------------------------------------------- LAZY

  // checker si l'image est preloaded ou non
  let [imageIsPreLoaded, setImageIsPreLoaded] = useState<boolean>(false);
  // checker le composant est dans le window
  const isInViewport = useIsInViewport(rootRef, false, props.lazyOffset);

  /**
   * Listen "isInViewPort" state
   * Only about lazy image
   */
  useEffect(() => {
    /**
     * When image is preloaded, pass state to true
     */
    const preloadedHandler = () => {
      setImageIsPreLoaded(true);
    };

    // if image is lazy and in viewport
    if (props.lazy && isInViewport && responsiveImage) {
      // if image is not preload
      if (!imageIsPreLoaded) {
        // preload : Create void image tag
        const $img = document.createElement("img");
        // set src attribute to start loading
        $img.src = responsiveImage.url;
        // show error
        if (!$img) throw new Error("preloadImage lazy // error");
        // The image is not loaded, attach handler
        $img.onload = function() {
          preloadedHandler();
        };
      }
    }
    // else, image isn't visible in viewport
    else {
      setImageIsPreLoaded(false);
    }

    return () => {
      // kill listener
      window.removeEventListener("load", preloadedHandler);
    };
  }, [isInViewport, imageIsPreLoaded, responsiveImage?.url]);

  /**
   * Listen ImageIsPreLoaded state
   * Only about lazy image
   */
  useEffect(() => {
    // if lazy is not activated by props, do not continue.
    if (!props.lazy) return;
    // if image is preloaded
    if (imageIsPreLoaded && responsiveImage) {
      // replace transparent image preloaded image
      setRequiredURL(responsiveImage?.url);
    }
    // if image isn't preloaded
    else {
      // set transparent image again
      setRequiredURL(transparentImageUrl);
    }
  }, [imageIsPreLoaded, responsiveImage]);

  // --------------------------------------------------------------------------- STYLES

  /**
   * Calc vertical Ratio
   * @param pResponsiveImage
   * @param pCustomRatio
   */

  const verticalRatio = useCallback(
    (
      pResponsiveImage: IImage = responsiveImage,
      pCustomRatio: number = props.forceVerticalRatio
    ): number => {
      // check
      if (!pResponsiveImage) return;

      // if fix vertical ratio is set
      if (!!pCustomRatio) {
        return pCustomRatio;
      }
      // else if responsive image as ratio
      else if (!!pResponsiveImage.ratio) {
        return pResponsiveImage.ratio;
      }
      // else if image as dimensions, calc ratio
      else if (!!pResponsiveImage.width && !!pResponsiveImage.height) {
        return pResponsiveImage.height / pResponsiveImage.width;
      }
      // else, there is no rato and no dimension
      else {
        return null;
      }
    },
    [responsiveImage, props.forceVerticalRatio]
  );

  /**
   * Background Color
   * Set color behind image
   * @param pBackgroundColor
   */
  const backgroundColorStyle = useCallback(
    (pBackgroundColor: string = props.placeholderColor): CSSProperties => ({
      backgroundColor: !!pBackgroundColor ? pBackgroundColor : null
    }),
    [props.placeholderColor]
  );

  /**
   * Padding ratio style
   * TODO revoir
   */
  const paddingRatioStyle = useCallback(
    (pRatio: number | null = verticalRatio()): CSSProperties => {
      return {
        // Padding ratio set to wrapper about to show background behind image
        paddingBottom:
          // If a custom ratio exist
          !!pRatio ? `${Math.round(pRatio * 100)}%` : null
      };
    },
    [verticalRatio]
  );

  /**
   * background-image style
   */
  const backgroundImageStyle = useCallback(
    (pRequiredURL: string = requiredURL): CSSProperties => ({
      // return background image
      backgroundImage: !!pRequiredURL ? `url("${pRequiredURL}")` : null
    }),
    [requiredURL]
  );

  /**
   * background-position style
   */
  const backgroundPositionStyle = useCallback(
    (
      pBackgroundPosition: number[] = props.backgroundPosition
    ): CSSProperties => ({
      // return background position
      backgroundPosition: !!pBackgroundPosition
        ? `${pBackgroundPosition[0]}% ${pBackgroundPosition[1]}%`
        : null
    }),
    [props.backgroundPosition]
  );

  // image / cover child style
  const imageElementPosition: CSSProperties = {
    display: "block",
    position: "absolute",
    top: "0",
    bottom: "0",
    left: "0",
    right: "0",
    width: "100%",
    height: "100%"
  };

  // --------------------------------------------------------------------------- PREPARE RENDER

  /**
   * Image DOM render
   */
  const imageTagRender = () => {
    // if not lazy and no placeholder
    if (!props?.lazy && !props?.placeholder) {
      // return a simple image tag
      return (
        <img
          className={classBlock}
          ref={rootRef}
          src={requiredURL}
          alt={props?.alt}
          style={props?.imageStyle}
        />
      );
    }
    // else, if lazy or a placeholder
    else {
      return (
        <div className={classBlock} ref={rootRef} style={props?.rootStyle}>
          <div
            className={`${componentName}_wrapper`}
            style={{
              position: "relative",
              overflow: "hidden",
              ...backgroundColorStyle(),
              ...paddingRatioStyle()
            }}
          >
            <img
              className={`${componentName}_image`}
              src={requiredURL}
              alt={props.alt}
              style={{
                // always object fit cover the image tag
                // in case padding ratio is bigger or smaller than the real ratio
                objectFit: "cover",
                ...imageElementPosition,
                ...props.imageStyle
              }}
            />
          </div>
        </div>
      );
    }
  };

  /**
   * Background Image Render
   */
  const backgroundImageRender = () => {
    // if not lazy and no placeholder
    if (!props?.lazy && !props?.placeholder) {
      return (
        <div
          className={classBlock}
          ref={rootRef}
          children={props?.children}
          style={{
            ...backgroundImageStyle(),
            ...backgroundPositionStyle(),
            ...props?.imageStyle
          }}
        />
      );
    }

    // else, if lazy or a placeholder
    else {
      return (
        <div className={classBlock} ref={rootRef} style={props?.rootStyle}>
          <div
            className={`${componentName}_wrapper`}
            style={{
              position: "relative",
              overflow: "hidden",
              ...backgroundColorStyle(),
              ...paddingRatioStyle()
            }}
          >
            <div
              className={`${componentName}_image`}
              children={props.children}
              style={{
                ...backgroundImageStyle(),
                ...backgroundPositionStyle(),
                ...imageElementPosition,
                ...props?.imageStyle
              }}
            />
          </div>
        </div>
      );
    }
  };

  // Prepare class block
  const classBlock = [
    // component class name
    componentName,
    // image type class
    `${componentName}-${props.type}`,
    // lazy class
    props.lazy
      ? `${componentName}-${imageIsPreLoaded ? "lazyloaded" : "lazyload"}`
      : "",
    // placeholderColor class
    props.placeholderColor ? `${componentName}-placeholderColor` : "",
    // props class
    ...(props?.classNames ? props.classNames : [])
  ]
    .filter(v => v)
    .join(" ");

  // --------------------------------------------------------------------------- RENDER

  // check and exit
  if (!responsiveImage || !responsiveImage?.url || !requiredURL) {
    return null;
  }
  // if classic image DOM
  else if (props.type === EImageType.IMAGE_TAG) {
    return imageTagRender();
  }

  // if Background image on div
  else if (props.type === EImageType.BACKGROUND_IMAGE) {
    return backgroundImageRender();
  }
}

// ----------------------------------------------------------------------------- HOOK

// final export
export { ResponsiveImage as default };
