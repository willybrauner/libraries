import {
  getImageDataObject,
  parseSrcsetToArray,
  TResponsiveBackgroundImage,
} from "./helpers";

/**
 * @name lazyBackgroundImage
 * @desc Choose the appropriate image URL from srcset attr and
 * preload image before add its url in background-image style attr.
 *
 * @example-1 with multiple elements
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
 * @example-2 with specific element
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
  bigQuality = false,
  $root = document.body,
}: {
  $element?: HTMLElement;
  srcset?: string;
  additonalUrl?: string;
  bigQuality?: boolean;
  $root?: HTMLElement;
} = {}) {
  const dataSrcsetAttr = "data-background-srcset";
  const lazyloadClass = "lazyload";
  const lazyloadingClass = "lazyloading";
  const lazyloadedClass = "lazyloaded";
  let observer: IntersectionObserver;

  /**
   * Start
   */
  const start = () => {
    _observe();
    window.addEventListener("resize", _handlResize);
  };

  /**
   * Update
   */
  const update = () => {
    stop();
    start();
  };

  /**
   * Stop
   */
  const stop = () => {
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
    observer = new IntersectionObserver(_observeOnChangeCallBack);
    const elsToObserve = $element ? [$element] : _getElementsWithDataAttr();
    console.log("elsToObserve", elsToObserve);
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
      if (!el.isIntersecting) return;
      // get current element
      const $current = el.target as HTMLElement;
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
      // start preload and wait
      await _preloadImage($current, selectedImageObject.url);
      // then replace
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
      $el.classList.remove(lazyloadedClass);
      $el.classList.remove(lazyloadClass);
      $el.classList.add(lazyloadingClass);
      // create void image tag for each url
      const $img = document.createElement("img");
      // add url to src attr in order to start loading
      $img.src = url;
      $img.onload = () => {
        $el.classList.remove(lazyloadingClass);
        $el.classList.add(lazyloadedClass);
        resolve();
      };
    });

  return {
    start,
    update,
    stop,
  };
}
