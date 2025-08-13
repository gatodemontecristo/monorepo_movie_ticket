import React from 'react';
import clsx from 'clsx';

interface InfoLabelProps {
  text: string;
  subtext?: string;
  children?: React.ReactNode;
}

export const InfoLabel = ({ text, subtext, children }: InfoLabelProps) => {
  return (
    <p
      className={clsx(
        'font-mont',
        children && 'flex flex-row items-center justify-end gap-1',
      )}
    >
      {text}
      {children}
      {subtext && ': '}
      {subtext && <span className='text-movie-yellow'>{subtext}</span>}
    </p>
  );
};
