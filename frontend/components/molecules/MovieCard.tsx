import { NOT_FOUND_BACKGROUND } from '@/constants';
import { Movie } from '@/types';
import Image from 'next/image';
import React from 'react';
import { FaStar } from 'react-icons/fa6';

interface MovieCardProps {
  movie: Movie;
}
export const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <div className='flex flex-col w-1/6 p-5 text-movie-white'>
      <Image
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w1280${movie.poster_path}`
            : NOT_FOUND_BACKGROUND
        }
        alt=''
        width={500}
        height={750}
        className='w-full h-auto object-cover '
        priority
      />

      <div className='flex flex-col ms-2 mt-2'>
        <p className='text-movie-white font-caros text-2xl font-semibold line-clamp-3 overflow-hidden text-ellipsis'>
          {movie.title}
        </p>

        <div className='flex flex-row items-center  justify-start gap-5 mt-1 text-xs font-medium font-mont'>
          <div className='flex flex-row items-center  gap-1'>
            <FaStar className='text-movie-duck' />
            <p>{movie.vote_average.toFixed(1)}/10</p>
          </div>
          <p>{movie.vote_count.toFixed(0)} votes</p>
        </div>
      </div>
    </div>
  );
};
