'use client';

import { Movie } from '@/types';
import React, { useState } from 'react';
import { MovieCard } from '../molecules';
import { nanoid } from 'nanoid';

interface CardCollectionProps {
  movies: Movie[];
  title: string;
}

export const CardCollection = ({ movies, title }: CardCollectionProps) => {
  const [showAll, setShowAll] = useState(false);
  const maxInitialItems = 12;

  // Determinar qué películas mostrar
  const moviesToShow = showAll ? movies : movies.slice(0, maxInitialItems);
  const hasMoreItems = movies.length > maxInitialItems;

  const handleToggleView = () => {
    setShowAll(!showAll);
  };

  return (
    <div className='flex flex-col gap-6 p-5'>
      <p className='w-full text-4xl font-mont font-medium text-movie-white ms-4'>
        {title}
      </p>
      <div className='flex flex-row flex-wrap '>
        {moviesToShow.map(movie => (
          <MovieCard key={nanoid()} movie={movie} />
        ))}
      </div>

      {/* Botón See all / Show less */}
      {hasMoreItems && (
        <div className='flex justify-end mt-4'>
          <button
            onClick={handleToggleView}
            className='text-movie-yellow hover:text-movie-white underline underline-offset-2 font-caros font-medium text-lg transition-colors duration-300 me-8'
          >
            {showAll
              ? `Show Less`
              : `See All (${movies.length - maxInitialItems} more)`}
          </button>
        </div>
      )}
    </div>
  );
};
