'use client';

import {
  BackgroundContent,
  MovieTheater,
  SadLine,
  ScreenContent,
  SelectCountry,
} from '@/components';
import ReviewPanel from '@/components/organisms/ReviewPanel';
import { useMovieDetails, useMovieTheater } from '@/hooks';
import { getMovieTheather } from '@/utils';
import { nanoid } from 'nanoid';
import { notFound } from 'next/navigation';
import React, { useEffect, useState } from 'react';
interface Props {
  params: Promise<{ id: number }>;
}

const getDays = () => {
  const today = new Date();
  const days = [];
  // Ayer
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  days.push({
    label: `${String(yesterday.getDate()).padStart(2, '0')} ${yesterday.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}`,
    date: yesterday,
    highlight: false,
  });
  // Hoy
  days.push({
    label: `${String(today.getDate()).padStart(2, '0')} ${today.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}`,
    date: today,
    highlight: true,
  });
  // Próximos 3 días
  for (let i = 1; i <= 3; i++) {
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + i);
    days.push({
      label: `${String(nextDay.getDate()).padStart(2, '0')} ${nextDay.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}`,
      date: nextDay,
      highlight: false,
    });
  }
  return days;
};

const TicketWidget = () => (
  <div className='widget ticket --flex-column'>
    <div className='top --flex-column'>
      <div className='bandname font-bold'>Ghost Mice</div>
      <div className='tourname'>Home Tour</div>
      <img
        src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/199011/concert.png'
        alt=''
      />
      <div className='deetz flex flex-row justify-between'>
        <div className='event flex flex-col'>
          <div className='date'>3rd March 2017</div>
          <div className='location font-bold'>Bloomington, Indiana</div>
        </div>
        <div className='price flex flex-col'>
          <div className='label'>Price</div>
          <div className='cost font-bold'>$30</div>
        </div>
      </div>
    </div>
    <div className='rip'></div>
    <div className='bottom flex flex-row justify-between items-center'>
      <div className='barcode'></div>
      <a className='buy' href='#'>
        BUY TICKET
      </a>
    </div>
  </div>
);

export default function MovieTicketPage({ params }: Props) {
  const { state, dispatch } = useMovieTheater(getMovieTheather());
  const [country, setCountry] = useState('US');
  const [movieId, setMovieId] = useState<number | null>(null);
  useEffect(() => {
    const resolveParams = async () => {
      const { id } = await params;
      setMovieId(Number(id));
    };
    resolveParams();
  }, [params]);

  const { data: movie, error, isLoading } = useMovieDetails(movieId || 0);
  if (error) {
    notFound();
  }

  const days = getDays();

  return (
    <>
      <ScreenContent isLoading={isLoading || !movieId} outside>
        <BackgroundContent
          key={nanoid()}
          title={movie?.title || 'Movie Image'}
          imgPath={movie?.backdrop_path || ''}
          className='bg-black/70'
          classDiv='absolute'
        ></BackgroundContent>
        <div className='relative text-movie-white pt-[100px] w-full flex items-center flex-row z-10'>
          <div className='flex flex-col gap-2 w-1/4 items-start justify-center'>
            <SelectCountry value={country} onChange={setCountry} />
            <div className='flex gap-2'>
              {days.map((day, idx) => (
                <div
                  key={idx}
                  className={`px-2 py-2 rounded-lg bg-movie-black text-center font-mont text-sm ${
                    day.highlight
                      ? 'border-2 border-movie-yellow font-bold'
                      : ''
                  }`}
                >
                  {day.label}
                </div>
              ))}
            </div>
            <p className='font-caros text-movie-white text-lg'>Time</p>
            <div className='flex flex-row gap-2 flex-wrap'>
              <div className='font-mont text-sm text-movie-white px-4 py-1  bg-movie-black border-movie-yellow border-2 rounded-2xl'>
                <p>16:00 pm</p>
              </div>
              <div className='font-mont text-sm text-movie-white px-4 py-1  bg-movie-black border-movie-yellow border-2 rounded-2xl'>
                <p>18:00 pm</p>
              </div>
              <div className='font-mont text-sm text-movie-white px-4 py-1  bg-movie-black border-movie-yellow border-2 rounded-2xl'>
                <p>20:30 pm</p>
              </div>
              <div className='font-mont text-sm text-movie-white px-4 py-1  bg-movie-black border-movie-yellow border-2 rounded-2xl'>
                <p>21:30 pm</p>
              </div>
              <div className='font-mont text-sm text-movie-white px-4 py-1  bg-movie-black border-movie-yellow border-2 rounded-2xl'>
                <p>22:45 pm</p>
              </div>
            </div>
            {movie && (
              <ReviewPanel movie={movie}>
                <ReviewPanel.Title size='text-xl' />
                <div className='w-[80%]'>
                  <ReviewPanel.Poster />
                </div>
                <ReviewPanel.Other />
                <ReviewPanel.Extra />
              </ReviewPanel>
            )}
          </div>
          <div className='flex flex-col gap-4 w-2/4'>
            <SadLine className='my-0' />
            <div className='flex flex-col justify-center w-full items-center'>
              {state.map(theater => (
                <MovieTheater
                  key={nanoid()}
                  theather={theater}
                  dispatch={dispatch}
                >
                  <MovieTheater.MovieSection lines={theater.lines} isReverse />
                  <MovieTheater.MovieSection lines={theater.other_lines} />
                </MovieTheater>
              ))}
            </div>
          </div>
          <div className='flex flex-col w-1/4 relative'>
            <div id='aux-container' className='flex flex-col p-5'>
              <p>HOLA MUNDO</p>
            </div>
          </div>
        </div>
      </ScreenContent>
    </>
  );
}
