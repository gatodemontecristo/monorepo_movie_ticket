'use client';
import { useSearchStore } from '@/store';
import React, { useEffect, useRef } from 'react';

export const useSearchMovie = () => {
  const { searchValue, setSearchValue, isSearchActive, setIsSearchActive } =
    useSearchStore();
  const inputRef = useRef<HTMLInputElement>(null);
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
  return {
    handleSearchClick,
    handleBlur,
    handleSearchChange,
    inputRef,
  };
};
