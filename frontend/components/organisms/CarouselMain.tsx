'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaRegStar, FaRegStarHalfStroke, FaStar } from 'react-icons/fa6';
import { FaRegCalendar } from 'react-icons/fa6';
import { TbClockHour2 } from 'react-icons/tb';
import { useGetMoviesHomepage } from '@/hooks/useMovies';

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
  const { data: movies, isLoading, error } = useGetMoviesHomepage();
  console.log('Movies data:', movies);
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
        // style={{ transform: `translateX(-${current * 100}%)` }}
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
            <div className='absolute flex flex-row bottom-0 justify-evenly items-center text-center px-0 py-8 gap-10 text-white'>
              <div className='flex flex-col gap-4 w-1/3  justify-start text-left'>
                <h2 className='text-6xl  font-bold  font-mont'>Oppenheimer</h2>
                <div className='flex flex-row  gap-4 text-sm'>
                  <p>Biography, Drama, History</p>
                  <div className='flex flex-row gap-1 items-center'>
                    <FaRegCalendar className='text-movie-yellow' />
                    <p>2023</p>
                  </div>
                  <div className='flex flex-row gap-1 items-center'>
                    <TbClockHour2 className='text-movie-yellow' />
                    <p>3h 1 m</p>
                  </div>
                </div>
                <div className='flex flex-row  gap-4  text-sm'>
                  <div className='flex flex-row items-center justify-center text-movie-duck text-sm gap-2'>
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaRegStarHalfStroke />
                    <FaRegStar />
                  </div>
                  <div
                    className='bg-movie-black text-movie-metal 
              font-bold py-1 px-6 rounded-sm transition duration-300 transform 
                border-movie-metal border-2 font-caros text-sm flex items-center justify-center'
                  >
                    <p>PG-13</p>
                  </div>
                </div>
                <div className='flex flex-row  gap-2 text-sm'>
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
              </div>
              <div className='flex flex-col gap-2  w-1/3 text-right text-sm'>
                <p>
                  Christopher Nolan :{' '}
                  <span className='text-movie-yellow'>Director</span>
                </p>
                <p>
                  Cillian Murphy, Emily Blunt, Matt Damon :{' '}
                  <span className='text-movie-yellow'>Starts</span>
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
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
