'use client';

import clsx from 'clsx';
import React from 'react';

interface ButtonCircleProps {
  type?: 'filled' | 'outlined';

  onClick: () => void;
  className?: string;
  children?: React.ReactNode;
}
export const ButtonCircle = ({
  type = 'outlined',
  onClick,
  className,
  children,
}: ButtonCircleProps) => {
  return (
    <button
      onClick={() => onClick()}
      className={clsx(
        'p-2 rounded-full transition-all duration-300',
        className,
        {
          'bg-movie-black border-none text-movie-white hover:bg-movie-yellow hover:text-movie-black':
            type === 'filled',
          'border-movie-yellow border-2  text-movie-yellow hover:bg-movie-yellow hover:text-movie-black':
            type === 'outlined',
        },
      )}
    >
      {children}
    </button>
  );
};
