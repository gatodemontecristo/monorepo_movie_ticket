import { GenericLink } from '@/types';
import { nanoid } from 'nanoid';
import React from 'react';
import { LinkTab } from '../atoms';
interface LinkCollectionProps {
  collection: GenericLink[];
  title: string;
  className?: string;
}
export const LinkCollection = ({
  collection,
  title,
  className,
}: LinkCollectionProps) => {
  return (
    <div className={`flex flex-col md:w-1/4 w-1/2 ${className}`}>
      <p className='text-movie-black font-mont font-semibold mb-3'>{title}</p>
      {collection.map(link => (
        <LinkTab key={nanoid()} {...link} />
      ))}
    </div>
  );
};
