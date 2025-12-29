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
import { useRouter, useSearchParams } from 'next/navigation';
import { TIMES_SCHEDULE } from '@/constants';
import {
  useCurrentUser,
  useMovieDetails,
  useMovieTheater,
  useCreateTicket,
  useCreateMultipleSeats,
} from '@/hooks';
import { useTheaterStore } from '@/store';
import {
  getCountryName,
  getCountSeatsSelected,
  getNotAvailableWSeats,
  getTotal,
} from '@/utils';
import { nanoid } from 'nanoid';
import { notFound } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Notyf } from 'notyf';
interface Props {
  params: Promise<{ id: number }>;
}

export default function MovieTicketPage({ params }: Props) {
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
  const [country, setCountry] = useState('US');
  const [movieId, setMovieId] = useState<number | null>(null);
  const [isLoadingService, setIsLoadingService] = useState(false);

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

  const { data: movie, error, isLoading } = useMovieDetails(movieId || 0);
  const {
    state,
    dispatch,
    isLoading: isLoadingTheater,
  } = useMovieTheater(movieId || 0);

  // Hooks for creating ticket and seats
  const createTicketMutation = useCreateTicket();
  const createMultipleSeatsMutation = useCreateMultipleSeats();

  // Function to handle the payment process
  const handlePayment = async () => {
    setIsLoadingService(true);
    const notyf = new Notyf();

    try {
      if (!currentUser) {
        notyf.error('User not authenticated');
        return;
      }

      if (!movie) {
        notyf.error('Movie information not available');
        return;
      }

      // Get selected day
      const selectedDay = days.find(day => day.highlight);
      if (!selectedDay) {
        notyf.error('Please select a day');
        return;
      }

      // Validate that there's a selected time
      if (!hourSelected) {
        notyf.error('Please select a time');
        return;
      }

      // Get selected seats
      const selectedSeats: Array<{ row: string; number: number }> = [];
      state.forEach(theater => {
        theater.lines.forEach(line => {
          if (line.state === 'selected') {
            selectedSeats.push({ row: theater.row, number: line.number });
          }
        });
        theater.other_lines.forEach(other_line => {
          if (other_line.state === 'selected') {
            selectedSeats.push({ row: theater.row, number: other_line.number });
          }
        });
      });

      if (selectedSeats.length === 0) {
        notyf.error('Please select at least one seat');
        return;
      }

      // Prepare ticket data
      const ticketData = {
        iduser: currentUser.id,
        idmovie: movie.id,
        price: parseFloat(getTotal(state)),
        day: selectedDay.date.toISOString().split('T')[0], // YYYY-MM-DD format
        hour: hourSelected,
        location: getCountryName(country),
        movieName: movie.title,
      };

      // 1. Create the ticket
      const createdTicket = await createTicketMutation.mutateAsync(ticketData);

      // 2. Prepare seat positions (convert row string to number)

      const seatPositions = selectedSeats.map(seat => {
        // Convert row letter to number (A=1, B=2, etc.)
        const rowNumber = seat.row.charCodeAt(0) - 64;
        return {
          row: rowNumber,
          column: seat.number,
        };
      });

      // 3. Create multiple seats
      await createMultipleSeatsMutation.mutateAsync({
        ticketId: createdTicket.idticket,
        seatPositions: seatPositions,
      });
      // 4. Redirect to history with success message
      router.push(
        `/movies/history?message=${encodeURIComponent('Ticket and seats created successfully!')}`,
      );
    } catch (error) {
      notyf.error('Failed to create ticket. Please try again.');
    } finally {
      setIsLoadingService(false);
    }
  };

  if (error) {
    notFound();
  }

  const { days, hourSelected, setHourSelected } = useTheaterStore();
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
                text={disableButton ? 'Disabled :(' : 'Go to pay'}
                isLoading={isLoadingService}
                disabled={disableButton}
                onClick={handlePayment}
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
