'use client';

import React, { useEffect } from 'react';
import { ScreenContent } from '@/components/molecules/ScreenContent';
import { useMovieDetails, useTicketById, useSeatsByTicketId } from '@/hooks';
import { formatDateString } from '@/utils';
import Image from 'next/image';
import { NOT_FOUND_BACKGROUND } from '@/constants';
import { FaCalendar, FaHourglassStart } from 'react-icons/fa6';
import { TbClockHour10Filled } from 'react-icons/tb';
import { IoMdFilm } from 'react-icons/io';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import QRCode from 'react-qr-code';

export default function DetailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const idMovie = searchParams.get('idMovie');
  const userId = searchParams.get('userId');
  const ticketId = searchParams.get('ticketId');

  const {
    data: ticketData,
    error: ticketError,
    isLoading: isLoadingTicket,
  } = useTicketById(ticketId || '');

  // Hook para obtener asientos por ticket ID
  const {
    data: seatsData,
    error: seatsError,
    isLoading: isLoadingSeats,
  } = useSeatsByTicketId(ticketId || '');

  useEffect(() => {
    if (!idMovie || !userId || !ticketId || ticketError || seatsError) {
      router.push(
        `/login?error=${encodeURIComponent('Ticket format not found')}`,
      );
    }
  }, [idMovie, userId, ticketId, ticketError, seatsError]);
  const {
    data: movie,
    error: errorMovie,
    isLoading: isLoadingMovie,
  } = useMovieDetails(idMovie ? parseInt(idMovie) : 0);

  if (!movie || ticketError || errorMovie || !ticketData) {
    return <div>Movie not found</div>;
  }

  // Formatear asientos en el formato solicitado (D12, D13, D14)
  const formattedSeats =
    seatsData && seatsData.length > 0
      ? seatsData
          .map(
            seat => `${String.fromCharCode(65 + seat.row - 1)}${seat.column}`,
          )
          .join(', ')
      : 'No seats assigned';

  return (
    <ScreenContent
      isLoading={
        isLoadingMovie ||
        !idMovie ||
        !userId ||
        !ticketId ||
        isLoadingTicket ||
        isLoadingSeats
      }
      outside
    >
      <div className='min-h-screen bg-movie-black p-8 mt-24 flex flex-col items-center gap-4'>
        <div className='bg-movie-white md:w-1/3 w-full rounded-3xl p-4 flex flex-col'>
          <Image
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
                : NOT_FOUND_BACKGROUND
            }
            alt={movie.title}
            width={700}
            height={450}
            className='w-full h-auto object-cover rounded-3xl  transition-transform duration-500 ease-out group-hover:scale-110'
            priority
          />
          <div className='flex flex-col md:p-6 p-2 w-full'>
            <div className='text-movie-black font-caros flex flex-row gap-1 items-center justify-center md:text-4xl text-3xl font-semibold line-clamp-3 overflow-hidden text-ellipsis mb-4'>
              <p>{movie.title}</p>{' '}
              <span className='md:text-lg text-base'>(#{movie.id})</span>
            </div>
            <div className='flex flex-row justify-between items-center md:text-lg text-sm'>
              <div className='flex flex-col  items-start'>
                <p className='flex flex-row items-center gap-1'>
                  <FaCalendar size={20} /> Date
                </p>
                <p>{formatDateString(ticketData.day)}</p>
              </div>
              <div className='flex flex-col items-start'>
                <p className='flex flex-row items-center gap-1'>
                  <TbClockHour10Filled size={20} /> Hour
                </p>
                <p>{ticketData.hour.toLocaleUpperCase()}</p>
              </div>
              <div className='flex flex-col  items-start'>
                <p className='flex flex-row items-center gap-1'>
                  <FaHourglassStart size={16} /> Duration
                </p>
                <p>{`${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`}</p>
              </div>
              <div className='flex flex-col items-start'>
                <p className='flex flex-row items-center gap-1'>
                  <IoMdFilm size={20} /> Rating
                </p>
                <p>{movie.adult ? 'R' : 'PG-13'}</p>
              </div>
            </div>
            <div className='flex flex-row md:text-lg text-base mt-4 '>
              <div className='flex flex-col items-start w-1/3 p-2'>
                <p>Seats</p>
                <p className='md:text-2xl text-xl font-bold'>
                  {formattedSeats}
                </p>
              </div>
              <div className='flex flex-col w-2/3 border-s-3 border-dashed border-movie-grey p-2 px-5 justify-start items-start'>
                <p>QR code generated</p>
                <QRCode
                  size={140}
                  value={`http://localhost:3009/movies/detail?idMovie=${idMovie}&userId=${userId}&ticketId=${ticketId}`}
                />
              </div>
            </div>
            <div className='flex flex-col text-lg mt-4 '>
              <p className='font-mont text-movie-grey leading-none md:text-[15px] text-[12px] text-justify'>
                {movie.overview}
              </p>
              <p className='font-mont text-movie-grey leading-none md:text-[14px] text-[12px] text-center mt-6'>
                {ticketData.idticket}
              </p>
            </div>
          </div>
        </div>
      </div>
    </ScreenContent>
  );
}
