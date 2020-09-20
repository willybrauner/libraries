import { useEffect, useState } from "react";

// duplicate of IImage from react-responsive-image
interface IImage {
  url: string;
  width?: number;
  height?: number;
}

/**
 * useResponsiveImageData
 * Get responsive image depend of width container reference
 * @param {IImage[]} pImages
 * @param {number} pWidthContainer
 */
function useResponsiveImageData(
  pImages: IImage[],
  pWidthContainer: number = window?.innerWidth
) {
  // get image data object depend of pWidth
  const getImageDataObject = (
    pImages: IImage[],
    pWidthContainer: number
  ): IImage => {
    // check and exit if no images
    if (!pImages || pImages?.length < 1) return;

    // return available image widths in array, depend of pWidthContainer
    const imageWidths = pImages
      .map((el: IImage): number => el?.width)
      // sort smaller to larger
      .sort((a: number, b: number) => a - b)
      // return only images who got biggest width than pWidthContainer
      .filter((el: any) => el > pWidthContainer);

    // keep the biggest image object of array
    const biggestImage = pImages.reduce(
      (a: any, b: any) => ((a.width || 0) > b.width ? a : b),
      pImages[0]
    );

    // prepare filtered image array we gonna return
    const filtered = pImages
      .map(
        (pImage: IImage): IImage => {
          // if current pImage width is smallest than the smallest imagesWidth array, return it
          if (pImage.width === imageWidths[0]) return pImage;

          // if the biggest image is smallest than the smallest image of array,
          // return this biggest image
          if (biggestImage.width <= pWidthContainer) return biggestImage;
        }
      )
      // filter the array
      .filter((val: IImage) => val);

    // return the appropriate image object
    return filtered.length > 0 ? filtered[0] : null;
  };

  const [responsiveImage, setResponsiveImage] = useState<IImage>(
    getImageDataObject(pImages, pWidthContainer)
  );

  useEffect(() => {
    // set this value in local state
    setResponsiveImage(getImageDataObject(pImages, pWidthContainer));
  }, [pWidthContainer]);

  return responsiveImage;
}

export { useResponsiveImageData };
