import { IImage } from "@wbe/react-responsive-image";
// component name
const name: string = "fake-data-utils";
//  init debug tool
const debug = require("debug")(`lib:${name}`);

/**
 * Video Type
 */
enum EVideoType {
  YOUTUBE,
  VIMEO,
  NATIVE
}

/**
 * @name FakeDataUtils
 * @description Generate fake data to simulate content
 */
class FakeDataUtils {
  // --------------------------------------------------------------------------- SINGLETON

  // Singleton
  protected static __instance: FakeDataUtils;

  /**
   * Get FakeDataUtils singleton instance.
   */
  static get instance() {
    // Create instance
    if (FakeDataUtils.__instance == null) {
      FakeDataUtils.__instance = new FakeDataUtils();
    }

    // Return singleton instance
    return FakeDataUtils.__instance;
  }

  // --------------------------------------------------------------------------- LOCAL

  // API image
  private imageApi = "https://picsum.photos";

  // Video API TODO
  private videoApi = "";

  // Text API TODO

  // --------------------------------------------------------------------------- UTILS

  /**
   * Get random value between min and max
   * @param pMin
   * @param pMax
   */
  static randomIntFromInterval(pMin: number, pMax: number) {
    return Math.floor(Math.random() * (pMax - pMin + 1) + pMin);
  }

  // --------------------------------------------------------------------------- PUBLIC API

  /**
   *
   * @param pVideoType
   */
  // public getVideoUrl(pVideoType: EVideoType): string {
  //   if (EVideoType === EVideoType.YOUTUBE) {
  //
  //   }
  //   if (EVideoType === EVideoType.VIMEO) {
  //   }
  //   if (EVideoType === EVideoType.NATIVE) {
  //   }
  // }

  /**
   * @name getResponsiveImageData
   * @param pRatio
   */
  public getResponsiveImageData(pRatio: number = 4 / 3): IImage[] {
    // get breakpoint sizes
    const imageBreakPoints = [640, 1024, 1640, 1900];

    //  build array
    const fakeImageArray: IImage[] = imageBreakPoints.map(el => {
      // get image size depend of el
      const imageSize = {
        width: el,
        height: Math.round(el / pRatio)
      };

      // build url
      const buildURL = [
        // API
        this.imageApi,
        // random id
        "/id/",
        FakeDataUtils.randomIntFromInterval(1, 200),
        // size
        "/",
        imageSize.width,
        "/",
        imageSize.height
      ].join("");

      // return build URL
      return {
        url: buildURL,
        width: imageSize.width,
        height: imageSize.height
      };
    });

    debug("fakeImageArray", fakeImageArray);

    return fakeImageArray;
  }
}

export { FakeDataUtils as default };
