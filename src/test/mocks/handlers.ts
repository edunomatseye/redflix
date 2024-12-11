import { http, HttpResponse } from "msw";
import { BASE_URL } from "../../config/api";

export const mockMovies = [
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

export const handlers = [
  http.get(`${BASE_URL}/movie/popular`, () => {
    return HttpResponse.json({ results: mockMovies });
  }),

  http.get(`${BASE_URL}/movie/top_rated`, () => {
    return HttpResponse.json({ results: mockMovies });
  }),

  http.get(`${BASE_URL}/movie/:id`, ({ params }) => {
    const { id } = params;
    const movie = mockMovies.find((m) => m.id === Number(id));
    if (!movie) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(movie);
  }),
];
