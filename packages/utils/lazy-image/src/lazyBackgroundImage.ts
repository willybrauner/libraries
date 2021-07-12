import {
  getBiggestImageDataOject,
  getImageDataObject,
  parseSrcsetToArray,
  TResponsiveBackgroundImage,
} from "./helpers";
import { TLazy } from "./types";
import { lazyState } from "./common";

/**
 * @name lazyBackgroundImage
 * @desc Choose the appropriate image URL from srcset attr and
 * preload image before add its url in background-image style attr.
 *
 * @example1 with multiple elements
 *
 * - Add "data-background-srcset" attr on div:
 *    <div data-background-srcset="image-1.jpg 640w, image-2.jpg 1240w" />
 *
 *    const bg = lazyBackgroundImage();
 *
 * - start
 *    bg.start();
 *
 * - update if new backgroundImage div with attr is inject in DOM
 *    bg.update();
 *
 * - stop to track and listen backgroundImage
 *    bg.stop();
 *
 *
 * @example2 with specific element
 *
 *  * - Add div:
 *    <div class="my-bg-img" />
 *
 *     const bg = lazyBackgroundImage({
 *       $element: document.querySelector('.my-bg-img')
 *       srcset: "image-1.jpg 640w, image-2.jpg 1240w"
 *     });
 *
 *  * - start
 *    bg.start();
 *
 *    ...
 *
 */

export function lazyBackgroundImage({
  $element,
  srcset,
  additonalUrl,
  $root = document.body,
  lazyCallback = () => {},
  observerOptions = {},
  bigQuality = false,
}: {
  $element?: HTMLElement;
  srcset?: string;
  additonalUrl?: string;
  $root?: HTMLElement;
  lazyCallback?: (state) => void;
  observerOptions?: IntersectionObserverInit;
  bigQuality?: boolean;
} = {}) {
  const dataSrcsetAttr = "data-background-srcset";
  const dataIdAttr = "data-background-id";
  let observer: IntersectionObserver;
  const storeImageList = [];
  let ID = 0;

  /**
   * Start
   */
  const start = (): void => {
    _observe();
    window.addEventListener("resize", _handlResize);
  };

  /**
   * Update
   */
  const update = (): void => {
    stop();
    start();
  };

  /**
   * Stop
   */
  const stop = (): void => {
    observer.disconnect();
    window.removeEventListener("resize", _handlResize);
  };

  /**
   * handle resize
   */
  const _handlResize = (): void => {
    update();
  };

  /**
   * Get elements with data-background-srcset attr
   */
  const _getElementsWithDataAttr = (): HTMLElement[] => {
    const $els = $root.querySelectorAll(
      `[${dataSrcsetAttr}]:not(img):not(figure)`
    );
    // @ts-ignore
    return $els?.length ? [...$els] : null;
  };

  /**
   * Start observer via intersection observer
   */
  const _observe = (): void => {
    if (!("IntersectionObserver" in window)) return;
    observer = new IntersectionObserver(
      _observeOnChangeCallBack,
      observerOptions
    );

    // select dom element to observe
    // depend of witch kind of element
    // prettier-ignore
    const elsToObserve = ($element || srcset)
        ? $element ? [$element] : null
        : _getElementsWithDataAttr();

    elsToObserve?.forEach((el: HTMLElement) => {
      // get current image informations
      const imageInfos = _getImageInformations(el);
      // get store image object
      const storeImageObject = storeImageList?.[el.getAttribute(dataIdAttr)];

      if (
        // if store image doest exist
        !storeImageObject ||
        // or store image with is smaller than current image (dom) width
        // and image (dom) width is smaller than the biggest width available
        (storeImageObject?.width < imageInfos.width &&
          imageInfos.width <= imageInfos.biggestImageDataOject.width)
      ) {
        observer.observe(el);
      }
    });
  };

  /**
   * observer callback
   * @param entries
   */
  const _observeOnChangeCallBack = (
    entries: IntersectionObserverEntry[]
  ): void => {
    entries?.forEach(async (el) => {
      const $current = el.target as HTMLElement;
      // switch lazy callback
      _switchLazyState($current, lazyState.LAZY_LOAD);

      if (!el.isIntersecting) return;

      // get current image information
      const image = _getImageInformations($current);

      // get data id on DOM element
      const dataId = $current.getAttribute(dataIdAttr);

      // if didn't exist, set in on DOM element and store it
      if (!dataId) {
        $current.setAttribute(dataIdAttr, `${ID}`);
        storeImageList[ID] = image?.imageDataObject;
        ID++;
        // else, store it only
      } else {
        storeImageList[dataId] = image?.imageDataObject;
      }

      // check if data object url exist
      if (!image?.imageDataObject?.url) return;

      // switch lazy state
      _switchLazyState($current, lazyState.LAZY_LOADING);
      // start preload and wait
      await _preloadImage($current, image.imageDataObject.url);
      // switch lazy state
      _switchLazyState($current, lazyState.LAZY_LOADED);
      // then replace url
      _replaceBackgroundImageUrl($current, image.imageDataObject);
      // disconnect
      observer.unobserve($current);
    });
  };

  /**
   * Get selected image information
   * @param $el
   */
  const _getImageInformations = (
    $el: HTMLElement
  ): {
    width: number;
    dataSrcset: string;
    imageDataObject: TResponsiveBackgroundImage;
    biggestImageDataOject: TResponsiveBackgroundImage;
  } => {
    // get image width reference
    const width = $el.getBoundingClientRect()?.width || window.innerWidth;
    // get image URL
    const dataSrcset = srcset || $el.getAttribute(dataSrcsetAttr);
    // extract image array from from srcset
    const imagesArray = parseSrcsetToArray(dataSrcset);
    // get image object depend of current width and quality size
    const imageDataObject = getImageDataObject(imagesArray, width, bigQuality);
    // ge biggest image object from image data array
    const biggestImageDataOject = getBiggestImageDataOject(imagesArray);

    return {
      width,
      dataSrcset,
      imageDataObject,
      biggestImageDataOject,
    };
  };

  /**
   * Replace background image URL depend of element size
   * @param $element
   * @param imageDataObject
   */
  const _replaceBackgroundImageUrl = (
    $element: HTMLElement,
    imageDataObject: TResponsiveBackgroundImage
  ): void => {
    $element.style.backgroundImage = [
      `url('${imageDataObject.url}')`,
      additonalUrl && `, url('${additonalUrl}')`,
    ]
      .filter((v) => v)
      .join("");
  };

  /**
   * Preload image url
   * Set lazy class
   * @param $el
   * @param url
   */
  const _preloadImage = ($el: HTMLElement, url: string): Promise<void> =>
    new Promise((resolve) => {
      // create void image tag for each url
      const $img = document.createElement("img");
      // add url to src attr in order to start loading
      $img.src = url;
      $img.onload = () => {
        resolve();
      };
    });

  /**
   * Switch lazyState and execute lazyCallback
   * @param $el
   * @param state
   */
  const _switchLazyState = ($el, state: TLazy): void => {
    // remove all lazy class
    Object.values(lazyState).forEach((el) => {
      $el.classList.remove(el);
    });
    // add param lazyclass
    $el.classList.add(state);
    // execute callback
    lazyCallback(state);
  };

  return {
    start,
    update,
    stop,
  };
}
