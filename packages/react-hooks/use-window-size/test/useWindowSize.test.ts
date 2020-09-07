// @ts-ignore
import useWindowSize, { IWindowSize } from "../src";
import { renderHook, act } from "@testing-library/react-hooks";
import { cleanup, fireEvent } from "@testing-library/react";

describe("useWindowSize", () => {
  afterEach(cleanup);

  it("should be defined", () => {
    expect(useWindowSize).toBeDefined();
  });

  it("should be an object", () => {
    const { result } = renderHook(() => useWindowSize());
    expect(typeof result.current).toBe("object");
  });

  it("should returned IWindowSize interface object", () => {
    expect.objectContaining({
      width: expect.any(Number),
      height: expect.any(Number)
    } as IWindowSize);
  });

  it("should return new window size after window resize", () => {
    const { result } = renderHook(() => useWindowSize());
    act(() => {
      (window.innerWidth as number) = 900;
      (window.innerHeight as number) = 600;
      fireEvent(window, new Event("resize"));
    });
    expect(result.current.width).toBe(900);
    expect(result.current.height).toBe(600);
  });
});
