import React from 'react';
import { BiSolidCameraMovie } from 'react-icons/bi';

interface NotFoundTextProps {
  className?: string;
  text: string;
}
export const NotFoundText = ({ text, className }: NotFoundTextProps) => {
  return (
    <div
      className={`flex flex-col items-center justify-center h-full w-full ml-5 inset-0 text-3xl text-movie-white gap-2 ${className}`}
    >
      <BiSolidCameraMovie className='size-14' />
      <p className='font-mont'>{text}</p>
    </div>
  );
};
