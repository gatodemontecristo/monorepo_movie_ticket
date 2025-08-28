'use client';
import { ButtonMovie, ReviewUser, TitleInfo } from '@/components';
import { useMovieReviewDetails } from '@/hooks';
import React from 'react';
import { nanoid } from 'nanoid';
import ReviewPanel from '@/components/organisms/ReviewPanel';

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

  if (isLoading || !movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex flex-row pt-[100px] text-movie-white'>
      <div className=' flex flex-col w-1/3 gap-4 items-center'>
        <ReviewPanel movie={movie}>
          <ReviewPanel.Title />
          <ReviewPanel.Poster />
          <ButtonMovie type='filled' className='w-full' text='Book Tickets' />
          <ButtonMovie
            type='outlined'
            className='w-full'
            text='Return to home'
          />
          <ReviewPanel.Other />
          <ReviewPanel.Extra />
          <ReviewPanel.Box />
        </ReviewPanel>
      </div>
      <div className='flex flex-col w-2/3 mt-10 p-6 gap-6'>
        <div className='flex flex-col gap-4'>
          <TitleInfo title='Story' text={movie?.overview}></TitleInfo>
        </div>
        <div className='flex flex-col gap-4 me-5'>
          <TitleInfo title='Review'></TitleInfo>
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
