import { isPastTime } from '@/utils';
import React from 'react';

interface HourTimeProps {
  text: string;
  selected: boolean;
  onSelect?: () => void;
}
export const HourTime = ({ text, selected, onSelect }: HourTimeProps) => {
  const isDisabled = isPastTime(text);

  return (
    <div
      className={`font-mont text-xs text-center flex-col justify-center items-center px-3 py-1 rounded-2xl ${
        isDisabled
          ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
          : `text-movie-white bg-movie-black cursor-pointer ${selected ? 'border-movie-yellow border-2' : ''}`
      }`}
      onClick={isDisabled ? undefined : onSelect}
    >
      <p>{text}</p>
    </div>
  );
};
