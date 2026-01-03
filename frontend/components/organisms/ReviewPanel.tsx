'use client';

import { MovieDetails } from '@/types';
import Image from 'next/image';
import React, { createContext, useContext } from 'react';
import { MovieGenres, MovieScore } from '../molecules';
import { IconText, InfoBox, TagRate } from '../atoms';
import { FaRegCalendar } from 'react-icons/fa6';

import { IoLanguage } from 'react-icons/io5';
import { formatScore, reviewFeature } from '@/utils';
import { nanoid } from 'nanoid';
import { NOT_FOUND_POSTER } from '@/constants';

interface ReviewContextValue {
  movie: MovieDetails;
}

interface ReviewPanelProps extends ReviewContextValue {
  children?: React.ReactNode;
}
const ReviewContext = createContext<ReviewContextValue>({
  movie: {} as MovieDetails,
});

const ReviewPanel = ({ children, movie }: ReviewPanelProps) => {
  return (
    <ReviewContext.Provider value={{ movie }}>
      <div className='flex flex-col gap-4 justify-center items-center w-80 p-3'>
        {children}
      </div>
    </ReviewContext.Provider>
  );
};

const ReviewTitle = ({
  size = 'text-3xl',
  className,
}: {
  size?: string;
  className?: string;
}) => {
  const { movie } = useContext(ReviewContext);
  return (
    <p
      className={`w-full ${size} font-mont font-medium text-movie-white text-center line-clamp-3 overflow-hidden text-ellipsis ${className}`}
    >
      {movie.title}
    </p>
  );
};

const ReviewPoster = () => {
  const { movie } = useContext(ReviewContext);
  return (
    <Image
      src={
        movie.poster_path
          ? `https://image.tmdb.org/t/p/w1280${movie.poster_path}`
          : NOT_FOUND_POSTER
      }
      alt='Movie Poster'
      width={500}
      height={750}
      className='w-full h-auto object-cover '
      priority
    />
  );
};

const ReviewOtherInfo = () => {
  const { movie } = useContext(ReviewContext);
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

const ReviewExtraInfo = () => {
  const { movie } = useContext(ReviewContext);
  return (
    <div className='flex flex-row  gap-4  text-sm'>
      <MovieScore score={formatScore(movie.vote_average)}></MovieScore>
      <TagRate rating={movie.adult ? 'R' : 'PG-13'}></TagRate>
    </div>
  );
};

const ReviewBox = () => {
  const { movie } = useContext(ReviewContext);
  return (
    <>
      {reviewFeature(movie).map(feature => (
        <InfoBox
          key={nanoid()}
          number={feature.number}
          text={feature.text}
          color={feature.color}
        />
      ))}
    </>
  );
};

ReviewPanel.Title = ReviewTitle;
ReviewPanel.Poster = ReviewPoster;
ReviewPanel.Other = ReviewOtherInfo;
ReviewPanel.Extra = ReviewExtraInfo;
ReviewPanel.Box = ReviewBox;

export default ReviewPanel;
