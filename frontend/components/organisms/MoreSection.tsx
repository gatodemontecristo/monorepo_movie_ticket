'use client';
import React, { createContext, useContext } from 'react';
import { SecondaryInfo } from './SecondaryInfo';
import { ButtonMovie, InfoLabel } from '../atoms';
import { MovieScore } from '../molecules';
import { Credits, MovieDetails } from '@/types';
import { nanoid } from 'nanoid';

interface MoreSectionValue {
  movie: MovieDetails;
  credits: Credits;
}
export interface MoreSectionProps extends MoreSectionValue {
  children?: React.ReactNode;
}

const MoreSectionContext = createContext<MoreSectionValue>({
  movie: {} as MovieDetails,
  credits: {} as Credits,
});

const MoreSection = ({ movie, credits, children }: MoreSectionProps) => {
  return (
    <MoreSectionContext.Provider value={{ movie, credits }}>
      <div className='absolute inset-0 flex items-center justify-around text-movie-white'>
        {children}
      </div>
    </MoreSectionContext.Provider>
  );
};

const MoreSectionMain = () => {
  const { movie } = useContext(MoreSectionContext);
  return (
    <SecondaryInfo className=' text-left text-sm' width='part'>
      <h1 className='text-6xl font-caros font-bold mb-4 line-clamp-3 overflow-hidden text-ellipsis'>
        {movie.title}
      </h1>
      <p className='text-lg font-mont max-w-4xl mx-auto line-clamp-7 overflow-hidden text-ellipsis'>
        {movie.overview}
      </p>
      <ButtonMovie type='filled' text='Book Tickets' />
    </SecondaryInfo>
  );
};

const MoreSectionDetail = () => {
  const { movie, credits } = useContext(MoreSectionContext);
  const moreInfo = [
    {
      subtext: 'Director',
      text: credits.crew.find(member => member.job === 'Director')?.name,
    },
    {
      subtext: 'Stars',
      text: credits.cast
        .slice(0, 5)
        .map(actor => actor.name)
        .join(', '),
    },
    {
      subtext: 'Genres',
      text: movie.genres.map(genre => genre.name).join(', '),
    },
    {
      subtext: 'Certification',
      text: movie.adult ? 'R' : 'PG-13',
    },
    {
      subtext: 'Countries',
      text: movie.production_countries.map(country => country.name).join(', '),
    },
    {
      subtext: 'Languages',
      text: movie.spoken_languages.map(lang => lang.name).join(', '),
    },
    {
      subtext: 'Duration',
      text: movie.runtime
        ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
        : '-',
    },
    {
      subtext: 'Release Date',
      text: movie.release_date,
    },
    {
      subtext: 'Vote Average',
      text: movie.vote_average.toString(),
    },
    {
      subtext: 'Sound',
      text: credits?.crew.find(member => member.job === 'Music')?.name,
    },
  ];
  return (
    <SecondaryInfo className=' text-right text-sm' width='part'>
      {moreInfo.map(info => (
        <InfoLabel {...info} key={nanoid()}></InfoLabel>
      ))}
      <InfoLabel text='' subtext='Score'>
        <MovieScore score={movie.vote_average}></MovieScore>
      </InfoLabel>
    </SecondaryInfo>
  );
};

MoreSection.MoreSectionMain = MoreSectionMain;
MoreSection.MoreSectionDetail = MoreSectionDetail;

export default MoreSection;
