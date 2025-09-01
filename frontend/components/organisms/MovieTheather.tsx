'use client';
import { LineTheather, MovieTheather } from '@/types';
import { nanoid } from 'nanoid';
import React, { createContext, useContext } from 'react';
import { Seat } from '../atoms';

interface MovieTheaterValue {
  theather: MovieTheather;
}
export interface MovieTheaterProps extends MovieTheaterValue {
  children?: React.ReactNode;
}

const MovieTheatherContext = createContext<MovieTheaterValue>({
  theather: {} as MovieTheather,
});
export const MovieTheater = ({ theather, children }: MovieTheaterProps) => {
  return (
    <MovieTheatherContext.Provider value={{ theather }}>
      <div className='flex flex-row gap-10'>{children}</div>
    </MovieTheatherContext.Provider>
  );
};

const MovieTheaterSide = ({
  lines,
  isReverse,
}: {
  lines: LineTheather[];
  isReverse?: boolean;
}) => {
  const { theather } = useContext(MovieTheatherContext);
  return (
    <div
      className={`flex items-center gap-5 ${isReverse ? 'flex-row-reverse' : 'flex-row'}`}
    >
      <div className='flex flex-row'>
        {lines.map(line => (
          <Seat key={nanoid()} size='large' state={line.state} />
        ))}
      </div>
      <MovieTheaterTitle title={theather.row} />
    </div>
  );
};

const MovieTheaterTitle = ({ title }: { title: string }) => {
  return <h1 className='text-movie-white font-caros text-lg w-5'>{title}</h1>;
};

MovieTheater.MovieSection = MovieTheaterSide;
