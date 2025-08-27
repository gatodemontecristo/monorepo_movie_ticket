'use client';
import { ButtonMovie, MovieGenres, MovieScore, TagRate } from '@/components';
import { buildImageUrl, IMAGE_SIZES } from '@/config/tmdb';
import { FaRegCalendar } from 'react-icons/fa6';
import { useMovieReviewDetails } from '@/hooks';
import Image from 'next/image';
import React from 'react';
import { formatScore } from '@/utils';
import { IoLanguage } from 'react-icons/io5';

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
  console.log('movie:', movie);
  console.log('reviews:', reviews);
  if (isLoading || !movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex flex-row pt-[100px] text-movie-white'>
      <div className=' flex flex-col w-1/3 gap-4 items-center'>
        <div className='flex flex-col gap-4 justify-center items-center w-80 p-3'>
          <p className='w-full text-3xl font-mont font-medium text-movie-white text-center line-clamp-3 overflow-hidden text-ellipsis'>
            {movie?.title}
          </p>
          <Image
            src={
              buildImageUrl(
                movie?.poster_path,
                IMAGE_SIZES.POSTER.LARGE,
              ) as string
            }
            alt='Movie Poster'
            width={500}
            height={750}
            className='w-full h-auto object-cover '
            priority
          />
          <ButtonMovie type='filled' className='w-full' text='Book Tickets' />
          <div className='flex flex-row gap-4 text-sm font-caros text-white'>
            <MovieGenres movie={movie} />
            <div className='flex flex-row gap-1 items-center uppercase'>
              <FaRegCalendar className='text-movie-yellow' />
              <p>{new Date(movie.release_date).getFullYear()}</p>
            </div>
            <div className='flex flex-row gap-1 items-center uppercase'>
              <IoLanguage className='text-movie-yellow' />
              <p>{movie.original_language}</p>
            </div>
          </div>
          <div className='flex flex-row  gap-4  text-sm'>
            <MovieScore score={formatScore(movie.vote_average)}></MovieScore>
            <TagRate rating={movie.adult ? 'R' : 'PG-13'}></TagRate>
          </div>
          <div className='w-full bg-green-500  flex justify-center text-center items-center flex-col px-10 py-10'>
            <p className='text-movie-white font-caros text-2xl'>7</p>
            <p className='text-movie-white font-caros text-xl'>
              Films Critics Award
            </p>
          </div>
        </div>
      </div>
      <div className='flex flex-col w-2/3 mt-10 p-6'>
        <div className='flex flex-col gap-4'>
          <p className='text-4xl font-mont font-medium text-movie-white '>
            Story
          </p>
          <p className='font-caros'>{movie?.overview}</p>
        </div>

        <p className='text-4xl font-mont font-medium text-movie-white mb-4'>
          Review
        </p>
        <div className='flex flex-col gap-4'>
          {reviews?.results?.map(review => (
            <div key={review.id} className='border-b border-movie-gray py-4'>
              <p className='font-caros'>{review.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
