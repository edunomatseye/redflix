import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, Calendar } from "lucide-react";
import { useMovie } from "../hooks/useMovie";
import { useFavorites } from "../hooks/useFavorites";
import { FavoriteButton } from "../components/FavoriteButton";
import { getImageUrl } from "../config/api";

export const MovieDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const movieId = parseInt(id!, 10);
  const { data: movie, isLoading, error } = useMovie(movieId);
  const { isFavorite, toggleFavorite } = useFavorites();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-red-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900">
        <p className="text-white">Movie not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="relative h-[60vh]">
        <img
          src={getImageUrl(movie.poster_path)}
          alt={movie.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        <div className="absolute left-4 top-4 flex items-center gap-4">
          <Link
            to="/"
            className="rounded-full bg-gray-900/50 p-2 text-white backdrop-blur-sm transition-colors hover:bg-gray-900"
          >
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <FavoriteButton
            isFavorite={isFavorite(movieId)}
            onClick={() => toggleFavorite(movieId)}
          />
        </div>
      </div>

      <div className="relative -mt-32 mx-auto max-w-4xl px-4 py-8">
        <div className="rounded-lg bg-gray-800 p-6 shadow-xl">
          <h1 className="text-3xl font-bold text-white">{movie.title}</h1>
          {movie.original_title !== movie.title && (
            <p className="mt-1 text-gray-400">({movie.original_title})</p>
          )}

          <div className="mt-4 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-yellow-400">
              <Star className="h-5 w-5 fill-yellow-400" />
              <span className="text-lg font-semibold">
                {movie.vote_average.toFixed(1)}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Calendar className="h-5 w-5" />
              <span>{new Date(movie.release_date).getFullYear()}</span>
            </div>
          </div>

          <p className="mt-6 text-lg leading-relaxed text-gray-300">
            {movie.overview}
          </p>
        </div>
      </div>
    </div>
  );
};
