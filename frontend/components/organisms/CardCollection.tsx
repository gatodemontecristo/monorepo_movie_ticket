'use client';

import { Movie } from '@/types';
import React from 'react';
import { MovieCard } from '../molecules';
import { nanoid } from 'nanoid';
import { useShowItems } from '@/hooks';
import { ButtonLink } from '../atoms';

interface CardCollectionProps {
  movies: Movie[];
  title: string;
}

export const CardCollection = ({ movies, title }: CardCollectionProps) => {
  const { itemsToShow, hasMoreItems, handleToggleView } = useShowItems({
    items: movies,
  });

  return (
    <div className='flex flex-col gap-6 p-5'>
      <p className='w-full text-4xl font-mont font-medium text-movie-white ms-4'>
        {title}
      </p>
      <div className='flex flex-row flex-wrap '>
        {itemsToShow.map(movie => (
          <MovieCard key={nanoid()} movie={movie} />
        ))}
      </div>

      {/* Botón See all / Show less */}
      {hasMoreItems && (
        <ButtonLink
          onClick={handleToggleView}
          text={
            itemsToShow.length === movies.length
              ? `Show Less`
              : `See All (${movies.length - itemsToShow.length} more)`
          }
        />
      )}
    </div>
  );
};
