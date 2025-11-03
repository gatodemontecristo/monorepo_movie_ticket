'use client';
import { FormLogin, SignFormMain, SignUpForm } from '@/components';
import React, { useState } from 'react';

export default function LoginPage() {
  const [signIn, setSignIn] = useState<boolean>(true);
  const toggleForm = () => {
    setSignIn(!signIn);
  };
  return (
    <div className='h-screen w-screen relative bg-[url(/login.jpg)] flex items-center justify-center'>
      <div className='absolute inset-0 bg-black/30' />
      <div className='relative flex flex-col items-center w-1/3 z-10 bg-movie-black/90 backdrop-blur-sm  rounded-xl'>
        {signIn ? (
          <SignFormMain onSignForm={toggleForm} type='sign-in'>
            <SignFormMain.Title />
            <FormLogin />
            <SignFormMain.Extra />
            <SignFormMain.Link />
            <SignFormMain.Captcha />
          </SignFormMain>
        ) : (
          <SignUpForm onSignUp={toggleForm} />
        )}
      </div>
    </div>
  );
}
