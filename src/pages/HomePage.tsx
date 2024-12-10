import React, { useState } from 'react';
import { Film } from 'lucide-react';
import { MovieGrid } from '../components/MovieGrid';
import { useMovies } from '../hooks/useMovies';

export const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'popular' | 'top_rated'>('popular');
  const { data: movies, isLoading, error } = useMovies(activeTab);

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900">
        <p className="text-white">Error loading movies. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <header className="bg-gray-800 p-4 shadow-lg">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Film className="h-8 w-8 text-red-500" />
              <h1 className="text-2xl font-bold text-white">RedFlix - MovieDB</h1>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setActiveTab('popular')}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === 'popular'
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Popular
              </button>
              <button
                onClick={() => setActiveTab('top_rated')}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === 'top_rated'
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Top Rated
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl py-8">
        {isLoading ? (
          <div className="flex h-96 items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-red-500 border-t-transparent"></div>
          </div>
        ) : movies ? (
          <MovieGrid movies={movies} />
        ) : null}
      </main>
    </div>
  );
};