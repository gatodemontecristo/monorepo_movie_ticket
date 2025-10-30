import React from 'react';

interface SignInFormProps {
  onSignIn: () => void;
}
export const SignInForm = ({ onSignIn }: SignInFormProps) => {
  return (
    <div className='w-full p-10'>
      <p className='text-4xl text-movie-white font-caros font-light mb-6 text-start'>
        Sign In
      </p>
      <div className='flex flex-col gap-2'>
        <input
          type='email'
          placeholder='Email address'
          className='w-full px-4 py-3 bg-white rounded-lg border border-gray-300 focus:border-movie-duck focus:outline-none focus:ring-2 focus:ring-movie-duck/20 transition-all duration-200 font-mont text-gray-800 placeholder-gray-500'
        />
        <input
          type='password'
          placeholder='Password'
          className='w-full px-4 py-3 bg-white rounded-lg border border-gray-300 focus:border-movie-duck focus:outline-none focus:ring-2 focus:ring-movie-duck/20 transition-all duration-200 font-mont text-gray-800 placeholder-gray-500'
        />
      </div>

      <button className='w-full bg-movie-duck hover:bg-movie-duck/90 text-movie-black font-mont font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] mt-6'>
        Sign In
      </button>
      <div className='flex items-center justify-between px-2 mt-4'>
        <div className='flex flex-row justify-center items-center'>
          <input
            type='checkbox'
            id='remember'
            className='w-4 h-4 text-movie-duck bg-white border-gray-300 rounded focus:ring-movie-duck focus:ring-2 accent-movie-duck'
          />
          <label
            htmlFor='remember'
            className='ml-2 text-sm font-mont text-movie-white cursor-pointer select-none'
          >
            Remember me
          </label>
        </div>
        <p className='font-light text-sm text-movie-white font-mont'>
          Need help?
        </p>
      </div>
      <div className='flex flex-col gap-1 mt-5'>
        <div className='flex flex-row justify-start items-center mt-6 gap-2'>
          <p className='text-sm text-movie-white font-mont '>
            New to Movie Ticket?
          </p>
          <button
            className='text-sm text-movie-duck font-mont font-semibold hover:underline'
            onClick={onSignIn}
          >
            Sign up now.
          </button>
        </div>
        <p className='text-xs text-movie-white font-mont font-extralight'>
          This page is protected by Google reCAPTCHA to ensure you&apos;re not a
          bot. <span className='underline cursor-pointer'>Learn more.</span>
        </p>
      </div>
    </div>
  );
};
