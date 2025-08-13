'use client';

import React from 'react';
import { useMovieCredits, useMovieDetails } from '@/hooks/useMovies';
import { nanoid } from 'nanoid';
import { buildImageUrl, IMAGE_SIZES } from '@/config/tmdb';
import Image from 'next/image';
import {
  ButtonMovie,
  InfoLabel,
  MovieScore,
  SecondaryInfo,
} from '@/components';

interface Props {
  params: Promise<{ id: number }>;
}

export default function MovieMorePage({ params }: Props) {
  const [movieId, setMovieId] = React.useState<number | null>(null);

  // Resolver los params de forma asíncrona
  React.useEffect(() => {
    const resolveParams = async () => {
      const { id } = await params;
      setMovieId(Number(id));
    };
    resolveParams();
  }, [params]);

  const { data, isLoading, error } = useMovieDetails(movieId || 0);
  const { data: creditsData } = useMovieCredits(movieId || 0);

  // Loading state
  if (isLoading || !movieId) {
    return (
      <div className='flex items-center justify-center h-screen w-screen bg-movie-black'>
        <div className='text-movie-white text-xl'>Loading movie details...</div>
      </div>
    );
  }

  // Error state
  if (error || !data) {
    return (
      <div className='flex items-center justify-center h-screen w-screen bg-movie-black'>
        <div className='text-movie-white text-xl'>
          Error loading movie details
        </div>
      </div>
    );
  }

  return (
    <div className='relative overflow-hidden h-screen w-screen'>
      <div key={nanoid()} className='w-full flex-shrink-0 h-full relative'>
        {/* Background image */}
        <Image
          src={
            buildImageUrl(
              data?.backdrop_path || '',
              IMAGE_SIZES.BACKDROP.LARGE,
            ) as string
          }
          alt={data?.title || 'Movie Image'}
          fill
          className='object-cover'
          priority
        />

        {/* Overlay dark */}
        <div className='absolute inset-0 bg-black/30' />

        {/* Content */}
        <div className='absolute inset-0 flex items-center justify-around text-movie-white'>
          <SecondaryInfo className=' text-left text-sm' width='part'>
            <h1 className='text-6xl font-caros font-bold mb-4'>{data.title}</h1>
            <p className='text-lg font-mont max-w-4xl mx-auto'>
              {data.overview}
            </p>
            <ButtonMovie type='filled' text='Book Tickets' />
          </SecondaryInfo>
          <SecondaryInfo className=' text-right text-sm' width='part'>
            <InfoLabel
              text={
                creditsData?.crew.find(member => member.job === 'Director')
                  ?.name || '-'
              }
              subtext='Director'
            />
            <InfoLabel
              text={
                creditsData?.cast
                  .slice(0, 5)
                  .map(actor => actor.name)
                  .join(', ') || '-'
              }
              subtext='Stars'
            />
            <InfoLabel
              text={data.genres.map(genre => genre.name).join(', ') || '-'}
              subtext='Genres'
            />
            <InfoLabel
              text={data.adult ? 'R' : 'PG-13'}
              subtext='Certification'
            />
            <InfoLabel
              text={
                data.production_countries
                  .map(country => country.name)
                  .join(', ') || '-'
              }
              subtext='Countries'
            />
            <InfoLabel
              text={
                data.spoken_languages.map(lang => lang.name).join(', ') || '-'
              }
              subtext='Languages'
            />
            <InfoLabel
              text={
                data.runtime
                  ? `${Math.floor(data.runtime / 60)}h ${data.runtime % 60}m`
                  : '-'
              }
              subtext='Duration'
            />
            <InfoLabel text={data.release_date || '-'} subtext='Release Date' />
            <InfoLabel
              text={data.vote_average.toString() || '-'}
              subtext='Vote Average'
            />
            <InfoLabel
              text={
                creditsData?.crew.find(member => member.job === 'Music')
                  ?.name || '-'
              }
              subtext='Sound'
            />
            <InfoLabel text='' subtext='Score'>
              <MovieScore score={data.vote_average}></MovieScore>
            </InfoLabel>
          </SecondaryInfo>
        </div>
      </div>
    </div>
  );
}
