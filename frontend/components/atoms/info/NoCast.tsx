import React from 'react';

interface NoCastProps {
  message: string;
  className?: string;
}
export const NoCast = ({ message, className }: NoCastProps) => {
  return (
    <div
      className={`w-full h-full bg-gray-700 flex items-center justify-center ${className}`}
    >
      <span className='text-gray-400 font-mont text-xs font-medium'>
        {message}
      </span>
    </div>
  );
};
