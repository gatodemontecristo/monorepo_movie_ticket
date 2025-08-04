'use client';
import React, { useEffect, useRef, useState } from 'react';

export const useSearchMovie = () => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState('');
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
    isSearchActive,
    inputRef,
    searchValue,
  };
};
