import { Seat } from '@/components/atoms';
import { DEFAULT_SEAT_SIZE, GENERAL_SEAT_CATEGORIES } from '@/constants';
import React from 'react';

export const SeatLegend = () => {
  return (
    <div className='flex flex-row justify-center w-full items-center gap-5 mt-5'>
      {GENERAL_SEAT_CATEGORIES.map(category => (
        <div key={category.state} className='flex flex-row items-center gap-2'>
          <Seat
            size={DEFAULT_SEAT_SIZE}
            state={category.state}
            disable={category.disable}
          />
          <p className='text-movie-white font-mont text-sm'>{category.label}</p>
        </div>
      ))}
    </div>
  );
};
