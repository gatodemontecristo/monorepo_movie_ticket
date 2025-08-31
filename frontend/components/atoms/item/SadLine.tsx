import React from 'react';

interface SadLineProps {
  color?: string;
  strokeWidth?: number;
  className?: string;
}
export const SadLine = ({ color, strokeWidth, className }: SadLineProps) => {
  return (
    <div
      className={`flex flex-col justify-center items-center w-full ${className}`}
      style={{ overflow: 'visible' }}
    >
      <svg
        width='440'
        height='32'
        viewBox='0 0 440 32'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        style={{ overflow: 'visible', display: 'block' }}
      >
        <path
          d='M20 16 Q220 -10 420 16'
          stroke={color || '#fff'}
          strokeWidth={strokeWidth || 6}
          fill='none'
        />
      </svg>
      <p className='text-movie-white text-lg'>Screen</p>
    </div>
  );
};
