import { describe, it, expect } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useMovies } from "../useMovies";
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

describe("useMovies", () => {
  it("fetches popular movies successfully", async () => {
    const { result } = renderHook(() => useMovies("popular"), { wrapper });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockMovies);
  });

  it("fetches top rated movies successfully", async () => {
    const { result } = renderHook(() => useMovies("top_rated"), { wrapper });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockMovies);
  });
});
