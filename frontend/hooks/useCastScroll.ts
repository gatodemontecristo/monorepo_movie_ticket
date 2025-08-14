'use client';
import { useRef } from 'react';

export const useCastScroll = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const currentScroll = container.scrollLeft;

      if (currentScroll <= 0) {
        container.scrollTo({
          left: container.scrollWidth - container.clientWidth,
          behavior: 'smooth',
        });
      } else {
        container.scrollBy({
          left: -300,
          behavior: 'smooth',
        });
      }
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const currentScroll = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;

      if (currentScroll >= maxScroll - 10) {
        container.scrollTo({
          left: 0,
          behavior: 'smooth',
        });
      } else {
        container.scrollBy({
          left: 300,
          behavior: 'smooth',
        });
      }
    }
  };
  return { scrollLeft, scrollRight, scrollContainerRef };
};
