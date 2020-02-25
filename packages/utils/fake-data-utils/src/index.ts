import { IImage } from "@wbe/react-responsive-image";
// component name
const name: string = "fake-data-utils";
//  init debug tool
const debug = require("debug")(`lib:${name}`);

/**
 * Video Type
 */
export enum EVideoType {
  NATIVE,
  YOUTUBE,
  VIMEO
}

/**
 * Text Type
 */
export enum ETextType {
  BRUT = "text",
  HTML = "HTML"
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

  // --------------------------------------------------------------------------- DATAS

  // image API
  private _imageApi = "https://picsum.photos";

  // Collection of NPR tiny desk concert youtube video Ids
  private _youtubeIds = [
    "gxlA6JB3Z6w",
    "ferZnZ0_rSM",
    "qYPQ0EUmbTs",
    "mVJjmyFfuts",
    "SiDBiIsFiqU",
    "vfzu33BfRHE",
    "QKzobTCIRDw",
    "yXrlhebkpIQ",
    "YJ-efUsAhc8",
    "weL8HTY1NJU",
    "peYcNm3JTe8",
    "XyW5Zz0w1zg",
    "vPBirt1YhuM",
    "GP3jS_gFs-g",
    "oGTVoX7AaRc"
  ];

  // Collection of skate and snowboad vimeo video Ids
  private _vimeoIds = [
    "142320599",
    "17363035",
    "36168588",
    "208432684",
    "88665448",
    "2497587",
    "32773959",
    "29405767",
    "217388307",
    "25915873",
    "153347836",
    "63741693",
    "145049057",
    "16247888"
  ];

  // Collection of native video urls
  private _nativeVideosUrl = [
    "https://cher-ami.tv/user/pages/02.works/12.le-bon-marche/SCENE_1.mp4"
  ];

  // Text API
  // private _textApi = "http://skateipsum.com";

  /**
   *
   */
  static getRandomLoremSentence = () =>
    FakeDataUtils.randomValueFromArray([
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Donec egestas lacus et porta congue.",
      "Proin semper mauris et hendrerit euismod.",
      "Aenean bibendum nunc a nunc aliquam vulputate vitae in nisi.",
      "Nam faucibus ipsum condimentum, lobortis ante quis, tempus nunc.",
      "Vivamus vulputate nisi nec metus pulvinar scelerisque non in ex.",
      "Duis quis eros vel metus vehicula tristique eu id ipsum.",
      "In ac nisi pharetra sem efficitur placerat.",
      "Nam finibus turpis at quam pulvinar, et elementum ante pharetra.",
      "Sed vel massa lacinia dolor lacinia molestie.",
      "Curabitur fermentum ante id mi tristique commodo.",
      "Aliquam at mi eu orci ultrices dignissim ut vel sem.",
      "Pellentesque iaculis odio vel leo venenatis, ut vehicula mauris varius.",
      "Etiam ac risus eget odio hendrerit iaculis non ac libero.",
      "Curabitur in augue in urna ultrices porta."
    ]);

  // --------------------------------------------------------------------------- UTILS

  /**
   * Get random value between min and max
   * @param pMin
   * @param pMax
   */
  static randomIntFromInterval(pMin: number, pMax: number) {
    return Math.floor(Math.random() * (pMax - pMin + 1) + pMin);
  }

  /**
   * Get random Value from array
   */
  static randomValueFromArray(pArray: any[]): any {
    return pArray[Math.floor(Math.random() * pArray.length)];
  }

  // --------------------------------------------------------------------------- PUBLIC API

  /**
   * Get Responsive Image Data
   * @param pRatio
   * @return {IImage[]} return a array of IImage
   */
  public getResponsiveImageData(pRatio: number = 4 / 3): IImage[] {
    // get breakpoint sizes // TODO need to be injected
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
        this._imageApi,
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
    debug("getResponsiveImageData return ", fakeImageArray);
    return fakeImageArray;
  }

  /**
   * Get video URL
   * @param pVideoType
   * @param pYoutubeId
   * @param pVimeoId
   * @return {string} video URL
   */
  // prettier-ignore
  public getVideoUrl(
    pVideoType: EVideoType,
    pYoutubeId: string = FakeDataUtils.randomValueFromArray(this._youtubeIds),
    pVimeoId: string = FakeDataUtils.randomValueFromArray(this._vimeoIds)
  ): string {

    // if is youtube
    if (pVideoType === EVideoType.YOUTUBE) {
      const url = `https://youtu.be/${FakeDataUtils.randomValueFromArray(this._youtubeIds)}`;
      debug("random youtube url", url);
      return url;
    }

    // if is vimeo
    if (pVideoType === EVideoType.VIMEO) {
      const url = `https://vimeo.com/${FakeDataUtils.randomValueFromArray(this._vimeoIds)}`;
      debug("random vimeo url", url);
      return url;
    }

    // if is native
    if (pVideoType === EVideoType.NATIVE) {
      const url = FakeDataUtils.randomValueFromArray(this._nativeVideosUrl);
      debug("random native video url", url);
      return url;
    }
  }

  /**
   * Get video ID
   * @param pVideoType
   * @return {string} video ID
   */
  public getVideoId(pVideoType: EVideoType.YOUTUBE | EVideoType.VIMEO): string {
    if (pVideoType === EVideoType.YOUTUBE) {
      const id = FakeDataUtils.randomValueFromArray(this._youtubeIds);
      debug("random youtube id", id);
      return id;
    }
    if (pVideoType === EVideoType.VIMEO) {
      const id = FakeDataUtils.randomValueFromArray(this._vimeoIds);
      debug("random viemo id", id);
      return id;
    }
  }

  /**
   * Générer un faux titre depuis les "lorem ipsum", avec un nombre de caractères max
   */
  static getRandomTitle = (pMaxWords = Number.POSITIVE_INFINITY) =>
    FakeDataUtils.getRandomLoremSentence()
      .split(" ")
      .map((el: any, i: number) => (i > pMaxWords ? null : el))
      .filter((el: any) => el != null)
      .join(" ");

  /**
   * Get Text
   * @param pType type of text
   * @param pLength Size of text
   * @return {string} text
   */
  public getText(
    pType: ETextType = ETextType.BRUT,
    pLength: number = 1
  ): string {
    return "";
  }
}

export { FakeDataUtils as default };
