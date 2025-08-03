'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import { useGetMoviesHomepage } from '@/hooks/useMovies';
import { SecondaryInfo } from './SecondaryInfo';
import { ButtonMovie, InfoLabel } from '../atoms';
import { buildImageUrl, IMAGE_SIZES } from '@/config/tmdb';
import MainInfo from './MainInfo';

export default function CarouselMain() {
  const { data: movies, isLoading, error } = useGetMoviesHomepage();
  const [current, setCurrent] = useState(0);

  const goToNext = () => {
    setCurrent(prev => (prev + 1) % (movies?.popular.length || 0));
  };

  useEffect(() => {
    const interval = setInterval(goToNext, 50000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='relative overflow-hidden h-screen w-screen'>
      {/* Carousel container */}
      <div
        className='flex transition-transform duration-1000 ease-in-out h-full w-full'
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {movies?.popular.map(movie => (
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
            <div className='absolute flex flex-row bottom-0 w-full justify-evenly items-baseline-last text-center px-0 py-8 mb-5 gap-10 text-white'>
              <MainInfo movie={movie}>
                <MainInfo.Header />
                <MainInfo.OtherInfo />
                <MainInfo.Qualification />
                <MainInfo.Buttons>
                  <ButtonMovie type='filled' text='Book Tickets' />
                  <ButtonMovie type='outlined' text='Review' />
                  <ButtonMovie type='outlined' text='More' />
                </MainInfo.Buttons>
              </MainInfo>

              <SecondaryInfo className=' text-right text-sm' width='part'>
                <InfoLabel text='Christopher Nolan' subtext='Director' />
                <InfoLabel
                  text='Cillian Murphy, Emily Blunt, Matt Damon'
                  subtext='Stars'
                />
                <InfoLabel text='The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.' />
              </SecondaryInfo>
            </div>
          </div>
        ))}
      </div>

      <div className='absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2'>
        {movies?.popular.map((_, index) => (
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
}
