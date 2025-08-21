'use client';

import React from 'react';
import { ButtonMovie } from '../atoms';
import { useRouter } from 'next/navigation';
export const ButtonHome = () => {
  const router = useRouter();
  const handleBack = () => {
    router.push('/movies');
  };
  return (
    <div className='flex flex-row items-center justify-center'>
      <ButtonMovie
        type='filled'
        text='Return to home'
        className='mt-3'
        onClick={handleBack}
      />
    </div>
  );
};
