import clsx from 'clsx';
import React from 'react';
interface ButtonMovieProps {
  type: 'filled' | 'outlined';
  text: string;
  onClick?: () => void;
  className?: string;
}

export const ButtonMovie = ({
  onClick,
  type,
  text,
  className,
}: ButtonMovieProps) => {
  return (
    <button
      className={clsx(
        ' font-bold py-2 px-8 rounded-sm cursor-pointer transition duration-300 transform  border-2 font-caros w-fit',
        className,
        {
          'bg-movie-duck hover:bg-movie-black hover:text-movie-duck text-movie-black border-movie-duck':
            type === 'filled',
          'bg-movie-black hover:bg-movie-duck hover:text-movie-black text-movie-duck border-movie-duck':
            type === 'outlined',
        },
      )}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
