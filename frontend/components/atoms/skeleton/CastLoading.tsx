import React from 'react';

export const CastLoading = () => {
  return (
    <div className={'flex flex-col w-1/6 gap-5 p-3 items-center'}>
      <div className='w-full aspect-square  rounded-full animate-pulse bg-movie-grey flex items-center justify-center'></div>
      <div className='bg-movie-grey h-[25px] w-2/3 rounded-lg animate-pulse'></div>
    </div>
  );
};
