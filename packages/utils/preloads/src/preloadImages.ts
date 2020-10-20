const name = "preloadImages";
const debug = require("debug")(`lib:${name}`);

/**
 * Preload images
 * @description Allow to preload list of images
 * @param urls: List of image urls to preload
 */
function preloadImages(urls: string[]): Promise<HTMLImageElement[]> {
  const outputImages: HTMLImageElement[] = [];
  let counter: number = 0;

  return new Promise((resolve) => {
    for (let i in urls) {
      // create void image tag for each url
      let $img = document.createElement("img");
      // add url to src attr in order to start loading
      $img.src = urls[i];
      // keep image in array
      outputImages.push($img);

      $img.onload = () => {
        // remove element
        $img.remove();
        // count loaded image, If all are loaded, resolve promise
        if (++counter === urls.length) resolve(outputImages);
      };
    }
  });
}

export { preloadImages };
