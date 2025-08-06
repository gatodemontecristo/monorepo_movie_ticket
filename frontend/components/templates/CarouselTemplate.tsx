'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { buildImageUrl, IMAGE_SIZES } from '@/config/tmdb';
import { InfoMovieTemplate } from './InfoMovieTemplate';
import { useGetMoviesHomepage } from '@/hooks';

export const CarouselTemplate = () => {
  const { data } = useGetMoviesHomepage();
  console.log('data from useGetMoviesHomepage:', data);

  const movies = data?.popular || [];
  const [current, setCurrent] = useState(0);

  const goToNext = () => {
    setCurrent(prev => (prev + 1) % (movies.length || 0));
  };

  useEffect(() => {
    const interval = setInterval(goToNext, 5000);
    return () => clearInterval(interval);
  }, [movies.length]);

  return (
    <div className='relative overflow-hidden h-screen w-screen'>
      {/* Carousel container */}
      <div
        className='flex transition-transform duration-1000 ease-in-out h-full w-full'
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {movies.map(movie => (
          <div key={movie.id} className='w-full flex-shrink-0 h-full relative'>
            {/* Background image */}
            <Image
              src={
                buildImageUrl(
                  movie.backdrop_path || '',
                  IMAGE_SIZES.BACKDROP.LARGE,
                ) as string
              }
              alt={movie.title}
              fill
              className='object-cover'
              priority
            />

            {/* Overlay dark */}
            <div className='absolute inset-0 bg-black/30' />

            {/* Content */}
            <InfoMovieTemplate movie={movie} />
          </div>
        ))}
      </div>

      <div className='absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2'>
        {movies?.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full ${
              current === index ? 'bg-white' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
