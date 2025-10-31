'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { useLogin } from '../../../hooks/useUser';
import { useRouter } from 'next/navigation';
import type { LoginUserDto } from '../../../types/user';
import { InputEmail, InputPassword } from '@/components/molecules';
import { GeneralLoader, MsgError } from '@/components/atoms';

interface SignInFormProps {
  onSignIn: () => void;
}

export const SignInForm = ({ onSignIn }: SignInFormProps) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserDto>();
  const loginMutation = useLogin();

  const onSubmit = async (data: LoginUserDto) => {
    try {
      await loginMutation.mutateAsync(data);
      // Redirigir al dashboard o página principal después del login exitoso
      router.push('/');
    } catch (error) {
      // El error se maneja automáticamente por TanStack Query
      console.error('Login failed:', error);
    }
  };

  return (
    <div className='w-full p-10'>
      <p className='text-4xl text-movie-white font-caros font-light mb-6 text-start'>
        Sign In
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
        <InputEmail
          errorMsg={errors.email?.message}
          placeholder='Email address'
          register={register}
          name='email'
        />
        <InputPassword
          errorMsg={errors.password?.message}
          placeholder='Password is required'
          register={register}
          name='password'
        />

        {/* Mostrar error de login si existe */}
        {loginMutation.isError && (
          <MsgError
            message={
              loginMutation.error?.message || 'Login failed. Please try again.'
            }
            type='complex'
          />
        )}
        {loginMutation.isPending ? (
          <div className='relative flex flex-row justify-center my-10'>
            <GeneralLoader />
          </div>
        ) : (
          <button
            type='submit'
            className='w-full bg-movie-duck hover:bg-movie-duck/90 disabled:bg-movie-duck/50 disabled:cursor-not-allowed text-movie-black font-mont font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:hover:scale-100 mt-4 flex items-center justify-center'
          >
            {'Sign In'}
          </button>
        )}
      </form>
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
