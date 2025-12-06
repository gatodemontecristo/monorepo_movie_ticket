'use client';

import {
  BackgroundContent,
  BackgroundGradient,
  ButtonHome,
  ButtonPay,
  HourSchedule,
  MovieTheater,
  SadLine,
  ScreenContent,
  SeatLegend,
  SelectCountry,
} from '@/components';
import ReviewPanel from '@/components/organisms/ReviewPanel';
import { TIMES_SCHEDULE } from '@/constants';
import { useMovieDetails, useMovieTheater } from '@/hooks';
import { getDays } from '@/utils';
import { nanoid } from 'nanoid';
import { notFound } from 'next/navigation';
import React, { useEffect, useState } from 'react';
interface Props {
  params: Promise<{ id: number }>;
}

export default function MovieTicketPage({ params }: Props) {
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
  const {
    state,
    dispatch,
    isLoading: isLoadingTheater,
  } = useMovieTheater(634649);

  if (error) {
    notFound();
  }

  const days = getDays();

  return (
    <>
      <ScreenContent
        isLoading={isLoading || isLoadingTheater || !movieId}
        outside
      >
        <BackgroundContent
          key={nanoid()}
          title={movie?.title || 'Movie Image'}
          imgPath={movie?.backdrop_path || ''}
          className='bg-black/70 '
          classDiv='absolute'
        ></BackgroundContent>
        <div className='relative text-movie-white pt-[100px] w-full flex items-center flex-row z-10'>
          <div className='flex flex-col gap-2 w-1/4 items-end'>
            <div className='flex flex-col gap-2 items-start justify-center w-[90%]'>
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
              <HourSchedule hours={TIMES_SCHEDULE} title='Time' />
              {movie && (
                <ReviewPanel movie={movie}>
                  <ReviewPanel.Title size='text-xl' className='text-red-500' />
                  <div className='w-[80%]'>
                    <ReviewPanel.Poster />
                  </div>
                  <ReviewPanel.Other />
                  <ReviewPanel.Extra />
                </ReviewPanel>
              )}
            </div>
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
            <SeatLegend />
          </div>
          <div className='flex flex-col w-1/4 relative'>
            <div className='aux-container bg-movie-grey flex flex-col px-10 pt-8 pb-10 w-[90%] items-center rounded-lg gap-2'>
              <p className='font-mont text-movie-white text-xl uppercase font-bold'>
                Tickets
              </p>
              <div className='w-full border-t border-1 border-movie-white border-dashed my-2'></div>
              <div className='text-movie-white flex flex-row justify-between w-full font-mont text-sm font-bold'>
                <p>PVR</p>
                <p>Mumbai</p>
              </div>
              <div className='text-movie-white flex flex-row justify-between w-full font-mont text-sm'>
                <div className='flex flex-col'>
                  <p>Friday</p>
                  <p className='text-xs italic'>09:00 AM</p>
                </div>
                <p>21 July, 2023</p>
              </div>
              <div className='text-movie-white flex flex-row justify-between w-full font-mont text-sm font-semibold'>
                <p>Row</p>
                <p>Seat</p>
                <p>Price</p>
              </div>
              <div className='text-movie-white flex flex-row justify-between w-full font-mont text-sm'>
                <p>G</p>
                <p>5</p>
                <p>180</p>
              </div>
              <div className='text-movie-white flex flex-row justify-between w-full font-mont text-sm'>
                <p>G</p>
                <p>5</p>
                <p>180</p>
              </div>
              <div className='w-full border-t border-1 border-movie-white border-dashed my-2'></div>
              <div className='text-movie-white flex flex-row justify-between w-full font-mont text-sm font-semibold'>
                <p>Total</p>
                <p>360</p>
              </div>
            </div>
            <div
              className='aux-container-2 bg-movie-grey flex flex-col  w-[90%] items-center
             rounded-lg'
            >
              <ButtonPay className='w-full' text='Go to pay' />
            </div>
          </div>
        </div>
        <div className='relative flex flex-row w-full items-center justify-center my-5 z-50'>
          <ButtonHome type='filled' />
        </div>
        <BackgroundGradient shadowSize='md'></BackgroundGradient>
      </ScreenContent>
    </>
  );
}
