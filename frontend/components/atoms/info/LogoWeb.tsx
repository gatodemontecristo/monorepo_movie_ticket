import React from 'react';
import { IoTicket } from 'react-icons/io5';
interface LogoWebProps {
  webname: string;
  direction?: 'row' | 'column';
  size?: 'small' | 'large';
}
export const LogoWeb = ({
  webname,
  direction = 'column',
  size = 'small',
}: LogoWebProps) => {
  return (
    <div
      className={`flex ${direction === 'column' ? 'flex-col' : 'flex-row'} items-center gap-1 cursor-pointer`}
    >
      <IoTicket
        className={`text-movie-duck ${size === 'small' ? 'text-3xl' : 'text-4xl'}`}
      />
      <p
        className={`text-movie-white  ${size === 'small' ? 'text-sm' : 'text-lg'}  font-normal font-mont`}
      >
        {webname}
      </p>
    </div>
  );
};
