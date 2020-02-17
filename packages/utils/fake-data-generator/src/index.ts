import { EImageSize, IImage } from "@wbe/react-responsive-image/src";
// component name
const name: string = "fake-data-generator";
//  init debug tool
const debug = require("debug")(`lib:${name}`);

/**
 * @name FakeDataGenerator
 * @description Generate fake data to simulate content
 */
class FakeDataGenerator {
  // --------------------------------------------------------------------------- SINGLETON

  // Singleton
  protected static __instance: FakeDataGenerator;

  /**
   * Get FakeDataGenerator singleton instance.
   */
  static get instance() {
    // Create instance
    if (FakeDataGenerator.__instance == null) {
      FakeDataGenerator.__instance = new FakeDataGenerator();
    }

    // Return singleton instance
    return FakeDataGenerator.__instance;
  }

  // --------------------------------------------------------------------------- LOCAL

  // API image
  private imageAPI = "https://picsum.photos";

  // Video API TODO

  // Text API TODO

  /**
   * Get random value
   * @param min
   * @param max
   */
  static randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  static get randomId() {
    return FakeDataGenerator.randomIntFromInterval(1, 200);
  }

  // --------------------------------------------------------------------------- PUBLIC API

  /**
   * @name getResponsiveImageData
   * @param pRatio
   * @param pImageAPI
   */
  public getResponsiveImageData(
    pRatio: number = 4 / 3,
    pImageAPI = this.imageAPI
  ): IImage[] {
    // get breakpoint sizes
    const imageBreakPoints = [
      EImageSize.SMALL,
      EImageSize.MEDIUM,
      EImageSize.LARGE,
      EImageSize.XLARGE
    ];

    //  build array
    const fakeImageArray: IImage[] = imageBreakPoints.map(el => {
      // get image size depend of el
      const imageSize = {
        width: el,
        height: el / pRatio
      };

      // build url
      const buildURL = [
        // API
        pImageAPI,
        "/id/",
        FakeDataGenerator.randomId,
        // size
        "/",
        imageSize.width,
        "/",
        imageSize.height
        // random id
        //`?random=${randomId}`
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

export { FakeDataGenerator as default };
