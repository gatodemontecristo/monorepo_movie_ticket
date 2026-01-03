import React from 'react';

export interface InfoBoxProps {
  color?: string;
  number?: number;
  text: string;
}

export const InfoBox = ({
  number = 0,
  text,
  color = 'bg-green-500',
}: InfoBoxProps) => {
  return (
    <div
      className={`w-full flex justify-center text-center items-center flex-col px-10 py-5 md:py-10 ${color}`}
    >
      <p className='text-movie-white font-caros text-2xl'>
        {number.toFixed(0)}
      </p>
      <p className='text-movie-white font-caros text-xl'>{text}</p>
    </div>
  );
};
