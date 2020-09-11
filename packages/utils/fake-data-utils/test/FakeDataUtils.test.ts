// @ts-ignore
import FakeDataUtils, { EVideoType } from "../src/FakeDataUtils";

describe("FakeDataUtils", () => {
  it("should be defined", () => {
    expect(FakeDataUtils).toBeDefined();
  });

  describe("getResponsiveImageData", () => {
    it("should be defined", () => {
      expect(FakeDataUtils.getResponsiveImageData).toBeDefined();
    });
    it("should return an array of IImage objects", () => {
      const thumbs = FakeDataUtils.getResponsiveImageData();
      expect(thumbs).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            url: expect.any(String),
            width: expect.any(Number),
            height: expect.any(Number)
          })
        ])
      );
    });
  });

  describe("getVideoId", () => {
    it("should return a string", () => {
      const youtubeId = FakeDataUtils.getVideoId(EVideoType.YOUTUBE);
      const vimeoId = FakeDataUtils.getVideoId(EVideoType.VIMEO);
      [youtubeId, vimeoId].forEach(el => {
        expect(typeof el).toBe("string");
      });
    });
  });

  describe("getVideoUrl", () => {
    it("should be defined", () => {
      expect(FakeDataUtils.getVideoUrl).toBeDefined();
    });
    it("should return a string", () => {
      const youtubeUrl = FakeDataUtils.getVideoUrl(EVideoType.YOUTUBE);
      const vimeoUrl = FakeDataUtils.getVideoUrl(EVideoType.VIMEO);
      const nativeUrl = FakeDataUtils.getVideoUrl(EVideoType.NATIVE);
      [youtubeUrl, vimeoUrl, nativeUrl].forEach(el => {
        expect(typeof el).toBe("string");
      });
    });
  });

  describe("getTitle", () => {
    it("should be defined", () => {
      expect(FakeDataUtils.getTitle).toBeDefined();
    });
    it("should return a string", () => {
      expect(typeof FakeDataUtils.getTitle()).toBe("string");
    });
  });

  describe("getText", () => {
    it("should be defined", () => {
      expect(FakeDataUtils.getText).toBeDefined();
    });
    it("should return a string", () => {
      expect(typeof FakeDataUtils.getText()).toBe("string");
    });
  });
});
