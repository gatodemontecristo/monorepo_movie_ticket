import { NOT_FOUND_BACKGROUND } from '@/constants';
import { Movie } from '@/types';
import Image from 'next/image';
import React from 'react';
import { FaStar } from 'react-icons/fa6';
import { ButtonMovie } from '../atoms';
import Link from 'next/link';

interface MovieCardProps {
  movie: Movie;
}
export const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <div className='flex flex-col w-1/6 p-5 text-movie-white'>
      {/* Contenedor de la imagen con efectos hover */}
      <div className='relative overflow-hidden rounded-lg group cursor-pointer'>
        <Image
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w1280${movie.poster_path}`
              : NOT_FOUND_BACKGROUND
          }
          alt={movie.title}
          width={500}
          height={750}
          className='w-full h-auto object-cover transition-transform duration-500 ease-out group-hover:scale-110'
          priority
        />

        <div
          className='absolute inset-0 bg-transparent  group-hover:bg-[#000000b5]
                        transition-all duration-400 ease-out
                        flex items-end justify-center pb-6'
        >
          <div
            className='flex flex-col justify-center items-center gap-3 transform translate-y-50 group-hover:translate-y-0 
                          transition-transform duration-500 ease-out delay-100'
          >
            <Link
              href={{
                pathname: `movies/ticket/${movie.id}`,
              }}
            >
              <ButtonMovie
                type='filled'
                text='Book Tickets'
                className='shadow-lg !border-0'
              />
            </Link>
            <Link
              href={{
                pathname: `movies/review/${movie.id}`,
              }}
            >
              <ButtonMovie
                type='filled'
                text='Review'
                className='shadow-lg !border-0'
              />
            </Link>
            <Link
              href={{
                pathname: `movies/more/${movie.id}`,
              }}
            >
              <ButtonMovie
                type='filled'
                text='More'
                className='shadow-lg !border-0'
              />
            </Link>
          </div>
        </div>
      </div>

      <div className='flex flex-col ms-2 mt-2'>
        <p className='text-movie-white font-caros text-2xl font-semibold line-clamp-3 overflow-hidden text-ellipsis'>
          {movie.title}
        </p>

        <div className='flex flex-row items-center justify-start gap-5 mt-1 text-xs font-medium font-mont'>
          <div className='flex flex-row items-center gap-1'>
            <FaStar className='text-movie-duck' />
            <p>{movie.vote_average.toFixed(1)}/10</p>
          </div>
          <p>{movie.vote_count.toFixed(0)} votes</p>
        </div>
      </div>
    </div>
  );
};
