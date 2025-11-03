import React from 'react';

interface ButtonUserSignProps {
  isPending?: boolean;
  onLogout: () => void;
  text: string;
  icon?: React.ReactNode;
}
export const ButtonUserSign = ({
  isPending,
  onLogout,
  text,
  icon,
}: ButtonUserSignProps) => {
  return (
    <button
      disabled={isPending}
      onClick={onLogout}
      className='bg-movie-duck cursor-pointer text-movie-black px-4 py-2 rounded-lg font-mont font-semibold hover:bg-movie-duck/90 transition-colors duration-200'
    >
      {icon && icon}
      {text}
    </button>
  );
};
