'use client';
import React, { useState, useEffect, useRef } from 'react';
import { BiSolidGrid } from 'react-icons/bi';
import { IoSearch, IoTicket } from 'react-icons/io5';

export const MenuBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50); // Cambia después de 50px de scroll
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isSearchActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchActive]);

  const handleSearchClick = () => {
    setIsSearchActive(true);
  };

  const handleBlur = () => {
    if (searchValue === '') {
      setIsSearchActive(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-20 flex items-center justify-between px-20 transition-all duration-300 ${
        isScrolled
          ? 'bg-movie-black py-4'
          : 'bg-gradient-to-b from-movie-black via-movie-black to-transparent py-7'
      }`}
    >
      <div className='flex flex-col items-center gap-1'>
        <IoTicket className='text-movie-duck text-2xl' />
        <p className='text-movie-white text-sm font-normal font-mont'>
          Cinemagic
        </p>
      </div>
      <div className='flex flex-row items-center gap-10'>
        {/* Search Input Component */}
        <div className='relative flex items-center'>
          <div
            className={`relative flex items-center transition-all duration-300 ease-in-out ${
              isSearchActive
                ? 'w-52 bg-white rounded-full px-4 py-2 shadow-lg'
                : 'w-8 h-8 bg-transparent'
            }`}
          >
            {isSearchActive ? (
              <input
                ref={inputRef}
                type='text'
                value={searchValue}
                onChange={handleSearchChange}
                onBlur={handleBlur}
                placeholder='Introduce movie'
                className='w-full bg-transparent text-movie-black placeholder-gray-500 text-sm font-medium outline-none pr-8'
              />
            ) : null}

            <button
              onClick={handleSearchClick}
              className={`flex items-center justify-center transition-all duration-300 ${
                isSearchActive
                  ? 'absolute right-3 text-movie-black hover:text-gray-600'
                  : 'text-movie-white hover:text-movie-yellow w-full h-full'
              }`}
            >
              <IoSearch className='text-xl' />
            </button>
          </div>
        </div>
        <button className='text-movie-white text-base font-medium font-caros hover:underline hover:underline-offset-2 hover:text-movie-yellow transition duration-300'>
          MENU
        </button>
        <button className='text-movie-white text-base font-medium font-caros hover:underline hover:underline-offset-2 hover:text-movie-yellow transition duration-300'>
          MOVIE
        </button>
        <button className='text-movie-white text-2xl font-medium font-caros hover:text-movie-yellow transition duration-300'>
          <BiSolidGrid />
        </button>
      </div>
    </div>
  );
};
