'use client';

import {
  ButtonUserSign,
  CardCollection,
  GeneralLoader,
  MenuBar,
  NotFoundText,
} from '@/components';
import FooterSection from '@/components/organisms/FooterSection';
import { COMPLETE_RESOURCES_SECTION } from '@/constants';
import { useSearchMovies } from '@/hooks';
import { useSearchStore } from '@/store';
import { useSearchParams } from 'next/navigation';
import { Notyf } from 'notyf';
import React, { useEffect } from 'react';
import { RxCross2 } from 'react-icons/rx';

export default function MoviesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const successMessage = searchParams.get('message');
  useEffect(() => {
    if (successMessage) {
      const notyf = new Notyf();
      notyf.success(decodeURIComponent(successMessage));
    }
  }, [successMessage]);
  const { searchValue, isSearchActive, setSearchValue, setIsSearchActive } =
    useSearchStore();
  const { data, isLoading } = useSearchMovies(searchValue);
  const fnSearchClose = () => {
    setSearchValue('');
    setIsSearchActive(false);
  };
  return (
    <>
      <div className='min-h-screen relative'>
        <MenuBar />
        {!isSearchActive && children}

        {isSearchActive &&
          (isLoading ? (
            <div className='relative overflow-hidden h-screen w-screen'>
              <GeneralLoader></GeneralLoader>
            </div>
          ) : data?.results && data?.results.length > 0 ? (
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
          ) : (
            <NotFoundText
              text={`No movie was found.`}
              className='absolute'
            ></NotFoundText>
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
