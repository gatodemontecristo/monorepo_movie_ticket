import { useCurrentUser } from '@/hooks';
import { Ticket } from '@/types';
import { formatDateString, getTicketStatus, splitDateTime } from '@/utils';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaCalendar, FaLocationDot } from 'react-icons/fa6';
import { MdNavigateNext } from 'react-icons/md';

interface TicketHistoryProps {
  ticket: Ticket;
}
export const TicketHistory = ({ ticket }: TicketHistoryProps) => {
  const router = useRouter();
  const currentUser = useCurrentUser();
  const status = getTicketStatus(ticket);
  const statusColor =
    status === 'Pending' ? 'text-green-400' : 'text-movie-grey';
  const statusBgColor = status === 'Pending' ? 'bg-green-400' : 'bg-movie-grey';

  const handleClick = () => {
    router.push(
      `/movies/detail?idMovie=${ticket.idmovie}&userId=${currentUser?.id}&ticketId=${ticket.idticket}`,
    );
  };

  return (
    <div
      className='group relative flex flex-row md:w-2/5 w-full md:h-[170px] h-[200px] aux-container3 cursor-pointer
             transition-transform duration-300 ease-out hover:-translate-x-5'
      onClick={handleClick}
    >
      <div className='bg-movie-yellow w-1/5 p-4 flex flex-col items-center justify-center'>
        <p className='[writing-mode:vertical-rl] rotate-180  text-rotate-0 md:text-2xl text-lg  text-white font-bold font-caros'>
          {ticket.movieName}
        </p>
      </div>
      <div className='bg-white w-4/5 md:p-4 p-3 flex flex-row justify-between'>
        <div className='flex flex-col justify-between'>
          <div className='flex flex-col'>
            <div className='text-movie-black font-caros md:text-3xl text-xl font-bold flex items-center gap-2'>
              <FaLocationDot size={24} />
              <p>{ticket.location}</p>
            </div>
            <div className='text-movie-black ml-1 font-caros md:text-lg text-base flex flex-row items-center gap-2'>
              <FaCalendar size={16} />
              <p>
                {formatDateString(ticket.day)} • {ticket.hour.toUpperCase()}
              </p>
            </div>
          </div>

          <p className='text-xs text-movie-grey font-mont mt-5'>
            {ticket.idticket}
          </p>
        </div>
        <div className='flex flex-col justify-between items-center mr-4'>
          <div className='flex flex-row gap-2 items-center'>
            <p
              className={`${statusColor} font-caros md:text-xl text-lg font-bold`}
            >
              {status}
            </p>
            <div
              className={`h-3 w-3 rounded-full ${status === 'Pending' ? 'animate-pulse' : ''} ${statusBgColor}`}
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
  );
};
