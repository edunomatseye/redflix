import { useQuery } from '@tanstack/react-query';
import { getPopularMovies, getTopRatedMovies } from '../services/movieService';
import type { Movie } from '../types/movie';

export function useMovies(type: 'popular' | 'top_rated') {
  return useQuery<Movie[]>({
    queryKey: ['movies', type],
    queryFn: () => type === 'popular' ? getPopularMovies() : getTopRatedMovies(),
  });
}