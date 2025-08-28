'use client';
import {
  ButtonMovie,
  InfoBox,
  MovieGenres,
  MovieScore,
  ReviewUser,
  TagRate,
} from '@/components';
import { buildImageUrl, IMAGE_SIZES } from '@/config/tmdb';
import { FaRegCalendar } from 'react-icons/fa6';
import { useMovieReviewDetails } from '@/hooks';
import Image from 'next/image';
import React from 'react';
import { formatScore } from '@/utils';
import { IoLanguage } from 'react-icons/io5';
import { nanoid } from 'nanoid';

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

  const reviewFeature = [
    {
      color: 'bg-green-500',
      number: movie.popularity,
      text: 'Popularity',
    },
    {
      color: 'bg-amber-500',
      number: movie.vote_count,
      text: 'Vote Count',
    },
    {
      color: 'bg-blue-500',
      number: movie.vote_average,
      text: 'Vote Average',
    },
    {
      color: 'bg-red-500',
      number: movie.budget,
      text: 'Budget',
    },
  ];

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
          <ButtonMovie
            type='outlined'
            className='w-full'
            text='Return to home'
          />
          <div className='flex flex-row gap-4 text-sm font-caros text-white '>
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
          {reviewFeature.map(feature => (
            <InfoBox
              key={nanoid()}
              number={feature.number}
              text={feature.text}
              color={feature.color}
            />
          ))}
        </div>
      </div>
      <div className='flex flex-col w-2/3 mt-10 p-6 gap-6'>
        <div className='flex flex-col gap-4'>
          <p className='text-4xl font-mont font-medium text-movie-white '>
            Story
          </p>
          <p className='font-caros'>{movie?.overview}</p>
        </div>
        <div className='flex flex-col gap-4 me-5'>
          <p className='text-4xl font-mont font-medium text-movie-white'>
            Review
          </p>
          <div className='flex flex-col gap-6'>
            {reviews?.results?.map(review => (
              <ReviewUser key={nanoid()} review={review} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
