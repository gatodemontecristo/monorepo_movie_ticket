import React from 'react';
import { IoTicket } from 'react-icons/io5';
interface LogoWebProps {
  webname: string;
}
export const LogoWeb = ({ webname }: LogoWebProps) => {
  return (
    <div className='flex flex-col items-center gap-1 cursor-pointer'>
      <IoTicket className='text-movie-duck text-3xl' />
      <p className='text-movie-white text-sm font-normal font-mont'>
        {webname}
      </p>
    </div>
  );
};
