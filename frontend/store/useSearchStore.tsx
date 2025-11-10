/* eslint-disable no-unused-vars */

import { create } from 'zustand';

interface SearchStoreProps {
  searchValue: string;
  isSearchActive: boolean;
  setSearchValue: (value: string) => void;
  setIsSearchActive: (value: boolean) => void;
}

export const useSearchStore = create<SearchStoreProps>(set => ({
  searchValue: '',
  isSearchActive: false,
  setSearchValue: (value: string) => set({ searchValue: value }),
  setIsSearchActive: (value: boolean) => set({ isSearchActive: value }),
}));
