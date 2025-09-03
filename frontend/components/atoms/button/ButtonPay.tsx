import clsx from 'clsx';
import React from 'react';
interface ButtonPayProps {
  text: string;
  onClick?: () => void;
  className?: string;
}

export const ButtonPay = ({ onClick, text, className }: ButtonPayProps) => {
  return (
    <button
      className={clsx(
        ' font-bold py-5 px-5 rounded-sm cursor-pointer transition duration-300 transform  border-none font-caros text-lg w-fit bg-movie-yellow text-movie-black hover:bg-movie-black hover:text-movie-yellow',
        className,
      )}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
