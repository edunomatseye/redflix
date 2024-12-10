import React from 'react';
import { MovieCard } from './MovieCard';
import type { Movie } from '../types/movie';

interface MovieGridProps {
  movies: Movie[];
}

export const MovieGrid: React.FC<MovieGridProps> = ({ movies }) => {
  return (
    <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};