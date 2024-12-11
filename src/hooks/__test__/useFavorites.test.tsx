import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useFavorites } from "../useFavorites";

describe("useFavorites", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("initializes with empty favorites", () => {
    const { result } = renderHook(() => useFavorites());
    expect(result.current.favorites).toEqual([]);
  });

  it("adds a movie to favorites", () => {
    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.addFavorite(1);
    });

    expect(result.current.favorites).toContain(1);
    expect(localStorage.getItem("redflix_favorites")).toBe("[1]");
  });

  it("removes a movie from favorites", () => {
    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.addFavorite(1);
      result.current.removeFavorite(1);
    });

    expect(result.current.favorites).not.toContain(1);
    expect(localStorage.getItem("redflix_favorites")).toBe("[]");
  });

  it("toggles favorite status", () => {
    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.toggleFavorite(1);
    });

    expect(result.current.isFavorite(1)).toBe(true);

    act(() => {
      result.current.toggleFavorite(1);
    });

    expect(result.current.isFavorite(1)).toBe(false);
  });
});
