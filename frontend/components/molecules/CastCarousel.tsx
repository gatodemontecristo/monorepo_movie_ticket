'use client';

import React from 'react';
import { Cast } from '@/types/tmdb';
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from 'react-icons/md';
import { nanoid } from 'nanoid';
import { ButtonCircle, CastLoading } from '../atoms';
import { useCastScroll } from '@/hooks';
import { CastCard } from './CastCard';
interface CastCarouselProps {
  cast: Cast[];
  title: string;
  isLoading: boolean;
}

export const CastCarousel = ({ cast, title, isLoading }: CastCarouselProps) => {
  const { scrollLeft, scrollRight, scrollContainerRef } = useCastScroll();

  if (!cast || cast.length === 0) {
    return null;
  }

  return (
    <div className='relative flex flex-col gap-6'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-4xl ms-5 font-caros font-bold text-movie-white'>
          {title}
        </h2>
        {!isLoading && (
          <div className='flex flex-row justify-end gap-2 mb-4'>
            <ButtonCircle onClick={scrollLeft}>
              <MdOutlineNavigateBefore className='w-5 h-5' />
            </ButtonCircle>
            <ButtonCircle onClick={scrollRight}>
              <MdOutlineNavigateNext className='w-5 h-5' />
            </ButtonCircle>
          </div>
        )}
      </div>
      {/* Carousel container */}
      {isLoading && (
        <div className='flex flex-row justify-center'>
          {Array.from({ length: 6 }).map(() => (
            <CastLoading key={nanoid()} />
          ))}
        </div>
      )}
      {!isLoading && (
        <div
          ref={scrollContainerRef}
          className='overflow-x-auto scrollbar-hide'
        >
          <div className='flex gap-4 w-max'>
            {cast.map(actor => (
              <CastCard actor={actor} key={nanoid()} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
