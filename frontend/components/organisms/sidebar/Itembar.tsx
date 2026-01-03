import Link from 'next/link';
import React from 'react';
interface ItembarProps {
  title: string;
  path: string;
}
export const Itembar = ({ title, path }: ItembarProps) => {
  return (
    <Link
      href={path}
      className='flex flex-row gap-3 items-center cursor-pointer group'
    >
      <h2 className='uppercase font-caros font-semibold text-movie-white group-hover:text-movie-yellow group-hover:translate-x-2 transition-all duration-200'>
        {title}
      </h2>
    </Link>
  );
};
