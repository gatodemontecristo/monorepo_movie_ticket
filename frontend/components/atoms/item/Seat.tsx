import React from 'react';
import { MdEventSeat } from 'react-icons/md';
interface SeatProps {
  size: 'small' | 'medium' | 'large';
  state: 'available' | 'selected' | 'unavailable';
  onClick?: () => void;
}
export const Seat = ({ size, state, onClick }: SeatProps) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-5 h-5',
    large: 'w-6 h-6',
  };
  const stateClasses = {
    available: 'text-movie-skin hover:text-movie-white cursor-pointer',
    selected: 'text-movie-yellow hover:text-movie-duck cursor-pointer',
    unavailable: 'text-movie-gray cursor-not-allowed',
  };
  return (
    <div className={`p-0 ${stateClasses[state]}`} onClick={onClick}>
      <MdEventSeat className={sizeClasses[size]} />
    </div>
  );
};
