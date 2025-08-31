import { Seat } from '@/components';
import { getMovieTheather } from '@/utils';
import { nanoid } from 'nanoid';
import React from 'react';
import { MdEventSeat } from 'react-icons/md';

interface Props {
  params: Promise<{ id: number }>;
}
export default function MovieTicketPage({ params }: Props) {
  return (
    <div className='text-movie-white pt-[100px]'>
      <h1>Movie Ticket Page</h1>
      <svg
        width='100%'
        height='32'
        viewBox='0 0 400 32'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='my-8'
      >
        <path
          d='M10 16 Q200 -10 390 16'
          stroke='#fff'
          strokeWidth='6'
          fill='none'
        />
      </svg>

      <div className='flex flex-col'>
        {getMovieTheather().map(theater => (
          <div key={nanoid()} className='flex flex-row items-center gap-5'>
            <p className='text-movie-white font-caros text-lg w-5'>
              {theater.row}
            </p>
            <div className='flex flex-row'>
              {theater.lines.map(line => (
                <Seat key={nanoid()} size='large' state={line.state} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
