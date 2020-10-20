import { preloadImages } from "../src/preloadImages";

describe("preloadImages", () => {
  it("should be defined", () => {
    expect(preloadImages).toBeDefined();
  });

  it("should wait each images are loaded before resolve promise", () => {});

  it("should throw an error if image can not load", () => {});

  it("should return an array of HTMLImageElement", () => {});
});
