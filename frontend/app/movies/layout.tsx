'use client';

import { MenuBar } from '@/components';
import FooterSection from '@/components/organisms/FooterSection';
import { COMPLETE_RESOURCES_SECTION } from '@/constants';
import React from 'react';

export default function MoviesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className='min-h-screen bg-movie-black'>
      <MenuBar />
      {children}
      <FooterSection>
        <FooterSection.Social label='My social networks. Get in touch!' />
        <FooterSection.Line />
        <FooterSection.Links collection={COMPLETE_RESOURCES_SECTION} />
      </FooterSection>
    </main>
  );
}
