import { useAsyncLayoutEffect } from "../src";
import { act } from "react-test-renderer";
import { renderHook } from "@testing-library/react-hooks";

describe("useAsyncLayoutEffect", () => {
  // create mock who returns promise resolved after 500ms
  const mockAsyncCallback = jest.fn(
    (): Promise<void> => new Promise(resolve => setTimeout(() => resolve(), 500))
  );

  it("should be defined", () => {
    expect(useAsyncLayoutEffect).toBeDefined();
  });

  it("should be executed", async () => {
    const { result } = renderHook(() =>
      useAsyncLayoutEffect(mockAsyncCallback)
    );
    await act(async () => {
      await expect(mockAsyncCallback.mock.calls.length).toBe(1);
    });
  });
});
