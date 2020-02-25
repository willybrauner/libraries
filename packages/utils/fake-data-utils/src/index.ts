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
  // --------------------------------------------------------------------------- DATAS

  // image API
  private static imageApi = "https://picsum.photos";

  // Collection of NPR tiny desk concert youtube video Ids
  private static youtubeIds = [
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
  private static vimeoIds = [
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
  private static nativeVideosUrl = [
    "https://cher-ami.tv/user/pages/02.works/12.le-bon-marche/SCENE_1.mp4"
  ];

  private static lorem = [
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
  ];

  // --------------------------------------------------------------------------- UTILS

  /**
   * Get random value between min and max
   * @param pMin
   * @param pMax
   */
  private static randomIntFromInterval(pMin: number, pMax: number) {
    return Math.floor(Math.random() * (pMax - pMin + 1) + pMin);
  }

  /**
   * Get random Value from array
   */
  private static randomValueFromArray(pArray: any[]): any {
    return pArray[Math.floor(Math.random() * pArray.length)];
  }

  // --------------------------------------------------------------------------- PUBLIC API

  /**
   * Get Responsive Image Data
   * @param pRatio
   * @return {IImage[]} return a array of IImage
   */
  public static getResponsiveImageData(pRatio: number = 4 / 3): IImage[] {
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
  public static getVideoUrl(
    pVideoType: EVideoType,
    pYoutubeId: string = FakeDataUtils.randomValueFromArray(FakeDataUtils.youtubeIds),
    pVimeoId: string = FakeDataUtils.randomValueFromArray(FakeDataUtils.vimeoIds)
  ): string {

    // if is youtube
    if (pVideoType === EVideoType.YOUTUBE) {
      const url = `https://youtu.be/${FakeDataUtils.randomValueFromArray(FakeDataUtils.youtubeIds)}`;
      debug("random youtube url", url);
      return url;
    }

    // if is vimeo
    if (pVideoType === EVideoType.VIMEO) {
      const url = `https://vimeo.com/${FakeDataUtils.randomValueFromArray(FakeDataUtils.vimeoIds)}`;
      debug("random vimeo url", url);
      return url;
    }

    // if is native
    if (pVideoType === EVideoType.NATIVE) {
      const url = FakeDataUtils.randomValueFromArray(FakeDataUtils.nativeVideosUrl);
      debug("random native video url", url);
      return url;
    }
  }

  /**
   * Get video ID
   * @param pVideoType
   * @return {string} video ID
   */
  public static getVideoId(
    pVideoType: EVideoType.YOUTUBE | EVideoType.VIMEO
  ): string {
    if (pVideoType === EVideoType.YOUTUBE) {
      const id = FakeDataUtils.randomValueFromArray(FakeDataUtils.youtubeIds);
      debug("random youtube id", id);
      return id;
    }
    if (pVideoType === EVideoType.VIMEO) {
      const id = FakeDataUtils.randomValueFromArray(FakeDataUtils.vimeoIds);
      debug("random viemo id", id);
      return id;
    }
  }

  /**
   * Get Title
   * @return {string}
   */
  public static getTitle(pMaxWords = Number.POSITIVE_INFINITY): string {
    return FakeDataUtils.randomValueFromArray(FakeDataUtils.lorem)
      .split(" ")
      .map((el: any, i: number) => (i > pMaxWords ? null : el))
      .filter((el: any) => el != null)
      .join(" ");
  }

  // TODO en cours
  public static getText(pMaxSentences = Number.POSITIVE_INFINITY): string {
    return FakeDataUtils.randomValueFromArray(FakeDataUtils.lorem)
      .split(" ")
      .map((el: any, i: number) => {
        if (el >= 0 && el < pMaxSentences) {
          debug("edlkedldk", el);
        }
      })
      .filter((el: any) => el)
      .join(" ");
  }
}

export { FakeDataUtils as default };
