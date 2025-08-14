import { buildImageUrl, IMAGE_SIZES } from '@/config/tmdb';
import { Cast } from '@/types';
import Image from 'next/image';
import React from 'react';
import { NoCast } from '../atoms';
interface CastCardProps {
  actor: Cast;
  className?: string;
}
export const CastCard = ({ actor, className }: CastCardProps) => {
  return (
    <div className={`flex-shrink-0 w-24 md:w-32 ${className}`}>
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
            <NoCast message='No Image' />
          )}
        </div>
        <h4 className='text-movie-white font-medium text-sm md:text-base font-caros line-clamp-2'>
          {actor.name}
        </h4>
        <p className='text-movie-metal text-xs md:text-sm font-mont mt-1 line-clamp-2'>
          {actor.character}
        </p>
      </div>
    </div>
  );
};
