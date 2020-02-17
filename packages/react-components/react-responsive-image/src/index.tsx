import React, {
  CSSProperties,
  ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from "react";
import useBoundingClientRect, {
  EListener
} from "@wbe/use-bounding-client-rect";
import useIsInViewport from "@wbe/use-is-in-viewport";
import useWindowSize from "../../../react-hooks/use-window-size/dist";

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
  // Array of image object [{}, {}, ...]
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
  // force image version with specific width
  forceImageWidth?: EImageSize;
  // force a custom vertical ratio : vertical ratio = height / width
  forceVerticalRatio?: number;
  // show placeholder
  placeholder?: boolean;
  // set specific background color
  placeholderColor?: string;
  // change css backgroundPosition
  backgroundPosition?: number[];
  // style first child style
  containerStyle?: CSSProperties;
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

/**
 * Responsive break sizes
 * FIXME these values need to be inject via Root app Config
 */
export enum EImageSize {
  SMALL = 640,
  MEDIUM = 1024,
  LARGE = 1640,
  XLARGE = 1900
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
      ? // select fix image
        props.forceImageWidth
      : // else, select component width
        rootRect && rootRect.width
  );

  // init separatly url of this object
  const [requiredURL, setRequiredURL] = useState<string>(transparentImageUrl);

  /**
   *  Start URL selector
   *  Depend of root width
   */
  useLayoutEffect(() => {
    // exit if no data is set by props
    if (props.data == null) return;
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
        <div className={classBlock} ref={rootRef} style={props?.containerStyle}>
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
        <div className={classBlock} ref={rootRef} style={props.containerStyle}>
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

/**
 * useResponsiveImageData
 * Get responsive image depend of window Width / parent width
 * Depend of Witch pWidth is passed to the function
 * @param pImages
 * @param pForceWidth
 */
function useResponsiveImageData(
  pImages: IImage[],
  pForceWidth?: number | EImageSize
) {
  // get current window size
  const windowSize = useWindowSize();

  //
  const getResponsiveImage = (
    pImages: IImage[],
    pWidth: number | EImageSize
  ): IImage => {
    // si pas d'image, ne pas continuer
    if (pImages == null) return;

    // retourner les largeurs d'image dispo en fonction de la taille du window
    const imagesWidth =
      // sortir la largeur de chaque image
      pImages
        .map((el: any) => el.width)
        // les trier de la plus petite à la plus grande
        .sort((a: any, b: any) => a - b)
        // retourner uniquement les images qui ont une largeur plus grandre
        // que la largeur fr pWidth
        .filter((el: any) => el > pWidth);

    // Stoquer la plus grande image du tableau qui servira de fallback
    const biggestImage = pImages.reduce(
      (a: any, b: any) => ((a.width || 0) > b.width ? a : b),
      pImages[0]
    );

    // retourner un objet image :
    const filtered = pImages
      .map((el: any) => {
        // si la taille est egale à largeur d'image la plus petite du tableau,
        // retouner l'élément
        if (el.width === imagesWidth[0]) return el;
        // si la plus grande image est quand meme plus petite que
        // la taille du tableau, retourner cette plus grande image
        if (biggestImage.width <= pWidth) return biggestImage;
      })
      // filter le tableau et selectionner le premier objet du talbeau
      .filter((val: any) => val);

    // retourner le résultat
    return filtered.length > 0 ? filtered[0] : null;
  };

  const [responsiveImage, setResponsiveImage] = useState<IImage>(
    getResponsiveImage(pImages, pForceWidth)
  );

  useLayoutEffect(() => {
    // select a width value as reference
    // pForceWidth is a static value
    // windowSize.width is a dynamic value
    const selectedWidth = pForceWidth || windowSize?.width;

    // set this value in local state
    setResponsiveImage(getResponsiveImage(pImages, selectedWidth));
  }, [pForceWidth, windowSize]);

  return responsiveImage;
}

// final export
export { ResponsiveImage as default, useResponsiveImageData };
