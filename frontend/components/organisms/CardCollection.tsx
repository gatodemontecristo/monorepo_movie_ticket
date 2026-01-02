'use client';

import { Movie } from '@/types';
import React from 'react';
import { CardCollectionSkeleton, MovieCard } from '../molecules';
import { nanoid } from 'nanoid';
import { useShowItems } from '@/hooks';
import { ButtonLink } from '../atoms';

interface CardCollectionProps {
  movies: Movie[];
  title: string;
  isLoading: boolean;
}

export const CardCollection = ({
  movies,
  title,
  isLoading,
}: CardCollectionProps) => {
  const { itemsToShow, hasMoreItems, handleToggleView } = useShowItems({
    items: movies,
  });

  return (
    <div className='flex flex-col md:gap-6 gap-4 md:p-5 p-4'>
      <p className='w-full md:text-4xl text-3xl font-mont font-medium text-movie-white ms-4'>
        {title}
      </p>
      {isLoading ? (
        <CardCollectionSkeleton />
      ) : (
        <>
          <div className='flex flex-row flex-wrap '>
            {itemsToShow.map(movie => (
              <MovieCard key={nanoid()} movie={movie} />
            ))}
          </div>
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
        </>
      )}
    </div>
  );
};
