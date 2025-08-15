import React from 'react';
interface TitleFooterProps {
  title: string;
  className?: string;
}
export const TitleFooter = ({ title, className }: TitleFooterProps) => {
  return (
    <p className={`text-movie-black font-mont font-semibold mb-3 ${className}`}>
      {title}
    </p>
  );
};
