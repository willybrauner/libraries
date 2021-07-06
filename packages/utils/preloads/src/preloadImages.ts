const name = "preloadImages";
const debug = require("debug")(`lib:${name}`);

/**
 * Preload image
 * @param url
 */
export function preloadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    // create void image tag for each url
    let $img = document.createElement("img");
    // add url to src attr in order to start loading
    $img.src = url;
    // count loaded image, If all are loaded, resolve promise
    $img.onload = () => {
      resolve($img);
    };
  });
}

/**
 * Preload images
 * @description Allow to preload list of images
 * @param urls: List of image urls to preload
 */
export function preloadImages(urls: string[]): Promise<HTMLImageElement[]> {
  return new Promise(async (resolve) => {
    // get all preload image promises
    const promises: Promise<HTMLImageElement>[] = urls.map((url) =>
      preloadImage(url)
    );
    // waiting foreach promises are resolved
    const outputImages = await Promise.all(promises);
    // and return html image elements
    resolve(outputImages);
  });
}
