'use client';

import { SignFormProps } from '@/types';
import React, { createContext, useContext } from 'react';

interface MainSignFormProps extends SignFormProps {
  children?: React.ReactNode;
}
const SignFormContext = createContext<SignFormProps>({
  type: 'sign-in',
  onSignForm: () => {},
});

const SignFormRoot = ({ children, type, onSignForm }: MainSignFormProps) => {
  return (
    <SignFormContext.Provider value={{ type, onSignForm }}>
      <div className='w-full p-10'>{children}</div>
    </SignFormContext.Provider>
  );
};

const SignFormTitle = () => {
  const { type } = useContext(SignFormContext);
  return (
    <p className='text-4xl text-movie-white font-caros font-light mb-6 text-start'>
      {type === 'sign-in' ? 'Sign In' : 'Sign Up'}
    </p>
  );
};
const SignFormExtra = () => {
  const { type } = useContext(SignFormContext);
  return type === 'sign-in' ? (
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
  ) : (
    <div className='flex items-center justify-end px-2 mt-4'>
      <p className='font-light text-sm text-movie-white font-mont'>
        Need help?
      </p>
    </div>
  );
};

const SignFormLink = () => {
  const { type, onSignForm } = useContext(SignFormContext);
  return (
    <div className='flex flex-row justify-start items-center mt-6 gap-2'>
      <p className='text-sm text-movie-white font-mont '>
        {type === 'sign-in'
          ? 'New to Movie Ticket?'
          : 'Already have an account?'}
      </p>
      <button
        className='text-sm  text-movie-duck font-mont font-semibold hover:underline'
        onClick={onSignForm}
      >
        {type === 'sign-in' ? 'Sign up now.' : 'Sign in now.'}
      </button>
    </div>
  );
};

const SignFormCaptcha = () => {
  return (
    <div className='flex flex-col mt-1'>
      <p className='text-xs text-movie-white font-mont font-extralight'>
        This page is protected by Google reCAPTCHA to ensure you&apos;re not a
        bot. <span className='underline cursor-pointer'>Learn more.</span>
      </p>
    </div>
  );
};

export const SignFormMain = Object.assign(SignFormRoot, {
  Title: SignFormTitle,
  Extra: SignFormExtra,
  Link: SignFormLink,
  Captcha: SignFormCaptcha,
});
