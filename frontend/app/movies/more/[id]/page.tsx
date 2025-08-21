'use client';

import React from 'react';
import { useMovieMoreDetails } from '@/hooks/useMovies';
import { nanoid } from 'nanoid';
import {
  BackgroundContent,
  ButtonHome,
  CastCarousel,
  ScreenContent,
} from '@/components';
import MoreSection from '@/components/organisms/MoreSection';

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

  const { movie, credits, error, isLoading } = useMovieMoreDetails(
    movieId || 0,
  );

  // Error state
  if (error || !movie) {
    return (
      <div className='flex items-center justify-center h-screen w-screen bg-movie-black'>
        <div className='text-movie-white text-xl'>
          Error loading movie details
        </div>
      </div>
    );
  }

  return (
    <>
      <ScreenContent isLoading={isLoading || !movieId}>
        <BackgroundContent
          key={nanoid()}
          title={movie?.title || 'Movie Image'}
          imgPath={movie.backdrop_path || ''}
        >
          {movie && credits && (
            <MoreSection {...{ movie, credits }}>
              <MoreSection.MoreSectionMain />
              <MoreSection.MoreSectionDetail />
            </MoreSection>
          )}
        </BackgroundContent>
      </ScreenContent>
      {credits?.cast && credits.cast.length > 0 && (
        <div className='bg-movie-black py-16 px-8'>
          <div className='max-w-7xl mx-auto'>
            <CastCarousel cast={credits.cast.slice(0, 20)} title='Cast' />
          </div>
        </div>
      )}
      <ButtonHome></ButtonHome>
    </>
  );
}
