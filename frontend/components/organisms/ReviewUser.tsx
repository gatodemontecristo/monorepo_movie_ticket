'use client';

import React, { createContext, useContext } from 'react';
import { MovieScore } from '../molecules';
import { formatScore } from '@/utils';
import Image from 'next/image';
import { buildImageUser } from '@/config/tmdb';
import { LinkTab } from '../atoms';
import { FaEdit } from 'react-icons/fa';
import { FaCalendar } from 'react-icons/fa6';
import type { Review } from '@/types';

interface ReviewContextValue {
  review: Review;
}

interface ReviewUserProps extends ReviewContextValue {
  children?: React.ReactNode;
}
const ReviewContext = createContext<ReviewContextValue>({
  review: {} as Review,
});

const Review = ({ children, review }: ReviewUserProps) => {
  return (
    <ReviewContext.Provider value={{ review }}>
      <div className=' bg-movie-grey px-10 py-8'>{children}</div>
    </ReviewContext.Provider>
  );
};
const ReviewTitle = ({
  author,
  extra,
}: {
  author?: string;
  extra?: string;
}) => {
  return (
    <div className='flex flex-col gap-1'>
      <p className='font-caros font-bold  text-movie-duck'>
        {author || '-Unknown Author-'}
      </p>
      <p className='font-mont text-sm font-bold  italic text-movie-white'>
        {extra || '-No additional information-'}
      </p>
    </div>
  );
};
const ReviewMain = () => {
  const { review } = useContext(ReviewContext);
  return (
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
        <ReviewTitle
          author={review.author}
          extra={review.author_details.username}
        />
      </div>
      <MovieScore
        score={formatScore(review.author_details.rating)}
      ></MovieScore>
    </div>
  );
};

const ReviewParagraph = () => {
  const { review } = useContext(ReviewContext);
  return (
    <div
      className='font-mont font-normal text-sm line-clamp-7 overflow-hidden text-ellipsis'
      dangerouslySetInnerHTML={{ __html: review.content }}
    />
  );
};
const ReviewIcon = ({
  icon,
  text,
}: {
  icon: React.ReactElement;
  text: string;
}) => {
  return (
    <div className='flex flex-row justify-center gap-1 text-xs text-movie-white'>
      {icon}
      <p className='font-mont  font-normal italic'>{text}</p>
    </div>
  );
};
const ReviewFooter = () => {
  const { review } = useContext(ReviewContext);
  return (
    <div className='flex flex-row justify-between items-center py-2 px-4'>
      <div className='flex flex-row gap-4'>
        <ReviewIcon
          icon={<FaCalendar />}
          text={`Created at ${new Date(review.created_at).toLocaleDateString()}`}
        />
        <ReviewIcon
          icon={<FaEdit />}
          text={`Edited at ${new Date(review.updated_at).toLocaleDateString()}`}
        />
      </div>
      <LinkTab
        href={`${review.url}`}
        label='Read more'
        className='text-white text-sm'
      ></LinkTab>
    </div>
  );
};

export const ReviewUser = ({ review }: ReviewContextValue) => {
  return (
    <Review review={review}>
      <ReviewMain />
      <ReviewParagraph />
      <ReviewFooter />
    </Review>
  );
};
