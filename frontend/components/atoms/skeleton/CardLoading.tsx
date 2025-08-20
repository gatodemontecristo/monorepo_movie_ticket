import React from 'react';
interface CardLoadingProps {
  className?: string;
}
export const CardLoading = ({ className }: CardLoadingProps) => {
  return (
    <div className={`flex flex-col w-1/4 gap-5 p-5 ${className}`}>
      <div className='bg-movie-grey h-[280px] rounded-lg animate-pulse'></div>
      <div className='bg-movie-grey h-[30px] rounded-lg animate-pulse'></div>
    </div>
  );
};
