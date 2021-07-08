import {
  getImageDataObject,
  parseSrcsetToArray,
  TResponsiveBackgroundImage,
} from "./helpers";
import { TLazy } from "./types";

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
  const lazyState: { [x: string]: TLazy } = {
    LAZY_LOAD: "lazyload",
    LAZY_LOADING: "lazyloading",
    LAZY_LOADED: "lazyloaded",
  };
  const dataSrcsetAttr = "data-background-srcset";
  let observer: IntersectionObserver;

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

    const elsToObserve =
      $element || srcset
        ? $element
          ? [$element]
          : null
        : _getElementsWithDataAttr();

    elsToObserve?.forEach((el) => observer.observe(el));
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
      // image size reference
      const imageSizeReference: number =
        $current.getBoundingClientRect()?.width || window.innerWidth;
      // get url from DOM attr
      const url: string = srcset || $current.getAttribute(dataSrcsetAttr);
      // selected image object
      const selectedImageObject: TResponsiveBackgroundImage =
        getImageDataObject(
          parseSrcsetToArray(url),
          imageSizeReference,
          bigQuality
        );
      if (!selectedImageObject?.url) return;
      // switch lazy state
      _switchLazyState($current, lazyState.LAZY_LOADING);
      // start preload and wait
      await _preloadImage($current, selectedImageObject.url);
      // switch lazy state
      _switchLazyState($current, lazyState.LAZY_LOADED);
      // then replace url
      _replaceBackgroundImageUrl($current, selectedImageObject);
      // disconnect
      observer.unobserve($current);
    });
  };

  /**
   * Replace background image URL depend of element size
   * @param $element
   * @param selectedImageObject
   */
  const _replaceBackgroundImageUrl = (
    $element: HTMLElement,
    selectedImageObject: TResponsiveBackgroundImage
  ): void => {
    $element.style.backgroundImage = [
      `url('${selectedImageObject.url}')`,
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
