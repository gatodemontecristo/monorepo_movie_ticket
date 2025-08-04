import React from 'react';

interface InfoLabelProps {
  text: string;
  subtext?: string;
}

export const InfoLabel = ({ text, subtext }: InfoLabelProps) => {
  return (
    <p className='font-mont'>
      {text}
      {subtext && ': '}
      {subtext && <span className='text-movie-yellow'>{subtext}</span>}
    </p>
  );
};
