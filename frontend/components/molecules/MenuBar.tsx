'use client';

import React, { useState } from 'react';
import { BiSolidGrid } from 'react-icons/bi';
import { ButtonMenu, LogoWeb } from '../atoms';
import { BUTTON_NAVIGATION, SITE_NAME } from '@/constants';
import { nanoid } from 'nanoid';
import { SearchMovie } from '../atoms/input';
import { useCurrentUser, useScroll } from '@/hooks';
import { FaUserCircle, FaSignOutAlt, FaCog } from 'react-icons/fa';
import Image from 'next/image';
import { buildImageLogin } from '@/config/tmdb';

export const MenuBar = () => {
  const { isScrolled } = useScroll();
  const [showUserTooltip, setShowUserTooltip] = useState(false);

  const currentUser = useCurrentUser();
  console.log('currentUser from queryClient:9999', currentUser);
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

          {/* Tooltip animado con detalles del usuario */}
          <div
            className={`absolute top-16 right-0 w-72 bg-movie-black/95 backdrop-blur-sm border border-movie-duck/20 rounded-xl shadow-2xl transform transition-all duration-300 ease-out ${
              showUserTooltip
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 -translate-y-2 pointer-events-none'
            }`}
          >
            {/* Flecha del tooltip */}
            <div className='absolute -top-2 right-6 w-4 h-4 bg-movie-black/95 border-l border-t border-movie-duck/20 transform rotate-45'></div>

            {currentUser ? (
              <div className='p-6'>
                {/* Header del usuario */}
                <div className='flex items-center gap-4 mb-4 pb-4 border-b border-movie-duck/10'>
                  <div className='w-12 h-12 bg-movie-duck/20 rounded-full flex items-center justify-center'>
                    <FaUserCircle className='text-movie-duck text-2xl' />
                  </div>
                  <div>
                    <h3 className='text-movie-white font-mont font-semibold text-lg'>
                      {currentUser.email}
                    </h3>
                    <p className='text-movie-white/60 text-sm font-mont'>
                      User ID: {currentUser.id?.slice(0, 8)}...
                    </p>
                  </div>
                </div>

                {/* Información adicional */}
                <div className='space-y-3 mb-4'>
                  <div className='flex justify-between items-center'>
                    <span className='text-movie-white/70 text-sm font-mont'>
                      Status:
                    </span>
                    <span className='text-green-400 text-sm font-mont flex items-center gap-1'>
                      <div className='w-2 h-2 bg-green-400 rounded-full'></div>
                      Online
                    </span>
                  </div>
                </div>

                {/* Acciones */}
                <div className='flex flex-col gap-2'>
                  <button className='flex items-center gap-3 w-full px-3 py-2 text-movie-white hover:bg-movie-duck/10 rounded-lg transition-colors duration-200 font-mont'>
                    <FaCog className='text-movie-duck' />
                    Settings
                  </button>
                  <button className='flex items-center gap-3 w-full px-3 py-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors duration-200 font-mont'>
                    <FaSignOutAlt className='text-red-400' />
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <div className='p-6 text-center'>
                <FaUserCircle className='text-movie-duck text-4xl mx-auto mb-3' />
                <p className='text-movie-white/70 font-mont mb-4'>
                  No user logged in
                </p>
                <button className='bg-movie-duck text-movie-black px-4 py-2 rounded-lg font-mont font-semibold hover:bg-movie-duck/90 transition-colors duration-200'>
                  Sign In
                </button>
              </div>
            )}
          </div>
        </div>
        <button className='text-movie-white text-2xl font-medium font-caros hover:text-movie-yellow transition duration-300'>
          <BiSolidGrid />
        </button>
      </div>
    </div>
  );
};
