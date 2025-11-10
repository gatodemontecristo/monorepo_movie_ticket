'use client';

import React from 'react';
import { ButtonMovie } from '../atoms';
import Link from 'next/link';

interface ButtonHomeProps {
  type?: 'filled' | 'outlined';
  className?: string;
}
export const ButtonHome = ({ type = 'filled', className }: ButtonHomeProps) => {
  return (
    <div className='flex flex-row items-center justify-center w-full'>
      <Link
        className={`mt-3 ${className}`}
        href={{
          pathname: '/movies',
        }}
      >
        <ButtonMovie type={type} text='Return to home' />
      </Link>
    </div>
  );
};
