import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { MovieCard } from "../MovieCard";

const mockMovie = {
  id: 1,
  title: "Test Movie",
  original_title: "Test Movie",
  poster_path: "/test.jpg",
  overview: "Test overview",
  vote_average: 8.5,
  release_date: "2024-01-01",
};

describe("MovieCard", () => {
  it("renders movie information correctly", () => {
    render(
      <BrowserRouter>
        <MovieCard movie={mockMovie} />
      </BrowserRouter>
    );

    expect(screen.getByAltText("Test Movie")).toBeInTheDocument();
    expect(screen.getByText("Test Movie")).toBeInTheDocument();
    expect(screen.getByText("8.5")).toBeInTheDocument();
  });

  it("links to the correct movie details page", () => {
    render(
      <BrowserRouter>
        <MovieCard movie={mockMovie} />
      </BrowserRouter>
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/movie/1");
  });
});
