'use client';

import React, { useState } from 'react';
import { BiSolidGrid } from 'react-icons/bi';
import { ButtonMenu, LogoWeb } from '../atoms';
import { BUTTON_NAVIGATION, SITE_NAME } from '@/constants';
import { nanoid } from 'nanoid';
import { SearchMovie } from '../atoms/input';
import { useCurrentUser, useLogout, useScroll } from '@/hooks';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { buildImageLogin } from '@/config/tmdb';
import { Notyf } from 'notyf';
import { UserStatusDialog } from './login';
import Link from 'next/link';

export const MenuBar = () => {
  const router = useRouter();
  const notyf = new Notyf();
  const { isScrolled } = useScroll();
  const [showUserTooltip, setShowUserTooltip] = useState(false);

  const currentUser = useCurrentUser();
  const { mutateAsync: logout, isPending } = useLogout();

  const onLogout = async (event?: React.BaseSyntheticEvent) => {
    event?.preventDefault();
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      notyf.error('Logout failed: ' + error);
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-20 flex items-center justify-between px-20 transition-all duration-300 ${
        isScrolled
          ? 'bg-movie-black py-4'
          : 'bg-gradient-to-b from-movie-black via-movie-black to-transparent py-7'
      }`}
    >
      <Link
        href={{
          pathname: '/movies',
        }}
      >
        <LogoWeb webname={SITE_NAME}></LogoWeb>
      </Link>
      <div className='flex flex-row items-center gap-10'>
        <SearchMovie></SearchMovie>
        {BUTTON_NAVIGATION.map(button => (
          <ButtonMenu text={button.name} key={nanoid()}></ButtonMenu>
        ))}
        <div
          className='relative'
          onMouseEnter={() => setShowUserTooltip(true)}
          onMouseLeave={() => setShowUserTooltip(false)}
        >
          <Image
            src={buildImageLogin(!currentUser)}
            alt='Profile Picture'
            width={200}
            height={200}
            className='w-12 h-12 object-cover rounded-full cursor-pointer hover:ring-2 hover:ring-movie-duck transition-all duration-300'
            priority
          />
          <div
            className={`absolute top-16 right-0 w-72 bg-movie-black/95 backdrop-blur-sm border border-movie-duck/20 rounded-xl shadow-2xl transform transition-all duration-300 ease-out ${
              showUserTooltip
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 -translate-y-2 pointer-events-none'
            }`}
          >
            <UserStatusDialog
              currentUser={currentUser}
              isPending={isPending}
              onLogout={onLogout}
            ></UserStatusDialog>
          </div>
        </div>
        <button className='text-movie-white text-2xl font-medium font-caros hover:text-movie-yellow transition duration-300'>
          <BiSolidGrid />
        </button>
      </div>
    </div>
  );
};
