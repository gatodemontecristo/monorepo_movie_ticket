import { Movie } from '@/types';
import React from 'react';
import MainInfo from '../organisms/MainInfo';
import { ButtonMovie, InfoLabel } from '../atoms';
import { SecondaryInfo } from '../organisms';

export const InfoMovieTemplate = ({ movie }: { movie: Movie }) => {
  return (
    <div className='absolute flex flex-row bottom-0 w-full justify-evenly items-baseline-last text-center px-0 py-8 mb-5 gap-10 text-white'>
      <MainInfo movie={movie}>
        <MainInfo.Header />
        <MainInfo.OtherInfo />
        <MainInfo.Qualification />
        <MainInfo.Buttons>
          <ButtonMovie type='filled' text='Book Tickets' />
          <ButtonMovie type='outlined' text='Review' />
          <ButtonMovie type='outlined' text='More' />
        </MainInfo.Buttons>
      </MainInfo>

      <SecondaryInfo className=' text-right text-sm' width='part'>
        <InfoLabel text={movie.original_title} subtext='Original title' />
        <InfoLabel text={movie.popularity.toString()} subtext='Popularity' />
        <InfoLabel text={movie.overview} />
      </SecondaryInfo>
    </div>
  );
};
