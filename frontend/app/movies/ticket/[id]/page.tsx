'use client';

import { MovieTheater, SadLine } from '@/components';
import { getMovieTheather } from '@/utils';
import { nanoid } from 'nanoid';
import React from 'react';

interface Props {
  params: Promise<{ id: number }>;
}
export default function MovieTicketPage({ params }: Props) {
  return (
    <div className='text-movie-white pt-[100px]'>
      <h1>Movie Ticket Page</h1>
      <SadLine className='my-0' />

      <div className='flex flex-col'>
        {getMovieTheather().map(theater => (
          <MovieTheater key={nanoid()} theather={theater}>
            <MovieTheater.MovieSection lines={theater.lines} isReverse />
            <MovieTheater.MovieSection lines={theater.other_lines} />
          </MovieTheater>
        ))}
      </div>
    </div>
  );
}
