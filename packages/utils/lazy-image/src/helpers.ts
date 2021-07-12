const descriptorNames = { w: "width", x: "density" } as const;

type TDescriptor = keyof typeof descriptorNames;
export type TDescriptorName = typeof descriptorNames[TDescriptor];

// an srcset definition consists of responsive background image
export type TResponsiveBackgroundImage = { url: string } & {
  [K in TDescriptorName]?: number;
};

/**
 * Parses an srcset string and returns an array of objects
 * @param {string} srcset
 */
export function parseSrcsetToArray(
  srcset: string
): TResponsiveBackgroundImage[] {
  // a regex for matching srcset segments
  const SRCSEG = /(\S*[^,\s])(\s+([\d.]+)(x|w))?/g;

  const matchAll = (str: string, regex: RegExp): RegExpExecArray[] => {
    let match = null,
      result = [];
    while ((match = regex.exec(str)) !== null) result.push(match);
    return result;
  };

  return matchAll(srcset, SRCSEG).map(
    ([, url, , value, modifier]): TResponsiveBackgroundImage => {
      let modKey = descriptorNames[modifier];
      // descriptor is optional
      return modKey ? { url, [modKey]: parseFloat(value) } : { url };
    }
  );
}

/**
 * Get Biggest image object from data list
 * ex:
 *  [
 *    { url: "/url", width: 200 },
 *    { url: "/url", width: 500 },
 *    { url: "/url", width: 700 },
 *  ]
 *
 *  returns  { url: "/url", width: 700 }
 *
 * @param images
 */
export const getBiggestImageDataOject = (
  images: TResponsiveBackgroundImage[]
) =>
  images.reduce(
    (a: any, b: any) => ((a.width || 0) > b.width ? a : b),
    images[0]
  );

/**
 * getImageDataObject
 *
 * @desc select appropriate data image
 *
 *  * ex:
 *  [
 *    { url: "/url", width: 200 },
 *    { url: "/url", width: 500 },
 *    { url: "/url", width: 700 },
 *  ]
 *
 *  if window width = 300
 *  returns  { url: "/url", width: 500 }
 *
 * @param images: images array
 * @param width: Width reference
 * @param bigQuality: if true, allow to selected the second biggest image (when possible) up to the width container reference
 */
export function getImageDataObject(
  images: TResponsiveBackgroundImage[],
  width: number,
  bigQuality: boolean = false
): TResponsiveBackgroundImage {
  // check and exit if no images
  if (!images) return;
  // return available image width in array, depend of pWidth
  const imagesWidth =
    // get each el width
    images
      .map((el: TResponsiveBackgroundImage) => el?.width)
      // sort smaller to larger
      .sort((a: number, b: number) => a - b)
      // return only images who got biggest width than pWidth
      .filter((el: any) => el > width);

  // keep the biggest image object of array
  const biggestImage = getBiggestImageDataOject(images);

  // prepare filtered image array we gonna return
  const filtered = images
    .map((el: any) => {
      // if image width is smallest than the images array
      // return it
      if (
        el.width === imagesWidth[bigQuality && imagesWidth.length > 1 ? 1 : 0]
      )
        return el;
      // if the biggest image is smallest than the smallest image of array,
      // return this biggest image
      if (biggestImage.width <= width) return biggestImage;
    })
    // filter the array
    .filter((val: any) => val);
  // return the appropriate image object
  return filtered.length > 0 ? filtered[0] : null;
}
