import { SEAT_SIZES, SEAT_STATES } from '@/constants';
import React from 'react';
import { MdEventSeat } from 'react-icons/md';
interface SeatProps {
  size: SEAT_SIZES;
  state: SEAT_STATES;
  disable?: boolean;
  onClick?: () => void;
}
export const Seat = ({ size, state, onClick, disable = false }: SeatProps) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-5 h-5',
    large: 'w-6 h-6',
  };
  const stateClasses = {
    available: `text-movie-skin ${disable ? 'cursor-not-allowed' : 'hover:text-movie-white cursor-pointer'}`,
    selected: `text-movie-yellow ${disable ? 'cursor-not-allowed' : 'hover:text-movie-duck cursor-pointer'}`,
    unavailable: 'text-movie-gray cursor-not-allowed',
  };
  return (
    <div
      className={`p-0 ${stateClasses[state]}`}
      onClick={
        state === 'available' || state === 'selected' ? onClick : undefined
      }
    >
      <MdEventSeat className={sizeClasses[size]} />
    </div>
  );
};
