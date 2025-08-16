import React from 'react';
interface ButtonLinkProps {
  onClick: () => void;
  text: string;
}
export const ButtonLink = ({ onClick, text }: ButtonLinkProps) => {
  return (
    <div className='flex justify-end mt-4'>
      <button
        onClick={onClick}
        className='text-movie-yellow cursor-pointer hover:text-movie-white underline underline-offset-2 font-caros font-medium text-lg transition-colors duration-300 me-8'
      >
        {text}
      </button>
    </div>
  );
};
