import React from 'react';

interface ButtonMenuProps {
  text: string;
}
export const ButtonMenu = ({ text }: ButtonMenuProps) => {
  return (
    <button className='text-movie-white uppercase cursor-pointer text-base font-medium font-caros hover:underline hover:underline-offset-2 hover:text-movie-yellow transition duration-300'>
      {text}
    </button>
  );
};
