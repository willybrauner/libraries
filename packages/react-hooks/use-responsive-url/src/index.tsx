import { EImageSize, IImage } from "@wbe/react-responsive-image/src";
import { useLayoutEffect, useState } from "react";
import useWindowSize from "@wbe/use-window-size";
const debug = require("debug")("lib:use-responsive-url");

/**
 * useResponsiveUrl
 */
function useResponsiveUrl(
  pImages: IImage[],
  pForceWidth?: number | EImageSize
) {
  console.log("hello responsive url");

  // get current window size
  const windowSize = useWindowSize();

  /**
   * Get responsive image depend of window Width / parent width
   * Depend of Witch pWidth is passed to the function
   * @param pImages
   * @param pWidth
   */
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
    const selectedWidth = pForceWidth || windowSize?.width;

    debug("selected width", selectedWidth);

    setResponsiveImage(getResponsiveImage(pImages, selectedWidth));
  }, [pForceWidth, windowSize]);

  return responsiveImage;
}

export { useResponsiveUrl as default };
