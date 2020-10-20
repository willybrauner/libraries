import { preloadImage, preloadImages } from "../src/preloadImages";

describe("preloadImage", () => {
  it("should be defined", () => {
    expect(preloadImage).toBeDefined();
  });

  it("should return an HTMLImageElement", async () => {
    const url = "https://picsum.photos/200/300";

    // FIXME
    const request = await preloadImage(url);
    console.log(request);
    expect(request).toBeDefined();
  });
});

describe("preloadImages", () => {
  it("should be defined", () => {
    expect(preloadImages).toBeDefined();
  });

  // it("should wait each images are loaded before resolve promise", () => {});
  //
  // it("should throw an error if image can not load", () => {});
  //
  // it("should return an array of HTMLImageElement", () => {});
});
