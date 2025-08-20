'use client';

import React from 'react';
import { CarouselTemplate } from './CarouselTemplate';
import { CardCollection } from '../organisms';
import { useGetMoviesHomepage } from '@/hooks/useMovies';

export const LandingTemplate = () => {
  const { data, isLoading } = useGetMoviesHomepage();
  return (
    <div className='flex flex-col gap-8'>
      <CarouselTemplate movies={data?.popular || []} />
      <CardCollection
        title='Popular'
        movies={data?.popular || []}
        isLoading={isLoading}
      />
      <CardCollection
        title='Top Rated'
        movies={data?.topRated || []}
        isLoading={isLoading}
      />
      <CardCollection
        title='Upcoming'
        movies={data?.upcoming || []}
        isLoading={isLoading}
      />
    </div>
  );
};
