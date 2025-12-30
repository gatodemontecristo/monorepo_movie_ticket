import React from 'react';

interface TitleTicketProps {
  title: string;
}
export const TitleTicket = ({ title }: TitleTicketProps) => {
  return (
    <p className='font-mont text-movie-white text-xl uppercase font-bold'>
      {title}
    </p>
  );
};
