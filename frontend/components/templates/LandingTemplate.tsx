'use client';

import React from 'react';
import { CarouselTemplate } from './CarouselTemplate';
import { CardCollection } from '../organisms';
import { useGetMoviesHomepage } from '@/hooks/useMovies';

export const LandingTemplate = () => {
  const { data } = useGetMoviesHomepage();
  console.log('LandingTemplate data:', data);
  return (
    <div className='flex flex-col gap-8'>
      <CarouselTemplate movies={data?.popular || []} />
      <CardCollection title='Popular' movies={data?.popular || []} />
      <CardCollection title='Top Rated' movies={data?.topRated || []} />
      <CardCollection title='Upcoming' movies={data?.upcoming || []} />
    </div>
  );
};
