import React from 'react';

interface IconTextProps {
  children: React.ReactNode;
  text: string;
}

export const IconText = ({ children, text }: IconTextProps) => {
  return (
    <div className='flex flex-row gap-1 items-center uppercase'>
      {children}
      <p>{text}</p>
    </div>
  );
};
