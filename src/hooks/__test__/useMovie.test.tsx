import { describe, it, expect} from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useMovie } from "../useMovie";
import { mockMovies } from "../../test/mocks/handlers";

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useMovie", () => {
  it("fetches movie details successfully", async () => {
    const { result } = renderHook(() => useMovie(1), { wrapper });

    // Initially loading
    expect(result.current.isLoading).toBe(true);

    // Wait for the query to complete
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    // Check if the data matches our mock
    expect(result.current.data).toEqual(mockMovies[0]);
  });

  it("handles non-existent movie IDs", async () => {
    const { result } = renderHook(() => useMovie(999), { wrapper });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeDefined();
  });

  it("does not fetch when ID is invalid", async () => {
    const { result } = renderHook(() => useMovie(0), { wrapper });

    // Should not trigger the query
    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeUndefined();
  });

  it("updates when movie ID changes", async () => {
    const { result, rerender } = renderHook(({ id }) => useMovie(id), {
      wrapper,
      initialProps: { id: 1 },
    });

    // Wait for first query to complete
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
    expect(result.current.data).toEqual(mockMovies[0]);

    // Change the movie ID
    rerender({ id: 2 });

    // Wait for second query to complete
    await waitFor(() => {
      expect(result.current.data).toEqual(mockMovies[1]);
    });
  });

  it("caches movie data", async () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    // First render
    const { result: firstResult } = renderHook(() => useMovie(1), { wrapper });
    await waitFor(() => {
      expect(firstResult.current.isSuccess).toBe(true);
    });

    // Second render should use cached data
    const { result: secondResult } = renderHook(() => useMovie(1), { wrapper });
    expect(secondResult.current.isLoading).toBe(false);
    expect(secondResult.current.data).toEqual(mockMovies[0]);
  });
});
