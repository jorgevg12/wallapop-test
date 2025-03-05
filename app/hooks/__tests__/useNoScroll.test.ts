import { renderHook } from "@testing-library/react";
import useNoScroll from "../useNoScroll";

describe("useNoScroll", () => {
  it("adds no-scroll class to body when isActive is true", () => {
    renderHook(() => useNoScroll(true));
    expect(document.body.classList.contains("no-scroll")).toBe(true);
  });

  it("removes no-scroll class from body when isActive is false", () => {
    renderHook(() => useNoScroll(false));
    expect(document.body.classList.contains("no-scroll")).toBe(false);
  });

  it("cleans up no-scroll class on unmount", () => {
    const { unmount } = renderHook(() => useNoScroll(true));
    unmount();
    expect(document.body.classList.contains("no-scroll")).toBe(false);
  });
});
