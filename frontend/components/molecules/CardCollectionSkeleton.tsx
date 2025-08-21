import { ButtonLoading, CardLoading } from '../atoms';
import { nanoid } from 'nanoid';
import React from 'react';

export const CardCollectionSkeleton = () => {
  return (
    <div className='flex flex-col gap-4 px-10 '>
      <div className='flex flex-row flex-wrap '>
        {Array.from({ length: 8 }).map(() => (
          <CardLoading key={nanoid()} />
        ))}
      </div>

      <div className='flex justify-end px-5'>
        <ButtonLoading />
      </div>
    </div>
  );
};
