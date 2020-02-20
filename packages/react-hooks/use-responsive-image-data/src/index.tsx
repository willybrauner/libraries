import { useLayoutEffect } from "react";
import { useState } from "react";
import useWindowSize from "@wbe/use-window-size";

/**
 * Single Image Object properties
 * TODO duplicate of IImage from react-responsive-image
 */
interface IImage {
  url: string;
  width?: number;
  height?: number;
  ratio?: number;
}

/**
 * useResponsiveImageData
 */
/**
 * useResponsiveImageData
 * Get responsive image depend of window Width / parent width
 * @param pImages
 * @param pWidth
 */
function useResponsiveImageData(pImages: IImage[], pWidth?: number) {
  // get current window size use as fallback
  const windowSize = useWindowSize();

  // get image data object depend of pWidth
  const getImageDataObject = (pImages: IImage[], pWidth: number): IImage => {
    // check and exit if no images
    if (!pImages) return;

    // return available image width in array, depend of pWidth
    const imagesWidth =
      // get each el width
      pImages
        .map((el: IImage) => el?.width)
        // sort smaller to larger
        .sort((a: number, b: number) => a - b)
        // return only images who got biggest width than pWidth
        .filter((el: any) => el > pWidth);

    // keep the biggest image object of array
    const biggestImage = pImages.reduce(
      (a: any, b: any) => ((a.width || 0) > b.width ? a : b),
      pImages[0]
    );

    // prepare filtered image array we gonna return
    const filtered = pImages
      .map((el: any) => {
        // if image width is smallest than the images array
        // return it
        if (el.width === imagesWidth[0]) return el;

        // if the biggest image is smallest than the smallest image of array,
        // return this biggest image
        if (biggestImage.width <= pWidth) return biggestImage;
      })
      // filter the array
      .filter((val: any) => val);

    // return the appropriate image object
    return filtered.length > 0 ? filtered[0] : null;
  };

  const [responsiveImage, setResponsiveImage] = useState<IImage>(
    getImageDataObject(pImages, pWidth)
  );

  useLayoutEffect(() => {
    // select a width value as reference
    // pForceWidth is a static value
    // windowSize.width is a dynamic value
    const selectedWidth = pWidth || windowSize?.width;

    // set this value in local state
    setResponsiveImage(getImageDataObject(pImages, selectedWidth));
  }, [pWidth, windowSize]);

  return responsiveImage;
}

export { useResponsiveImageData as default };
