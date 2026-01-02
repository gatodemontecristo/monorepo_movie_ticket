import React from 'react';
import clsx from 'clsx';

interface InfoLabelProps {
  text?: string;
  subtext?: string;
  children?: React.ReactNode;
  className?: string;
}

export const InfoLabel = ({
  text = '-',
  subtext,
  children,
  className,
}: InfoLabelProps) => {
  return (
    <div
      className={clsx(
        'font-mont',
        className,
        children && 'flex flex-row items-center justify-end gap-1 ',
      )}
    >
      {text}
      {children}
      {subtext && ': '}
      {subtext && <span className='text-movie-yellow'>{subtext}</span>}
    </div>
  );
};
