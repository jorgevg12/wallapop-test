import { renderHook, act, waitFor } from "@testing-library/react";
import { useFetchData } from "../useFetchData";

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({ items: [{ title: "Item 1" }], pagesAvailable: 2 }),
  })
) as jest.Mock;

describe("useFetchData", () => {
  it("fetches data and updates state", async () => {
    const { result } = renderHook(() => useFetchData(""));

    await waitFor(() => {
      expect(result.current.items).toEqual([{ title: "Item 1" }]);
      expect(result.current.page).toBe(1);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(false);
      expect(result.current.availablePages).toBe(2);
    });
  });

  it("handles search and updates state", async () => {
    const { result } = renderHook(() => useFetchData(""));

    await waitFor(() => {
      expect(result.current.items).toEqual([{ title: "Item 1" }]);
    });

    act(() => {
      result.current.setSearch("test");
    });

    await waitFor(() => {
      expect(result.current.items).toEqual([{ title: "Item 1" }]);
      expect(result.current.page).toBe(1);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(false);
      expect(result.current.availablePages).toBe(2);
    });
  });

  it("handles pagination and updates state", async () => {
    const { result } = renderHook(() => useFetchData(""));

    await waitFor(() => {
      expect(result.current.items).toEqual([{ title: "Item 1" }]);
    });

    act(() => {
      result.current.setPage(2);
    });

    await waitFor(() => {
      expect(result.current.items).toEqual([
        { title: "Item 1" },
        { title: "Item 1" },
      ]);
      expect(result.current.page).toBe(2);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(false);
      expect(result.current.availablePages).toBe(2);
    });
  });

  it("handles server error and updates state", async () => {
    (global.fetch as jest.Mock) = jest.fn(() =>
      Promise.resolve({
        ok: false,
      })
    );
    const { result } = renderHook(() => useFetchData(""));
    await waitFor(() => {
      expect(result.current.items).toEqual([]);
      expect(result.current.page).toBe(1);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(true);
      expect(result.current.availablePages).toBe(1);
    });
  });
});
