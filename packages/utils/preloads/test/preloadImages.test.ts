import { preloadImage, preloadImages } from "../src/preloadImages";

describe("preloadImage", () => {
  it("should be defined", () => {
    expect(preloadImage).toBeDefined();
  });

  it("should wait single image is loaded before resolve promise", async () => {
    const url = "https://picsum.photos/200/300";
    await expect(preloadImage(url)).toBeDefined();
  });
});

describe("preloadImages", () => {
  it("should be defined", () => {
    expect(preloadImages).toBeDefined();
  });

  it("should wait each images are loaded before resolve promise", async () => {
    const urls = [
      "https://picsum.photos/200/300",
      "https://picsum.photos/200/300",
    ];
    await expect(preloadImages(urls)).toBeDefined();
  });

  // it("should return an array of HTMLImageElement", () => {});
});
