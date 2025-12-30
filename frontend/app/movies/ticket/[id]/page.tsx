'use client';

import {
  BackgroundContent,
  BackgroundGradient,
  ButtonHome,
  ButtonPay,
  DaySelected,
  FormTicketMain,
  HourSchedule,
  MovieTheater,
  SadLine,
  ScreenContent,
  SeatLegend,
  SelectCountry,
  TicketSeatTable,
} from '@/components';
import ReviewPanel from '@/components/organisms/ReviewPanel';
import { useRouter, useSearchParams } from 'next/navigation';
import { TIMES_SCHEDULE } from '@/constants';
import { useCurrentUser, usePayment } from '@/hooks';
import { getCountSeatsSelected, getNotAvailableWSeats } from '@/utils';
import { nanoid } from 'nanoid';
import { notFound } from 'next/navigation';
import React, { useEffect } from 'react';
import { Notyf } from 'notyf';
interface Props {
  params: Promise<{ id: number }>;
}

export default function MovieTicketPage({ params }: Props) {
  const {
    handlePayment,
    isLoadingService,
    setMovieId,
    movieId,
    movie,
    error,
    isLoading,
    country,
    setCountry,
    state,
    isLoadingTheater,
    dispatch,
    days,
    hourSelected,
    setHourSelected,
  } = usePayment();

  const router = useRouter();
  const searchParams = useSearchParams();
  const successMessage = searchParams.get('message');
  useEffect(() => {
    if (successMessage) {
      const notyf = new Notyf();
      notyf.success(decodeURIComponent(successMessage));
    }
  }, [successMessage]);
  const currentUser = useCurrentUser();

  useEffect(() => {
    if (!currentUser && movieId) {
      router.push(
        `/login?ticketId=${movieId}&error=${encodeURIComponent('You must be logged in to book tickets')}`,
      );
    }
  }, [currentUser, router, movieId]);

  useEffect(() => {
    const resolveParams = async () => {
      const { id } = await params;
      setMovieId(Number(id));
    };
    resolveParams();
  }, [params]);

  if (error) {
    notFound();
  }

  const disableButton = hourSelected === '' || getNotAvailableWSeats(state);
  useEffect(() => {
    if (getCountSeatsSelected(state)) {
      const notyf = new Notyf();
      notyf.error(`You can select a maximum of 5 seats per booking.`);
    }
  }, [state]);
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
                  disable={getCountSeatsSelected(state)}
                >
                  <MovieTheater.MovieSection lines={theater.lines} isReverse />
                  <MovieTheater.MovieSection lines={theater.other_lines} />
                </MovieTheater>
              ))}
            </div>
            <SeatLegend />
          </div>
          <FormTicketMain
            country={country}
            hourSelected={hourSelected}
            days={days}
            state={state}
            button={
              <ButtonPay
                className='w-full'
                text={disableButton ? 'Disabled :(' : 'Go to pay'}
                isLoading={isLoadingService}
                disabled={disableButton}
                onClick={handlePayment}
              />
            }
          >
            <FormTicketMain.Title title='Tickets' />
            <FormTicketMain.Country title='PVR' />
            <FormTicketMain.InfoCountry />
            <TicketSeatTable
              isEmpty={getNotAvailableWSeats(state)}
              state={state}
            />
            <FormTicketMain.Total title='Total' />
          </FormTicketMain>
        </div>
        <div className='relative flex flex-row w-full items-center justify-center my-5 z-50'>
          <ButtonHome type='filled' />
        </div>
        <BackgroundGradient shadowSize='md'></BackgroundGradient>
      </ScreenContent>
    </>
  );
}
