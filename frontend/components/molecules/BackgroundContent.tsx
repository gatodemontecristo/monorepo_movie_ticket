import { buildImageUrl, IMAGE_SIZES } from '@/config/tmdb';
import Image from 'next/image';
import React from 'react';

interface BackgroundContentProps {
  title: string;
  imgPath?: string;
  children?: React.ReactNode;
}
export const BackgroundContent = ({
  title,
  imgPath,
  children,
}: BackgroundContentProps) => {
  return (
    <div className='w-full flex-shrink-0 h-full relative'>
      {/* Background image */}
      <Image
        src={buildImageUrl(imgPath, IMAGE_SIZES.BACKDROP.LARGE) as string}
        alt={title}
        fill
        className='object-cover'
        priority
      />

      {/* Overlay dark */}
      <div className='absolute inset-0 bg-black/30' />

      {/* Content */}
      {children}
    </div>
  );
};
