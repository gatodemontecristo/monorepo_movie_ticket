import React from 'react';

interface ButtonLoadingProps {
  className?: string;
}

export const ButtonLoading = ({ className }: ButtonLoadingProps) => {
  return (
    <div
      className={`h-10 bg-movie-grey rounded-full animate-pulse w-32 ${className}`}
    ></div>
  );
};
