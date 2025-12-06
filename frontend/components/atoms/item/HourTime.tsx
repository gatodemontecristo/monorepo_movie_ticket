import React from 'react';

interface HourTimeProps {
  text: string;
}
export const HourTime = ({ text }: HourTimeProps) => {
  return (
    <div className='font-mont text-xs text-movie-white px-3 py-1  bg-movie-black border-movie-yellow border-2 rounded-2xl'>
      <p>{text}</p>
    </div>
  );
};
