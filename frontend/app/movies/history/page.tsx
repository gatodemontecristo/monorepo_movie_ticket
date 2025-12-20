'use client';

import { useCurrentUser, useTicketsByUserId } from '@/hooks';
import { formatDateString, splitDateTime } from '@/utils';
import { nanoid } from 'nanoid';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaCalendar, FaLocationDot } from 'react-icons/fa6';

export default function HistoryPage() {
  const router = useRouter();

  const currentUser = useCurrentUser();
  useEffect(() => {
    if (!currentUser) {
      router.push(`/login?origin=history`);
    }
  }, [currentUser, router]);
  const {
    data: userTickets,
    isLoading,
    error,
  } = useTicketsByUserId(currentUser?.id || '');
  if (isLoading) {
    return (
      <div className='min-h-screen bg-movie-black p-8 mt-20 flex items-center justify-center'>
        <p className='text-movie-white font-mont text-xl'>Loading tickets...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen bg-movie-black p-8 mt-20 flex items-center justify-center'>
        <p className='text-movie-white font-mont text-xl'>
          Error loading tickets
        </p>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-movie-black p-8 mt-20 flex flex-col items-center'>
      <h1 className='text-movie-white font-caros text-3xl font-bold mb-8'>
        My Ticket History
      </h1>

      {userTickets && userTickets.length > 0 ? (
        <div className='flex flex-col w-full items-center gap-6'>
          {userTickets.map(ticket => (
            <div
              key={nanoid()}
              className='flex flex-row w-1/3 h-[170px] aux-container3'
            >
              <div className='bg-movie-yellow w-1/5 p-4 flex flex-col items-center justify-center'>
                <p className='[writing-mode:vertical-lr] rotate-180  text-rotate-0 text-2xl  text-white font-bold font-caros'>
                  {ticket.movieName}
                </p>
              </div>
              <div className='bg-white w-4/5 p-4 flex flex-row justify-between'>
                <div className='flex flex-col justify-between'>
                  <div className='flex flex-col'>
                    <div className='text-movie-black font-caros text-3xl font-bold flex items-center gap-2'>
                      <FaLocationDot size={24} />
                      <p>{ticket.location}</p>
                    </div>
                    <div className='text-movie-black ml-1 font-caros text-lg flex flex-row items-center gap-2'>
                      <FaCalendar size={16} />
                      <p>
                        {formatDateString(ticket.day)} •{' '}
                        {ticket.hour.toUpperCase()}
                      </p>
                    </div>
                  </div>

                  <p className='text-xs text-movie-grey font-mont mt-5'>
                    {ticket.idticket}
                  </p>
                </div>
                <div className='flex flex-col justify-between items-center mr-4'>
                  <div className='flex flex-row gap-2 items-center'>
                    <p className='text-green-400 font-caros text-xl font-bold'>
                      Pending
                    </p>
                    <div
                      className={
                        'h-3 w-3 rounded-full animate-pulse bg-green-400'
                      }
                    ></div>
                  </div>
                  <div className='text-movie-grey font-mont text-xs flex flex-col items-center'>
                    <p>Created at:</p>
                    <p>{splitDateTime(ticket.createdAt || '').date}</p>
                    <p>{splitDateTime(ticket.createdAt || '').time}</p>
                  </div>
                </div>
              </div>
            </div>
            //   <TicketCard
            //     key={ticket.idticket}
            //     movieTitle={ticket.movieName}
            //     showTime={ticket.hour}
            //     date={new Date(ticket.day).toLocaleDateString('en-US', {
            //       month: 'short',
            //       day: 'numeric',
            //       year: 'numeric',
            //     })}
            //     theater={ticket.location}
            //     seat='--' // El asiento no viene en el ticket base
            //     price={`$${ticket.price.toFixed(2)}`}
            //     ticketNumber={`#${ticket.idticket?.slice(0, 8) || 'TK000000'}`}
            //   />
          ))}
        </div>
      ) : (
        <div className='text-center py-12'>
          <p className='text-movie-white/70 font-mont text-lg'>
            No tickets found. Start booking your first movie!
          </p>
        </div>
      )}

      {/* Ticket Structure Reference */}
      {/* "idticket": "",
        "price": 41.98,
        "movieName": "Zootopia 2",
        "idmovie": 1084242,
        "iduser": "78f84b36-dfae-4bc5-bed4-11460f34b35c",
        "day": "2025-12-18",
        "hour": "22:45 pm",
        "location": "United States",
        "createdAt": "2025-12-18T03:32:52.754Z",
        "updatedAt": "2025-12-18T03:32:52.754Z" */}
    </div>
  );
}
