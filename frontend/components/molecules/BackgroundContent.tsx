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

      {/* Overlay para el fade */}
      {/* <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '50%',
          background: `linear-gradient(to top, #0a061e, transparent)`,
          padding: '1rem',
          zIndex: 5,
        }}
      ></div> */}

      {/* Content */}
      {children}
    </div>
  );
};
