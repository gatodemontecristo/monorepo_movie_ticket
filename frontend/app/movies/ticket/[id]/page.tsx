'use client';

import { MovieTheater, SadLine } from '@/components';
import SelectCountry from '@/components/atoms/SelectCountry';
import { useMovieTheater } from '@/hooks';
import { getMovieTheather } from '@/utils';
import { nanoid } from 'nanoid';
import React from 'react';
interface Props {
  params: Promise<{ id: number }>;
}

export default function MovieTicketPage({ params }: Props) {
  const { state, dispatch } = useMovieTheater(getMovieTheather());
  return (
    <div className='text-movie-white pt-[100px]'>
      <h1>Movie Ticket Page</h1>
      <SelectCountry />
      <SadLine className='my-0' />

      <div className='flex flex-col'>
        {state.map(theater => (
          <MovieTheater key={nanoid()} theather={theater} dispatch={dispatch}>
            <MovieTheater.MovieSection lines={theater.lines} isReverse />
            <MovieTheater.MovieSection lines={theater.other_lines} />
          </MovieTheater>
        ))}
      </div>
    </div>
  );
}
