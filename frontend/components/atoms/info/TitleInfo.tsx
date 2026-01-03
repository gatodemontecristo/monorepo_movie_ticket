import React from 'react';

interface TitleInfoProps {
  title: string;
  text?: string;
}
export const TitleInfo = ({ title, text }: TitleInfoProps) => {
  return (
    <>
      <p className='text-3xl md:text-4xl font-mont font-medium text-movie-white '>
        {title}
      </p>
      {text && <p className='font-caros text-center md:text-justify'>{text}</p>}
    </>
  );
};
