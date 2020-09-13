require("intersection-observer");
import React, {
  CSSProperties,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from "react";
import useBoundingClientRect, {
  EListener
} from "@wbe/use-bounding-client-rect";
import useResponsiveImageData from "@wbe/use-responsive-image-data";
import Observer from "@researchgate/react-intersection-observer";

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
  // FIXME Do not work rightnow with intersection observer - need to configure it
  lazyOffset?: number;
  // execute a function when lazy image is loaded
  lazyCallBack?: () => void;
  // Force to display the image whose size is closest to the value provided in px
  forceImageWidth?: number;
  // force a custom vertical ratio : vertical ratio = height / width
  forceVerticalRatio?: number;
  // show placeholder
  placeholder?: boolean;
  // set specific background color
  placeholderColor?: string;
  // style first child style
  rootStyle?: CSSProperties;
  // style child element
  imageStyle?: CSSProperties;
  // aria description of element
  ariaLabel?: string | null;
  // role of element
  role?: string;
}

/**
 * Default props
 */
ResponsiveImage.defaultProps = {
  placeholder: false,
  placeholderColor: "transparent",
  lazy: false,
  lazyOffset: 0,
  ariaLabel: null,
  role: "img"
};

/**
 * Image Type
 */
export enum EImageType {
  // <img> HTML tag
  TAG_IMAGE = "tagImage",
  // <div> background-image
  BACKGROUND_IMAGE = "backgroundImage"
}

/**
 * Single Image Object properties
 */
export interface IImage {
  url: string;
  width?: number;
  height?: number;
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
  const rootRect = useBoundingClientRect(rootRef, EListener.ON_RESIZE);

  // --------------------------------------------------------------------------- SELECT IMAGE

  /**
   * Select responsive image
   */
  const responsiveImage = useResponsiveImageData(
    props?.data,
    // select force image width props value as width reference
    // else, select component root as width reference
    props?.forceImageWidth || rootRect?.width
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
    // set required URL
    setRequiredURL(
      // if lazy is active
      props.lazy
        ? // set transparent image URL
          transparentImageUrl
        : // else, set automaticaly the image URL
          responsiveImage?.url
    );
  }, [responsiveImage]);

  // --------------------------------------------------------------------------- LAZY

  // checker si l'image est preloaded ou non
  let [imageIsPreLoaded, setImageIsPreLoaded] = useState<boolean>(false);

  // checker le composant est dans le window
  const [isInViewport, setIsInViewPort] = useState<boolean>(false);

  /**
   * Il element is in viewport, set in state
   * @param event
   * @param unobserve
   */
  const handleIsInViewport = (event: any, unobserve: any): void => {
    if (event.isIntersecting) {
      setIsInViewPort(true);
      unobserve();
    }
  };

  /**
   * Preload image
   * Only about lazy image
   */
  useEffect(() => {
    /**
     * When image is preloaded, pass state to true
     */
    const preloadedHandler = () => {
      setImageIsPreLoaded(true);
      props?.lazyCallBack?.();
    };

    // if image is lazy and in viewport
    if (props.lazy && isInViewport && responsiveImage) {
      // if image is not preload
      if (!imageIsPreLoaded) {
        // preload : Create void image tag
        const $img = document.createElement("img");
        // set src attribute to start loading
        $img.src = responsiveImage?.url;
        // show error
        if (!$img) {
          throw new Error("PreloadImage $img element doesn't exist.");
        }
        // The image is not loaded, attach handler
        $img.addEventListener("load", preloadedHandler);
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
  }, [isInViewport, imageIsPreLoaded, responsiveImage]);

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

  const verticalRatio = (
    pResponsiveImage: IImage = responsiveImage,
    pCustomRatio: number = props.forceVerticalRatio
  ): number => {
    // check
    if (!pResponsiveImage) return;

    // if fix vertical ratio is set
    if (pCustomRatio) {
      return pCustomRatio;
    }
    // else if image as dimensions, calc ratio
    else if (pResponsiveImage?.width && pResponsiveImage?.height) {
      return pResponsiveImage.height / pResponsiveImage.width;
    }
    // else, there is no rato and no dimension
    else {
      return null;
    }
  };

  /**
   * Background Color
   * Set color behind image
   * @param pBackgroundColor
   */
  const backgroundColorStyle = (
    pBackgroundColor: string = props?.placeholderColor
  ): CSSProperties => ({
    backgroundColor: pBackgroundColor ? pBackgroundColor : null
  });

  /**
   * Padding ratio style
   * TODO revoir
   */
  const paddingRatioStyle = (
    pRatio: number | null = verticalRatio()
  ): CSSProperties => {
    return {
      // Padding ratio set to wrapper about to show background behind image
      paddingBottom:
        // If a custom ratio exist
        pRatio ? `${(pRatio * 100).toFixed(3)}%` : null
    };
  };

  /**
   * background-image style
   */
  const backgroundImageStyle = (
    pRequiredURL: string = requiredURL
  ): CSSProperties => ({
    // return background image
    backgroundImage: !!pRequiredURL ? `url("${pRequiredURL}")` : null
  });

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
          aria-label={props?.ariaLabel}
          role={props.role}
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
              role={props.role}
              aria-label={props?.ariaLabel}
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
          aria-label={props?.ariaLabel}
          role={props.role}
          style={{
            ...backgroundImageStyle(),
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
              aria-label={props?.ariaLabel}
              role={props.role}
              style={{
                ...backgroundImageStyle(),
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
    props?.lazy &&
      `${componentName}-${imageIsPreLoaded ? "lazyloaded" : "lazyload"}`,

    // placeholderColor class
    props?.placeholder && `${componentName}-placeholder`,
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
  else if (props.type === EImageType.TAG_IMAGE) {
    return (
      <Observer onChange={handleIsInViewport}>{imageTagRender()}</Observer>
    );
  }

  // if Background image on div
  else if (props.type === EImageType.BACKGROUND_IMAGE) {
    return (
      <Observer onChange={handleIsInViewport}>
        {backgroundImageRender()}
      </Observer>
    );
  }
}

export { ResponsiveImage as default };
