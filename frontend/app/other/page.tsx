import { ButtonHome } from '@/components';
import Image from 'next/image';
import React from 'react';

export default function NotFound() {
  return (
    <div className='relative overflow-hidden h-screen w-screen'>
      <Image
        src='/moon_bg.jpg'
        alt='Not Found'
        fill
        className='object-cover'
        priority
      />
      <div className='absolute  flex flex-col items-center justify-center h-screen w-screen z-20'>
        <h1 className='text-8xl font-mont font-bold text-movie-duck mb-4'>
          404
        </h1>
        <p className='text-2xl font-caros text-movie-white mb-2'>
          Página de película no encontrada
        </p>
        <p className='text-movie-white opacity-70 font-caros'>
          No pudimos encontrar el contenido que buscas en TMDB.
        </p>
        <ButtonHome></ButtonHome>
      </div>
      <div className='absolute inset-0 bg-black/50' />
    </div>
  );
}
