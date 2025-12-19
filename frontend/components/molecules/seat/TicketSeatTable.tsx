import { InfoRow, NotSeats } from '@/components/atoms';
import { SEAT_PRICE } from '@/constants';
import { MovieTheather } from '@/types';
import { nanoid } from 'nanoid';
import React from 'react';

interface TicketSeatTableProps {
  isEmpty: boolean;
  state: MovieTheather[];
}
export const TicketSeatTable = ({ state, isEmpty }: TicketSeatTableProps) => {
  return (
    <>
      <InfoRow
        isHeader={true}
        fistData='Row'
        secondData='Seat'
        thirdData='Price'
      />
      {isEmpty ? (
        <NotSeats />
      ) : (
        state.map(theater =>
          theater.lines.every(line => line.state !== 'selected') &&
          theater.other_lines.every(
            other_line => other_line.state !== 'selected',
          ) ? null : (
            <div key={nanoid()} className='w-full flex flex-col gap-0'>
              {theater.lines
                .filter(line => line.state === 'selected')
                .map(line => (
                  <div
                    className='text-movie-white flex flex-row justify-between w-full font-mont text-sm'
                    key={nanoid()}
                  >
                    <p>{theater.row}</p>
                    <p>{line.number}</p>
                    <p>{SEAT_PRICE}</p>
                  </div>
                ))}
              {theater.other_lines
                .filter(other_line => other_line.state === 'selected')
                .map(other_line => (
                  <div
                    className='text-movie-white flex flex-row justify-between w-full font-mont text-sm'
                    key={nanoid()}
                  >
                    <p>{theater.row}</p>
                    <p>{other_line.number}</p>
                    <p>{SEAT_PRICE}</p>
                  </div>
                ))}
            </div>
          ),
        )
      )}
    </>
  );
};
