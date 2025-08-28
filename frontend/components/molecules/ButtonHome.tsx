'use client';

import React from 'react';
import { ButtonMovie } from '../atoms';
import { useRouter } from 'next/navigation';

interface ButtonHomeProps {
  type?: 'filled' | 'outlined';
  className?: string;
}
export const ButtonHome = ({ type = 'filled', className }: ButtonHomeProps) => {
  const router = useRouter();
  const handleBack = () => {
    router.push('/movies');
  };
  return (
    <div className='flex flex-row items-center justify-center'>
      <ButtonMovie
        type={type}
        text='Return to home'
        className={`mt-3 ${className}`}
        onClick={handleBack}
      />
    </div>
  );
};
