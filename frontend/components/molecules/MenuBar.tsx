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
import { Sidebar } from '../organisms';

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
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 z-90 flex items-center justify-between md:px-20 px-5 transition-all duration-300 ${
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
        <div className='flex flex-row items-center gap-5 md:gap-10'>
          <SearchMovie></SearchMovie>
          <div className=' flex-row items-center gap-10 hidden md:flex'>
            {BUTTON_NAVIGATION.map(button => (
              <ButtonMenu
                text={button.name}
                key={nanoid()}
                href={button.href}
              ></ButtonMenu>
            ))}
          </div>
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
              className='w-8 h-8 md:w-12 md:h-12 object-cover rounded-full cursor-pointer hover:ring-2 hover:ring-movie-duck transition-all duration-300'
              priority
            />
            <div
              className={`absolute top-15  right-0 w-52 p-2 md:w-72 bg-movie-black/95 backdrop-blur-sm border border-movie-duck/20 rounded-xl shadow-2xl transform transition-all duration-500 ease-initial
 ${
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
          <button
            onClick={onClose}
            className='text-movie-white text-2xl font-medium font-caros hover:text-movie-yellow transition duration-300'
          >
            <BiSolidGrid />
          </button>
        </div>
      </div>
      <Sidebar {...{ onClose, isOpen }}></Sidebar>
    </>
  );
};
