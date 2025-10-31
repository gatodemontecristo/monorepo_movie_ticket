'use client';
import { ButtonHome, MenuBar } from '@/components';
import FooterSection from '@/components/organisms/FooterSection';
import { COMPLETE_RESOURCES_SECTION } from '@/constants';
import Image from 'next/image';
import React from 'react';

export default function NotFound() {
  return (
    <div className='min-h-screen bg-movie-black flex flex-col'>
      <MenuBar />
      <div className='relative overflow-hidden h-screen w-screen'>
        <Image
          src='/moon_bg.jpg'
          alt='Not Found'
          fill
          className='object-cover'
          priority
        />
        <div className='absolute  flex flex-col items-center justify-center h-screen w-screen z-10'>
          <h1 className='text-8xl font-mont font-bold text-movie-duck mb-4'>
            404
          </h1>
          <p className='text-2xl font-caros text-movie-white mb-2'>
            Movie page not found
          </p>
          <p className='text-movie-white opacity-70 font-caros'>
            We couldn&apos;t find the content you&apos;re looking for on TMDB.
          </p>
          <ButtonHome></ButtonHome>
        </div>
        <div className='absolute inset-0 bg-black/50' />
      </div>
      <FooterSection>
        <FooterSection.Social label='My social networks. Get in touch!' />
        <FooterSection.Line />
        <FooterSection.Links collection={COMPLETE_RESOURCES_SECTION} />
      </FooterSection>
    </div>
  );
}
