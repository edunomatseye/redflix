import { useQuery } from '@tanstack/react-query';
import { getMovieDetails } from '../services/movieService';
import type { Movie } from '../types/movie';

export function useMovie(id: number) {
  return useQuery<Movie>({
    queryKey: ['movie', id],
    queryFn: () => getMovieDetails(id),
    enabled: !!id,
  });
}