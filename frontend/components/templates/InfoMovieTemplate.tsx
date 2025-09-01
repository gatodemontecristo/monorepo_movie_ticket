'use client';
import { Movie } from '@/types';
import React from 'react';
import { ButtonMovie, InfoLabel } from '../atoms';
import Link from 'next/link';
import { SecondaryInfo } from '../organisms';
import MainInfo from '../organisms/MainInfo';
import { usePathname } from 'next/navigation';

export const InfoMovieTemplate = ({ movie }: { movie: Movie }) => {
  const pathname: string = usePathname();

  return (
    <div className='absolute flex flex-row bottom-0 w-full justify-evenly items-baseline-last text-center px-0 py-8 mb-5 gap-10 text-white'>
      <MainInfo movie={movie}>
        <MainInfo.Header />
        <MainInfo.OtherInfo />
        <MainInfo.Qualification />
        <MainInfo.Buttons>
          <Link
            href={{
              pathname: `movies/ticket/${movie.id}`,
              query: { from: `${pathname}` },
            }}
          >
            <ButtonMovie type='filled' text='Book Tickets' />
          </Link>
          <Link
            href={{
              pathname: `movies/review/${movie.id}`,
              query: { from: `${pathname}` },
            }}
          >
            <ButtonMovie type='outlined' text='Review' />
          </Link>
          <Link
            href={{
              pathname: `movies/more/${movie.id}`,
              query: { from: `${pathname}` },
            }}
          >
            <ButtonMovie type='outlined' text='More' />
          </Link>
        </MainInfo.Buttons>
      </MainInfo>

      <SecondaryInfo className=' text-right text-sm' width='part'>
        <InfoLabel text={movie.original_title} subtext='Original title' />
        <InfoLabel
          text={movie.popularity.toFixed(2).toString()}
          subtext='Popularity'
        />
        <InfoLabel text={movie.overview} />
      </SecondaryInfo>
    </div>
  );
};
