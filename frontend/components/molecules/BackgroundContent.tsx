import { buildImageUrl, IMAGE_SIZES } from '@/config/tmdb';
import Image from 'next/image';
import React from 'react';

interface BackgroundContentProps {
  title: string;
  imgPath?: string;
  children?: React.ReactNode;
  className?: string;
  classDiv?: string;
}
export const BackgroundContent = ({
  title,
  imgPath,
  children,
  className = 'bg-black/30',
  classDiv = 'relative',
}: BackgroundContentProps) => {
  return (
    <div className={`w-full flex-shrink-0 h-full ${classDiv}`}>
      {/* Background image */}
      <Image
        src={buildImageUrl(imgPath, IMAGE_SIZES.BACKDROP.LARGE) as string}
        alt={title}
        fill
        className='object-cover'
        priority
      />

      {/* Overlay dark */}
      <div className={`absolute inset-0 ${className}`} />

      {/* Content */}
      {children}
    </div>
  );
};
