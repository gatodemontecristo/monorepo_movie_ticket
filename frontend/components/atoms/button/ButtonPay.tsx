import clsx from 'clsx';
import React from 'react';
import { GeneralLoader } from '../skeleton';
interface ButtonPayProps {
  text: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
}

export const ButtonPay = ({
  onClick,
  text,
  className,
  disabled = false,
  isLoading = false,
}: ButtonPayProps) => {
  return (
    <button
      className={clsx(
        ' font-bold py-5 px-5 rounded-sm  transition duration-300 transform  border-none font-caros text-lg w-fit',
        className,
        disabled
          ? 'bg-movie-metal cursor-not-allowed'
          : ' bg-movie-yellow text-movie-black hover:bg-movie-black hover:text-movie-yellow cursor-pointer',
      )}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <div className='relative flex flex-row justify-center my-5'>
          <GeneralLoader />
        </div>
      ) : (
        text
      )}
    </button>
  );
};
