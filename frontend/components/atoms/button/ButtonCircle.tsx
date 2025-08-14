import React from 'react';

interface ButtonCircleProps {
  onClick: () => void;
  className?: string;
  children?: React.ReactNode;
}
export const ButtonCircle = ({
  onClick,
  className,
  children,
}: ButtonCircleProps) => {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-full border-2 border-movie-yellow text-movie-yellow hover:bg-movie-yellow hover:text-movie-black transition-all duration-300 ${className}`}
    >
      {children}
    </button>
  );
};
