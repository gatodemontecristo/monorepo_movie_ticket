import React from 'react';
interface TagRateProps {
  rate: 'PG-13' | 'R' | 'G' | 'NC-17';
}
export const TagRate = ({ rate }: TagRateProps) => {
  return (
    <div
      className='bg-movie-black text-movie-metal 
              font-bold py-1 px-6 rounded-sm transition duration-300 transform mb-6
                border-movie-metal border-2 font-caros text-sm flex items-center justify-center'
    >
      <p>{rate}</p>
    </div>
  );
};
