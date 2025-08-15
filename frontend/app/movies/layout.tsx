'use client';

import { ButtonCircle, LinkCollection, MenuBar } from '@/components';
import {
  COMPLETE_RESOURCES_SECTION,
  GITHUB_URL,
  LEETCODE_URL,
  LETTERBOXD_URL,
  LINKEDIN_URL,
} from '@/constants';
import { nanoid } from 'nanoid';
import React from 'react';
import { FaGithub, FaLinkedin, FaSquareLetterboxd } from 'react-icons/fa6';
import { SiLeetcode } from 'react-icons/si';

export default function MoviesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const windowOpen = (url: string) => {
    window.open(url, '_blank');
  };
  return (
    <main className='min-h-screen bg-movie-black'>
      <MenuBar />
      {children}

      <div className='bg-movie-yellow'>
        <div className='flex flex-row items-center justify-between py-5 px-10'>
          <p>My social networks. Get in touch!</p>
          <div className='flex flex-row gap-1'>
            <ButtonCircle
              type='filled'
              onClick={() => windowOpen(LINKEDIN_URL)}
            >
              <FaLinkedin className='w-5 h-5 p-0.5' />
            </ButtonCircle>
            <ButtonCircle type='filled' onClick={() => windowOpen(GITHUB_URL)}>
              <FaGithub className='w-5 h-5 p-0.5' />
            </ButtonCircle>

            <ButtonCircle
              type='filled'
              onClick={() => windowOpen(LEETCODE_URL)}
            >
              <SiLeetcode className='w-5 h-5 p-0.5' />
            </ButtonCircle>
            <ButtonCircle
              type='filled'
              onClick={() => windowOpen(LETTERBOXD_URL)}
            >
              <FaSquareLetterboxd className='w-5 h-5 p-0.5' />
            </ButtonCircle>
          </div>
        </div>
        <div className='flex flex-row items-start justify-between py-5 px-10'>
          {COMPLETE_RESOURCES_SECTION.map(section => (
            <LinkCollection
              key={nanoid()}
              collection={section.links}
              title={section.title}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
