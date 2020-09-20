import { useResponsiveImageData } from "../src/useResponsiveImageData";
import { randomIntFromInterval, breakpoints, thumbs } from "./prepareTest";
import { renderHook } from "@testing-library/react-hooks";

describe("useResponsiveImageData", () => {
  it("should be defined", () => {
    expect(useResponsiveImageData).toBeDefined();
  });

  it("should return object who contains smallest width value if container size is smaller than it", () => {
    const containerWidth = breakpoints[0] - 1;
    const { result } = renderHook(() =>
      useResponsiveImageData(thumbs, containerWidth)
    );
    expect(result.current).toMatchObject(thumbs[0]);
  });

  it("should always returned first image object who got width up to current container width", () => {
    // generated random width container between second and third object
    const containerWidth = randomIntFromInterval(
      breakpoints[1],
      breakpoints[2] - 1
    );
    const { result } = renderHook(() =>
      useResponsiveImageData(thumbs, containerWidth)
    );
    expect(result.current).toMatchObject(thumbs[2]);
  });

  it("should return object who contains biggest width value if container size is bigger than it", () => {
    const containerWidth = breakpoints[breakpoints.length - 1] + 20;
    const { result } = renderHook(() =>
      useResponsiveImageData(thumbs, containerWidth)
    );
    const lastThumbObject = thumbs[thumbs.length - 1];
    expect(result.current).toMatchObject(lastThumbObject);
  });
});
