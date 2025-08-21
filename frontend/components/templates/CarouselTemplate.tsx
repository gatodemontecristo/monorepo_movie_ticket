'use client';

import React, { useEffect, useState } from 'react';
import { InfoMovieTemplate } from './InfoMovieTemplate';
import { Movie } from '@/types';
import { nanoid } from 'nanoid';
import { CAROUSEL_INTERVAL } from '@/constants';
import { BackgroundContent, ScreenContent } from '../molecules';

interface CarouselTemplateProps {
  movies: Movie[];
  isLoading: boolean;
}
export const CarouselTemplate = ({
  movies,
  isLoading,
}: CarouselTemplateProps) => {
  const [current, setCurrent] = useState(0);

  const goToNext = () => {
    setCurrent(prev => (prev + 1) % (movies.length || 0));
  };

  useEffect(() => {
    const interval = setInterval(goToNext, CAROUSEL_INTERVAL);
    return () => clearInterval(interval);
  }, [movies.length]);

  return (
    <ScreenContent isLoading={isLoading}>
      <div
        className='flex transition-transform duration-1000 ease-in-out h-full w-full'
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {movies.map(movie => (
          <BackgroundContent
            key={nanoid()}
            title={movie.title}
            imgPath={movie.backdrop_path || ''}
          >
            <InfoMovieTemplate movie={movie} />
          </BackgroundContent>
        ))}
      </div>
      <div className='absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2'>
        {movies?.map((_, index) => (
          <button
            key={nanoid()}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full ${
              current === index ? 'bg-white' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </ScreenContent>
  );
};
