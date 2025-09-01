import React from 'react';
import countries from 'world-countries';

const countryList = countries
  .map(c => ({
    name: c.name.common,
    code: c.cca2,
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

export default function SelectCountry({
  value = 'US',
  onChange,
}: {
  value?: string;
  onChange?: (code: string) => void;
}) {
  return (
    <div className='relative w-full max-w-xs'>
      <select
        value={value}
        onChange={e => onChange?.(e.target.value)}
        className='appearance-none w-full px-4 py-2 bg-movie-black text-white rounded-lg pr-10 focus:outline-none focus:border-2 focus:border-movie-duck active:border-2 active:border-movie-duck'
        style={{ border: 'none' }}
      >
        {countryList.map(country => (
          <option
            key={country.code}
            value={country.code}
            className='bg-movie-black text-white'
          >
            {country.name}
          </option>
        ))}
      </select>
      {/* Custom arrow */}
      <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2'>
        <svg
          className='w-4 h-4 text-white'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M19 9l-7 7-7-7'
          />
        </svg>
      </div>
    </div>
  );
}
