import React, { createContext, useContext } from 'react';
import { FaRegCalendar } from 'react-icons/fa6';
import { TbClockHour2 } from 'react-icons/tb';
import { TagRate } from '../atoms';
import { MovieScore } from '../molecules';
import { Movie } from '@/types/tmdb';

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
      <div className='flex flex-col gap-4 w-1/2  justify-start text-left'>
        {children}
      </div>
    </MainContext.Provider>
  );
};

const MainInfoHeader = () => {
  const { movie } = useContext(MainContext);
  return <h2 className='text-6xl  font-bold  font-mont'>{movie.title}</h2>;
};

const MainOtherInfo = () => {
  const { movie } = useContext(MainContext);
  return (
    <div className='flex flex-row gap-4 text-sm'>
      <p>{movie.genre_ids.map(genre => genre).join(', ')}</p>
      <div className='flex flex-row gap-1 items-center'>
        <FaRegCalendar className='text-movie-yellow' />
        <p>{new Date(movie.release_date).getFullYear()}</p>
      </div>
      <div className='flex flex-row gap-1 items-center'>
        <TbClockHour2 className='text-movie-yellow' />
        <p>{movie.original_language}</p>
      </div>
    </div>
  );
};

const MainQualification = () => {
  const { movie } = useContext(MainContext);
  return (
    <div className='flex flex-row  gap-4  text-sm'>
      <MovieScore score={movie.popularity}></MovieScore>
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
