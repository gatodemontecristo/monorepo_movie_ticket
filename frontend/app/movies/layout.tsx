'use client';

import {
  ButtonUserSign,
  CardCollection,
  GeneralLoader,
  MenuBar,
} from '@/components';
import FooterSection from '@/components/organisms/FooterSection';
import { COMPLETE_RESOURCES_SECTION } from '@/constants';
import { useSearchMovies } from '@/hooks';
import { useSearchStore } from '@/store';
import React from 'react';
import { RxCross2 } from 'react-icons/rx';

export default function MoviesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { searchValue, isSearchActive, setSearchValue, setIsSearchActive } =
    useSearchStore();
  const { data, isLoading } = useSearchMovies(searchValue);
  const fnSearchClose = () => {
    setSearchValue('');
    setIsSearchActive(false);
  };
  return (
    <>
      <div className='min-h-screen'>
        <MenuBar />
        {!isSearchActive && children}

        {isSearchActive &&
          (isLoading ? (
            <div className='relative overflow-hidden h-screen w-screen'>
              <GeneralLoader></GeneralLoader>
            </div>
          ) : (
            <div className='relative flex flex-col mt-[120px] p-2'>
              <div className='absolute top-5 right-20'>
                <ButtonUserSign
                  onLogout={fnSearchClose}
                  icon={
                    <RxCross2 className='text-movie-black size-8 font-bold' />
                  }
                />
              </div>
              <CardCollection
                movies={data?.results || []}
                isLoading={isLoading}
                title={`Search Results for "${searchValue}"`}
              ></CardCollection>
            </div>
          ))}
      </div>
      <FooterSection>
        <FooterSection.Social label='My social networks. Get in touch!' />
        <FooterSection.Line />
        <FooterSection.Links collection={COMPLETE_RESOURCES_SECTION} />
      </FooterSection>
    </>
  );
}
