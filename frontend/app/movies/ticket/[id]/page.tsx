'use client';

import {
  BackgroundContent,
  BackgroundGradient,
  ButtonHome,
  ButtonPay,
  DaySelected,
  HourSchedule,
  MovieTheater,
  SadLine,
  ScreenContent,
  SeatLegend,
  SelectCountry,
  TicketSeatTable,
} from '@/components';
import ReviewPanel from '@/components/organisms/ReviewPanel';
import { TIMES_SCHEDULE } from '@/constants';
import { useMovieDetails, useMovieTheater } from '@/hooks';
import { useTheaterStore } from '@/store';
import { getCountryName, getNotAvailableWSeats, getTotal } from '@/utils';
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
  const { days, hourSelected, setHourSelected } = useTheaterStore();
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
              <DaySelected />
              <HourSchedule
                hours={TIMES_SCHEDULE}
                title='Time'
                selected={hourSelected}
                onSelect={setHourSelected}
              />
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
          <div className='flex flex-col w-1/4 relative justify-start items-start'>
            <div className='aux-container bg-movie-grey flex flex-col px-10 pt-8 pb-10 w-[90%] items-center rounded-lg gap-2'>
              <p className='font-mont text-movie-white text-xl uppercase font-bold'>
                Tickets
              </p>
              <div className='w-full border-t border-1 border-movie-white border-dashed my-2'></div>
              <div className='text-movie-white flex flex-row justify-between w-full font-mont text-sm font-bold'>
                <p>PVR</p>
                <p>{getCountryName(country)}</p>
              </div>
              <div className='text-movie-white flex flex-row justify-between w-full font-mont text-sm'>
                <div className='flex flex-col'>
                  <p>{days.find(day => day.highlight)?.dayOfWeek}</p>
                  <p className='text-xs italic'>
                    {hourSelected || 'No time available'}
                  </p>
                </div>
                <p>{days.find(day => day.highlight)?.format}</p>
              </div>

              <TicketSeatTable
                isEmpty={getNotAvailableWSeats(state)}
                state={state}
              />
              <div className='w-full border-t border-1 border-movie-white border-dashed my-2'></div>
              <div className='text-movie-white flex flex-row justify-between w-full font-mont text-sm font-semibold'>
                <p>Total</p>
                <p>${getTotal(state)}</p>
              </div>
            </div>
            <div
              className='aux-container-2 bg-movie-grey flex flex-col  w-[90%] items-center
             rounded-lg'
            >
              <ButtonPay
                className='w-full'
                text={
                  hourSelected === '' || getNotAvailableWSeats(state)
                    ? 'Disabled :('
                    : 'Go to pay'
                }
                disabled={hourSelected === '' || getNotAvailableWSeats(state)}
              />
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
