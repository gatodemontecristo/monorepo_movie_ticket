import Link from 'next/link';
import React from 'react';

interface ButtonMenuProps {
  text: string;
  href: string;
}
export const ButtonMenu = ({ text, href }: ButtonMenuProps) => {
  return (
    <Link
      href={{
        pathname: href,
      }}
    >
      <button className='text-movie-white uppercase cursor-pointer text-base font-medium font-caros hover:underline hover:underline-offset-2 hover:text-movie-yellow transition duration-300'>
        {text}
      </button>
    </Link>
  );
};
