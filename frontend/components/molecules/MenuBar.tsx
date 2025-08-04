'use client';

import React from 'react';
import { BiSolidGrid } from 'react-icons/bi';
import { ButtonMenu, LogoWeb } from '../atoms';
import { BUTTON_NAVIGATION, SITE_NAME } from '@/constants';
import { nanoid } from 'nanoid';
import { SearchMovie } from '../atoms/input';
import { useScroll } from '@/hooks';

export const MenuBar = () => {
  const { isScrolled } = useScroll();
  return (
    <div
      className={`fixed top-0 left-0 right-0 z-20 flex items-center justify-between px-20 transition-all duration-300 ${
        isScrolled
          ? 'bg-movie-black py-4'
          : 'bg-gradient-to-b from-movie-black via-movie-black to-transparent py-7'
      }`}
    >
      <LogoWeb webname={SITE_NAME}></LogoWeb>
      <div className='flex flex-row items-center gap-10'>
        <SearchMovie></SearchMovie>
        {BUTTON_NAVIGATION.map(button => (
          <ButtonMenu text={button.name} key={nanoid()}></ButtonMenu>
        ))}
        <button className='text-movie-white text-2xl font-medium font-caros hover:text-movie-yellow transition duration-300'>
          <BiSolidGrid />
        </button>
      </div>
    </div>
  );
};
