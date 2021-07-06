import { useDidUpdate } from "../src";
import { renderHook } from "@testing-library/react-hooks";

describe("useDidUpdate", () => {
  it("should be defined", () => {
    expect(useDidUpdate).toBeDefined();
  });

  it("should be called only on update", () => {
    const mockFn = jest.fn(() => {});
    const { rerender } = renderHook(() => useDidUpdate(mockFn));
    expect(mockFn.mock.calls.length).toBe(0);
    rerender(mockFn);
    expect(mockFn.mock.calls.length).toBe(1);
  });
});
