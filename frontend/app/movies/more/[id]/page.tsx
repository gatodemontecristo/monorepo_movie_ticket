'use client';

import React from 'react';
import { useMovieCredits, useMovieDetails } from '@/hooks/useMovies';
import { nanoid } from 'nanoid';
import { buildImageUrl, IMAGE_SIZES } from '@/config/tmdb';
import Image from 'next/image';
import { CastCarousel } from '@/components';
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

  const { data: movie, isLoading, error } = useMovieDetails(movieId || 0);
  const { data: credits } = useMovieCredits(movieId || 0);

  // Loading state
  if (isLoading || !movieId) {
    return (
      <div className='flex items-center justify-center h-screen w-screen bg-movie-black'>
        <div className='text-movie-white text-xl'>Loading movie details...</div>
      </div>
    );
  }

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
      <div className='relative overflow-hidden h-screen w-screen'>
        <div key={nanoid()} className='w-full flex-shrink-0 h-full relative'>
          {/* Background image */}
          <Image
            src={
              buildImageUrl(
                movie?.backdrop_path || '',
                IMAGE_SIZES.BACKDROP.LARGE,
              ) as string
            }
            alt={movie?.title || 'Movie Image'}
            fill
            className='object-cover'
            priority
          />

          {/* Overlay dark */}
          <div className='absolute inset-0 bg-black/30' />

          {movie && credits && (
            <MoreSection {...{ movie, credits }}>
              <MoreSection.MoreSectionMain />

              <MoreSection.MoreSectionDetail />
            </MoreSection>
          )}
        </div>
      </div>

      {/* Cast Section */}
      {credits?.cast && credits.cast.length > 0 && (
        <div className='bg-movie-black py-16 px-8'>
          <div className='max-w-7xl mx-auto'>
            <h2 className='text-4xl font-caros font-bold text-movie-white mb-8'>
              Cast
            </h2>
            <CastCarousel cast={credits.cast.slice(0, 20)} />
          </div>
        </div>
      )}
    </>
  );
}
