'use client';
import React, { createContext, useContext } from 'react';
import { FaRegCalendar } from 'react-icons/fa6';
import { IoLanguage } from 'react-icons/io5';

import { IconText, TagRate } from '../atoms';
import { MovieGenres, MovieScore } from '../molecules';
import { Movie } from '@/types/tmdb';
import { formatScore } from '@/utils';

interface MainContextValue {
  movie: Movie;
}

interface MainInfoProps extends MainContextValue {
  children?: React.ReactNode;
}
const MainContext = createContext<MainContextValue>({
  movie: {} as Movie,
});

const MainInfo = ({ children, movie }: MainInfoProps) => {
  return (
    <MainContext.Provider value={{ movie }}>
      <div className='flex flex-col gap-4 w-1/2  justify-start text-left mb-6'>
        {children}
      </div>
    </MainContext.Provider>
  );
};

const MainInfoHeader = () => {
  const { movie } = useContext(MainContext);
  return (
    <h2 className='text-6xl  font-bold  font-mont line-clamp-3 overflow-hidden text-ellipsis'>
      {movie.title}
    </h2>
  );
};

const MainOtherInfo = () => {
  const { movie } = useContext(MainContext);
  return (
    <div className='flex flex-row gap-4 text-sm font-caros text-white'>
      <MovieGenres movie={movie} />
      <IconText text={String(new Date(movie.release_date).getFullYear())}>
        <FaRegCalendar className='text-movie-yellow' />
      </IconText>
      <IconText text={movie.original_language}>
        <IoLanguage className='text-movie-yellow' />
      </IconText>
    </div>
  );
};

const MainQualification = () => {
  const { movie } = useContext(MainContext);
  return (
    <div className='flex flex-row  gap-4  text-sm'>
      <MovieScore score={formatScore(movie.vote_average)}></MovieScore>
      <TagRate rating={movie.adult ? 'R' : 'PG-13'}></TagRate>
    </div>
  );
};

const MainButtons = ({ children }: { children?: React.ReactNode }) => {
  return <div className='flex flex-row  gap-2 text-sm'>{children}</div>;
};

MainInfo.Header = MainInfoHeader;
MainInfo.OtherInfo = MainOtherInfo;
MainInfo.Qualification = MainQualification;
MainInfo.Buttons = MainButtons;

export default MainInfo;
