'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa6';

type Slide = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
};

const slides: Slide[] = [
  {
    id: 1,
    title: 'Película Romántica',
    description: 'Una historia de amor inolvidable.',
    imageUrl:
      'https://image.tmdb.org/t/p/w1280/z9Yu4eBVnWRpsL4fDng9m4GOm6p.jpg',
  },
  {
    id: 2,
    title: 'Acción sin límites',
    description: 'Explosiones y persecuciones al límite.',
    imageUrl:
      'https://image.tmdb.org/t/p/w1280/z9Yu4eBVnWRpsL4fDng9m4GOm6p.jpg',
  },
  {
    id: 3,
    title: 'Aventura Épica',
    description: 'Viaja a lo desconocido con esta gran aventura.',
    imageUrl:
      'https://image.tmdb.org/t/p/w1280/z9Yu4eBVnWRpsL4fDng9m4GOm6p.jpg',
  },
];

export default function CarouselMain() {
  const [current, setCurrent] = useState(0);

  const goToNext = () => {
    setCurrent(prev => (prev + 1) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(goToNext, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='relative overflow-hidden h-screen w-screen'>
      {/* Carrusel contenedor */}
      <div
        className='flex transition-transform duration-1000 ease-in-out h-full w-full'
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map(slide => (
          <div key={slide.id} className='w-full flex-shrink-0 h-full relative'>
            {/* Imagen de fondo */}
            <Image
              src={slide.imageUrl}
              alt={slide.title}
              fill
              className='object-cover'
              priority
            />

            {/* Overlay oscuro */}
            <div className='absolute inset-0 bg-black/60' />

            {/* Contenido */}
            <div className='absolute inset-0 flex flex-col justify-center items-center text-center px-4 text-white'>
              <div className='flex flex-row gap-4'>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />

                <button
                  className='bg-movie-duck hover:bg-movie-black hover:text-movie-duck text-movie-black 
              font-bold py-2 px-8 rounded-sm transition duration-300 transform mb-6
                border-movie-duck border-2 font-caros'
                >
                  Book Tickets
                </button>
                <button
                  className='bg-movie-black hover:bg-movie-duck hover:text-movie-black text-movie-duck 
              font-bold py-2 px-8 rounded-sm transition duration-300 transform mb-6
                border-movie-duck border-2 font-caros'
                >
                  Review
                </button>
                <button
                  className='bg-movie-black hover:bg-movie-duck hover:text-movie-black text-movie-duck 
              font-bold py-2 px-8 rounded-sm transition duration-300 transform mb-6
                border-movie-duck border-2 font-caros'
                >
                  More
                </button>
              </div>
              <h2 className='text-4xl md:text-6xl font-bold mb-4 font-mont'>
                {slide.title}
              </h2>
              <p className='text-lg md:text-2xl max-w-xl'>
                {slide.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Indicadores */}
      <div className='absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2'>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full ${
              current === index ? 'bg-white' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
