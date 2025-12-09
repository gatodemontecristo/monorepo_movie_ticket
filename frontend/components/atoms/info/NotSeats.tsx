import React from 'react';
import { CgUnavailable } from 'react-icons/cg';

export const NotSeats = ({ msg }: { msg?: string }) => {
  return (
    <div className='flex flex-row items-center gap-2'>
      <p className='text-movie-white text-sm italic my-5'>
        {msg || 'No seats available'}
      </p>
      <CgUnavailable className='size-5' />
    </div>
  );
};
