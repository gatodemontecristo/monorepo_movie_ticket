'use client';

import React from 'react';
import { Cast } from '@/types/tmdb';
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from 'react-icons/md';
import { nanoid } from 'nanoid';
import { ButtonCircle } from '../atoms';
import { CastCard } from './CastCard';
import { useCastScroll } from '@/hooks';

interface CastCarouselProps {
  cast: Cast[];
  title: string;
}

export const CastCarousel = ({ cast, title }: CastCarouselProps) => {
  const { scrollLeft, scrollRight, scrollContainerRef } = useCastScroll();

  if (!cast || cast.length === 0) {
    return null;
  }

  return (
    <div className='relative'>
      <div className='flex items-center justify-between mb-8'>
        <h2 className='text-4xl ms-5 font-caros font-bold text-movie-white'>
          {title}
        </h2>
        <div className='flex flex-row justify-end gap-2 mb-4'>
          <ButtonCircle onClick={scrollLeft}>
            <MdOutlineNavigateBefore className='w-5 h-5' />
          </ButtonCircle>
          <ButtonCircle onClick={scrollRight}>
            <MdOutlineNavigateNext className='w-5 h-5' />
          </ButtonCircle>
        </div>
      </div>
      {/* Carousel container */}
      <div ref={scrollContainerRef} className='overflow-x-auto scrollbar-hide'>
        <div className='flex gap-4 w-max'>
          {cast.map(actor => (
            <CastCard actor={actor} key={nanoid()} />
          ))}
        </div>
      </div>
    </div>
  );
};
