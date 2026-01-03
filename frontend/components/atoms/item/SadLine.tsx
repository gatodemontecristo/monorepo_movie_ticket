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
      {/* Mobile SVG (340px width) */}
      <svg
        width='340'
        height='32'
        viewBox='0 0 340 32'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='block md:hidden'
      >
        <path
          d='M20 16 Q170 -10 320 16'
          stroke={color || '#fff'}
          strokeWidth={strokeWidth || 6}
          fill='none'
        />
      </svg>

      {/* Desktop SVG (440px width) */}
      <svg
        width='440'
        height='32'
        viewBox='0 0 440 32'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='hidden md:block'
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
