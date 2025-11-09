'use client';

import { useSearchMovie } from '@/hooks';
import { useSearchStore } from '@/store';
import React from 'react';
import { IoSearch } from 'react-icons/io5';

interface SearchMovieProps {
  placeholder?: string;
}
export const SearchMovie = ({ placeholder }: SearchMovieProps) => {
  const { handleSearchClick, handleBlur, handleSearchChange, inputRef } =
    useSearchMovie();
  const { searchValue, isSearchActive } = useSearchStore();

  return (
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
            placeholder={placeholder || 'Introduce movie'}
            className='w-full bg-transparent font-mont text-movie-black placeholder-gray-500 text-sm font-medium outline-none pr-8'
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
  );
};
