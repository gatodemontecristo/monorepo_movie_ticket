import { GenericLink } from '@/types';
import React from 'react';

interface LinkTabProps extends GenericLink {
  className?: string;
}
export const LinkTab = ({ href, label, className }: LinkTabProps) => {
  return (
    <a
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      className={`text-movie-black font-mont md:text-base text-sm hover:underline hover:font-semibold hover: transition-all duration-200 ${className}`}
    >
      {label}
    </a>
  );
};
