'use client';

import React from 'react';
import { ButtonMovie } from '../atoms';
import { useNavigation } from '@/hooks';

interface ButtonHomeProps {
  type?: 'filled' | 'outlined';
  className?: string;
}
export const ButtonHome = ({ type = 'filled', className }: ButtonHomeProps) => {
  const { goToHome } = useNavigation();
  return (
    <div className='flex flex-row items-center justify-center'>
      <ButtonMovie
        type={type}
        text='Return to home'
        className={`mt-3 ${className}`}
        onClick={goToHome}
      />
    </div>
  );
};
