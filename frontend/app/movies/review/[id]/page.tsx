'use client';
import {
  ButtonMovie,
  LinkTab,
  MovieGenres,
  MovieScore,
  TagRate,
} from '@/components';
import { buildImageUrl, buildImageUser, IMAGE_SIZES } from '@/config/tmdb';
import { FaCalendar, FaRegCalendar } from 'react-icons/fa6';
import { useMovieReviewDetails } from '@/hooks';
import Image from 'next/image';
import React from 'react';
import { formatScore } from '@/utils';
import { IoLanguage } from 'react-icons/io5';
import { FaEdit } from 'react-icons/fa';

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
          <ButtonMovie
            type='outlined'
            className='w-full'
            text='Return to home'
          />
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
              <div key={review.id} className=' bg-movie-grey px-10 py-8'>
                <div className='flex flex-row justify-between items-center mb-4'>
                  <div className='flex flex-row gap-4 items-center align-middle'>
                    <Image
                      src={buildImageUser(review.author_details.avatar_path)}
                      alt='Profile Picture'
                      width={200}
                      height={200}
                      className='w-18 h-18 object-cover rounded-full'
                      priority
                    />

                    <div className='flex flex-col gap-1'>
                      <p className='font-caros font-bold  text-movie-duck'>
                        {review.author}
                      </p>
                      <p className='font-mont text-sm font-bold  italic text-movie-white'>
                        {review.author_details.username}
                      </p>
                    </div>
                  </div>
                  <MovieScore
                    score={formatScore(review.author_details.rating)}
                  ></MovieScore>
                </div>
                <div
                  className='font-mont font-normal text-sm line-clamp-7 overflow-hidden text-ellipsis'
                  dangerouslySetInnerHTML={{ __html: review.content }}
                />
                <div className='flex flex-row justify-between items-center py-2 px-4'>
                  <div className='flex flex-row gap-4'>
                    <div className='flex flex-row justify-center gap-1 text-xs text-movie-white'>
                      <FaCalendar />
                      <p className='font-mont  font-normal italic'>
                        Created at{' '}
                        {new Date(review.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className='flex flex-row justify-center gap-1 text-xs text-movie-white'>
                      <FaEdit />
                      <p className='font-mont  font-normal italic'>
                        Edited at{' '}
                        {new Date(review.updated_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <LinkTab
                    href={`${review.url}`}
                    label='Read more'
                    className='text-white text-sm'
                  ></LinkTab>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
