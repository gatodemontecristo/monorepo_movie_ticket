'use client';
import { useMovieReviewDetails } from '@/hooks';
import Image from 'next/image';
import React from 'react';

interface Props {
  params: Promise<{ id: number }>;
}
export default function MovieMorePage({ params }: Props) {
  const [movieId, setMovieId] = React.useState<number | null>(null);

  React.useEffect(() => {
    const resolveParams = async () => {
      const { id } = await params;
      setMovieId(Number(id));
    };
    resolveParams();
  }, [params]);
  const { movie, reviews, error, isLoading } = useMovieReviewDetails(
    movieId || 0,
  );
  return (
    <div className='flex flex-row pt-[100px] text-movie-white'>
      <div className=' flex flex-col w-1/3 gap-4 items-center'>
        <p className='w-full text-4xl font-mont font-medium text-movie-white text-center'>
          Superman
        </p>
        <div className='flex justify-center items-center w-80 p-3'>
          <Image
            src='/poster.webp'
            alt='Movie Poster'
            width={500}
            height={750}
            className='w-full h-auto object-cover '
            priority
          />
        </div>
        <h1>More Information</h1>
        <p>Here you can find more details about the movie.</p>
        <p>{movie?.overview}</p>
      </div>
      <div className='flex flex-col w-2/3'>
        <p className='w-full text-4xl font-mont font-medium text-movie-white ms-4'>
          Story
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae
          sapiente quis corporis qui? Illo soluta quisquam voluptate tempora
          eius dignissimos doloribus odit eligendi dolor perspiciatis, quibusdam
          itaque iste? Excepturi, illo!
        </p>
      </div>
    </div>
  );
}
