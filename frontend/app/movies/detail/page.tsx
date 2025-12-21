'use client';

import React from 'react';
import { ScreenContent } from '@/components/molecules/ScreenContent';
import { useMovieDetails } from '@/hooks';
import Image from 'next/image';
import { NOT_FOUND_BACKGROUND } from '@/constants';
import { FaCalendar, FaHourglassStart } from 'react-icons/fa6';
import { TbClockHour10Filled } from 'react-icons/tb';
import { IoMdFilm } from 'react-icons/io';

export default function DetailPage() {
  const {
    data: movie,
    error: errorMovie,
    isLoading: isLoadingMovie,
  } = useMovieDetails(83533);
  console.log({ movie, errorMovie });
  if (!movie) {
    return <div>Movie not found</div>;
  }
  return (
    <ScreenContent isLoading={isLoadingMovie} outside>
      <div className='min-h-screen bg-movie-black p-8 mt-24 flex flex-col items-center gap-4'>
        <p className='w-full text-4xl font-mont font-medium text-movie-white mb-8 text-center'>
          My Ticket History 2
        </p>
        <div className='bg-movie-white w-1/3 rounded-3xl p-4 flex flex-col'>
          <Image
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
                : NOT_FOUND_BACKGROUND
            }
            alt={movie.title}
            width={700}
            height={450}
            className='w-full h-auto object-cover rounded-3xl  transition-transform duration-500 ease-out group-hover:scale-110'
            priority
          />
          <div className='flex flex-col p-6 w-full'>
            <div className='text-movie-black font-caros flex flex-row gap-1 items-center justify-center text-4xl font-semibold line-clamp-3 overflow-hidden text-ellipsis mb-4'>
              <p>{movie.title}</p>{' '}
              <span className='text-lg'>(#{movie.id})</span>
            </div>
            <div className='flex flex-row justify-between items-center text-lg'>
              <div className='flex flex-col  items-start'>
                <p className='flex flex-row items-center gap-1'>
                  <FaCalendar size={20} /> Date
                </p>
                <p>Dec 18, 2025</p>
              </div>
              <div className='flex flex-col items-start'>
                <p className='flex flex-row items-center gap-1'>
                  <TbClockHour10Filled size={20} /> Hour
                </p>
                <p>16:00 PM</p>
              </div>
              <div className='flex flex-col  items-start'>
                <p className='flex flex-row items-center gap-1'>
                  <FaHourglassStart size={16} /> Duration
                </p>
                <p>{`${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`}</p>
              </div>
              <div className='flex flex-col items-start'>
                <p className='flex flex-row items-center gap-1'>
                  <IoMdFilm size={20} /> Rating
                </p>
                <p>{movie.adult ? 'R' : 'PG-13'}</p>
              </div>
            </div>
            <div className='flex flex-row text-lg mt-4 '>
              <div className='flex flex-col items-start w-1/3 p-2'>
                <p>Seats</p>
                <p className='text-2xl font-bold'>D12, D13</p>
              </div>
              <div className='flex flex-col w-2/3 border-s-3 border-dashed border-movie-grey p-2 px-5 justify-start items-start'>
                <p>QR code generated</p>
              </div>
            </div>
            <div className='flex flex-row text-lg mt-4 '>
              <p className='font-mont text-movie-grey leading-none text-[15px] text-justify'>
                {movie.overview}
              </p>
            </div>
          </div>
        </div>
      </div>
    </ScreenContent>
  );
}
