import clsx from 'clsx';
import React from 'react';

interface ButtonDaySelectedProps {
  highlight: boolean;
  type: string;
  label: string;
  onClick: () => void;
}
export const ButtonDaySelected = ({
  highlight,
  type,
  label,
  onClick,
}: ButtonDaySelectedProps) => {
  return (
    <div
      className={clsx(
        'px-2 py-2 rounded-lg bg-movie-black text-center font-mont text-sm ',
        highlight ? 'border-2 border-movie-yellow font-bold' : '',
        type === 'past' ? 'bg-movie-grey cursor-not-allowed' : 'cursor-pointer',
      )}
      onClick={() => {
        return type !== 'past' && onClick();
      }}
    >
      {label}
    </div>
  );
};
