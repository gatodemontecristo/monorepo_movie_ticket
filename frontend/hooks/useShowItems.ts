'use client';
import { MAX_INITIAL_ITEMS } from '@/constants';
import { Movie } from '@/types';
import { useState } from 'react';

interface UseShowItemsProps {
  items: Movie[];
}

export const useShowItems = ({ items }: UseShowItemsProps) => {
  const [showAll, setShowAll] = useState(false);
  const maxInitialItems = MAX_INITIAL_ITEMS;

  const itemsToShow = showAll ? items : items.slice(0, maxInitialItems);
  const hasMoreItems = items.length > maxInitialItems;

  const handleToggleView = () => {
    setShowAll(!showAll);
  };
  return {
    itemsToShow,
    hasMoreItems,
    handleToggleView,
  };
};
