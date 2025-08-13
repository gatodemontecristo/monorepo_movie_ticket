'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { Cast } from '@/types/tmdb';
import { buildImageUrl, IMAGE_SIZES } from '@/config/tmdb';
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from 'react-icons/md';

interface CastCarouselProps {
  cast: Cast[];
}

export const CastCarousel: React.FC<CastCarouselProps> = ({ cast }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const currentScroll = container.scrollLeft;

      // Si estamos al inicio, ir al final
      if (currentScroll <= 0) {
        container.scrollTo({
          left: container.scrollWidth - container.clientWidth,
          behavior: 'smooth',
        });
      } else {
        container.scrollBy({
          left: -300,
          behavior: 'smooth',
        });
      }
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const currentScroll = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;

      // Si estamos al final, ir al inicio
      if (currentScroll >= maxScroll - 10) {
        // -10 para margen de error
        container.scrollTo({
          left: 0,
          behavior: 'smooth',
        });
      } else {
        container.scrollBy({
          left: 300,
          behavior: 'smooth',
        });
      }
    }
  };

  // Si no hay cast, no mostrar nada
  if (!cast || cast.length === 0) {
    return null;
  }

  return (
    <div className='relative'>
      {/* Botones de navegación */}
      <div className='flex justify-end gap-2 mb-4'>
        <button
          onClick={scrollLeft}
          className='p-2 rounded-full border-2 border-movie-yellow text-movie-yellow hover:bg-movie-yellow hover:text-movie-black transition-all duration-300'
        >
          <MdOutlineNavigateBefore className='w-5 h-5' />
        </button>

        <button
          onClick={scrollRight}
          className='p-2 rounded-full border-2 border-movie-yellow text-movie-yellow hover:bg-movie-yellow hover:text-movie-black transition-all duration-300'
        >
          <MdOutlineNavigateNext className='w-5 h-5' />
        </button>
      </div>

      {/* Carousel container */}
      <div ref={scrollContainerRef} className='overflow-x-auto scrollbar-hide'>
        <div className='flex gap-4 w-max'>
          {cast.map((actor, index) => (
            <div key={actor.id || index} className='flex-shrink-0 w-24 md:w-32'>
              <div className='flex flex-col items-center text-center'>
                {/* Profile Image */}
                <div className='relative w-24 h-24 md:w-32 md:h-32 mb-3 rounded-full overflow-hidden bg-gray-800'>
                  {actor.profile_path ? (
                    <Image
                      src={
                        buildImageUrl(
                          actor.profile_path,
                          IMAGE_SIZES.PROFILE.MEDIUM,
                        ) as string
                      }
                      alt={actor.name}
                      fill
                      className='object-cover'
                      sizes='(max-width: 768px) 96px, 128px'
                    />
                  ) : (
                    <div className='w-full h-full bg-gray-700 flex items-center justify-center'>
                      <span className='text-gray-400 text-xs font-medium'>
                        No Image
                      </span>
                    </div>
                  )}
                </div>

                {/* Actor Name */}
                <h4 className='text-movie-white font-medium text-sm md:text-base font-caros line-clamp-2'>
                  {actor.name}
                </h4>

                {/* Character Name */}
                <p className='text-movie-metal text-xs md:text-sm font-mont mt-1 line-clamp-2'>
                  {actor.character}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
