import { Movie } from '@/types';
import React from 'react';
import { FaStar } from 'react-icons/fa6';

interface MovieCardProps {
  movie: Movie;
}
export const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <div className='flex flex-col w-1/6 p-5 text-movie-white'>
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w1280${movie.poster_path}`
            : 'https://via.placeholder.com/1280x720?text=No+Image+Available'
        }
        alt=''
      />
      <div className='flex flex-col ms-2 mt-2'>
        <p className='text-movie-white font-caros text-2xl font-semibold'>
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
