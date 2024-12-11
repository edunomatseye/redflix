import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { MovieGrid } from "../MovieGrid";
import { renderWithProviders } from "../../test/utils";

const mockMovies = [
  {
    id: 1,
    title: "Test Movie 1",
    original_title: "Test Movie 1",
    poster_path: "/test1.jpg",
    overview: "Test overview 1",
    vote_average: 8.5,
    release_date: "2024-01-01",
  },
  {
    id: 2,
    title: "Test Movie 2",
    original_title: "Test Movie 2",
    poster_path: "/test2.jpg",
    overview: "Test overview 2",
    vote_average: 7.5,
    release_date: "2024-01-02",
  },
];

describe("MovieGrid", () => {
  it("renders a grid of movie cards", () => {
    renderWithProviders(<MovieGrid movies={mockMovies} />);

    // Check if all movies are rendered
    mockMovies.forEach((movie) => {
      expect(screen.getByText(movie.title)).toBeInTheDocument();
      expect(screen.getByAltText(movie.title)).toBeInTheDocument();
      expect(
        screen.getByText(movie.vote_average.toFixed(1))
      ).toBeInTheDocument();
    });
  });

  it("renders correct number of movie cards", () => {
    renderWithProviders(<MovieGrid movies={mockMovies} />);

    const movieCards = screen.getAllByRole("link");
    expect(movieCards).toHaveLength(mockMovies.length);
  });

  it("renders movie cards with correct links", () => {
    renderWithProviders(<MovieGrid movies={mockMovies} />);

    const movieLinks = screen.getAllByRole("link");
    movieLinks.forEach((link, index) => {
      expect(link).toHaveAttribute("href", `/movie/${mockMovies[index].id}`);
    });
  });

  it("applies correct grid layout classes", () => {
    renderWithProviders(<MovieGrid movies={mockMovies} />);

    const grid = screen.getByTestId("list");
    expect(grid).toHaveClass(
      "grid",
      "grid-cols-2",
      "sm:grid-cols-3",
      "md:grid-cols-4",
      "lg:grid-cols-5"
    );
  });

  it("renders empty grid when no movies are provided", () => {
    renderWithProviders(<MovieGrid movies={[]} />);

    const grid = screen.getByTestId("list");
    expect(grid).toBeEmptyDOMElement();
  });
});
