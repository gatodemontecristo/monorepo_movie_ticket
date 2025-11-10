'use client';
import {
  ButtonMovie,
  NotFoundText,
  ReviewUser,
  ScreenContent,
  TitleInfo,
} from '@/components';
import { useMovieReviewDetails } from '@/hooks';
import React from 'react';
import { nanoid } from 'nanoid';
import ReviewPanel from '@/components/organisms/ReviewPanel';
import Link from 'next/link';

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
  const { movie, reviews, isLoading } = useMovieReviewDetails(movieId || 0);

  return (
    <ScreenContent isLoading={isLoading || !movie} outside={true}>
      <div className='flex flex-row pt-[100px] text-movie-white'>
        <div className=' flex flex-col w-1/3 gap-4 items-center'>
          {movie && (
            <ReviewPanel movie={movie}>
              <ReviewPanel.Title />
              <ReviewPanel.Poster />
              <Link
                className='w-full'
                href={{
                  pathname: `/movies/ticket/${movie.id}`,
                }}
              >
                <ButtonMovie
                  type='filled'
                  className='w-full'
                  text='Book Tickets'
                />
              </Link>
              <Link
                className='w-full'
                href={{
                  pathname: `/movies`,
                }}
              >
                <ButtonMovie
                  type='outlined'
                  className='w-full'
                  text='Return to home'
                />
              </Link>
              <ReviewPanel.Other />
              <ReviewPanel.Extra />
              <ReviewPanel.Box />
            </ReviewPanel>
          )}
        </div>
        <div className='flex flex-col w-2/3 mt-10 p-6 me-10 gap-6'>
          <div className='flex flex-col gap-4'>
            <TitleInfo title='Story' text={movie?.overview}></TitleInfo>
          </div>
          <div className='flex flex-col gap-4 me-5'>
            <TitleInfo title='Review'></TitleInfo>
            <div className='flex flex-col gap-6'>
              {reviews?.results && reviews?.results.length > 0 ? (
                reviews.results.map(review => (
                  <ReviewUser key={nanoid()} review={review} />
                ))
              ) : (
                <NotFoundText text='No reviews found.' className='mt-5' />
              )}
            </div>
          </div>
        </div>
      </div>
    </ScreenContent>
  );
}
