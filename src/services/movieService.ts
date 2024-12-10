import axios from 'axios';
import { BASE_URL, API_KEY } from '../config/api';
import type { Movie } from '../types/movie';

interface MovieResponse {
  results: Movie[];
}

export const getPopularMovies = async (): Promise<Movie[]> => {
  const response = await axios.get<MovieResponse>(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}`
  );
  return response.data.results;
};

export const getTopRatedMovies = async (): Promise<Movie[]> => {
  const response = await axios.get<MovieResponse>(
    `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`
  );
  return response.data.results;
};

export const getMovieDetails = async (id: number): Promise<Movie> => {
  const response = await axios.get<Movie>(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
  );
  return response.data;
};