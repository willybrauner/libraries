// @ts-ignore
import useDidUpdate from "../src/useDidUpdate";
import { renderHook } from "@testing-library/react-hooks";

describe("useDidUpdate", () => {
  it("should be defined", () => {
    expect(useDidUpdate).toBeDefined();
  });

  const mockFn = jest.fn(() => {});
  it("should be called only on update", () => {
    const { rerender } = renderHook(() => useDidUpdate(mockFn));

    expect(mockFn.mock.calls.length).toBe(0);
    rerender(mockFn);
    expect(mockFn.mock.calls.length).toBe(1);
  });
});
