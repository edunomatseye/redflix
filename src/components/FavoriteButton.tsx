import React from 'react';
import { Heart } from 'lucide-react';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onClick: () => void;
  className?: string;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  isFavorite,
  onClick,
  className = '',
}) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={`group relative flex items-center gap-2 rounded-full bg-gray-900/50 px-4 py-2 backdrop-blur-sm transition-all hover:bg-gray-900 ${className}`}
    >
      <Heart
        className={`h-5 w-5 transition-colors ${
          isFavorite ? 'fill-red-500 text-red-500' : 'text-white group-hover:text-red-500'
        }`}
      />
      <span className="text-sm font-medium text-white">
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </span>
    </button>
  );
};