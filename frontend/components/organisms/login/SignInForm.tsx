'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { useLogin } from '../../../hooks/useUser';
import { useRouter } from 'next/navigation';
import type { LoginUserDto } from '../../../types/user';

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
        <div>
          <input
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            type='email'
            placeholder='Email address'
            className={`w-full px-4 py-3 bg-white rounded-lg border transition-all duration-200 font-mont text-gray-800 placeholder-gray-500 ${
              errors.email
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                : 'border-gray-300 focus:border-movie-duck focus:ring-movie-duck/20'
            } focus:outline-none focus:ring-2`}
          />
          {errors.email && (
            <p className='text-red-400 text-sm mt-1 font-mont'>
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <input
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
            type='password'
            placeholder='Password'
            className={`w-full px-4 py-3 bg-white rounded-lg border transition-all duration-200 font-mont text-gray-800 placeholder-gray-500 ${
              errors.password
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                : 'border-gray-300 focus:border-movie-duck focus:ring-movie-duck/20'
            } focus:outline-none focus:ring-2`}
          />
          {errors.password && (
            <p className='text-red-400 text-sm mt-1 font-mont'>
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Mostrar error de login si existe */}
        {loginMutation.isError && (
          <div className='bg-red-500/10 border border-red-500/20 rounded-lg p-3 mt-2'>
            <p className='text-red-400 text-sm font-mont'>
              {loginMutation.error?.message ||
                'Login failed. Please try again.'}
            </p>
          </div>
        )}

        <button
          type='submit'
          disabled={loginMutation.isPending}
          className='w-full bg-movie-duck hover:bg-movie-duck/90 disabled:bg-movie-duck/50 disabled:cursor-not-allowed text-movie-black font-mont font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:hover:scale-100 mt-6 flex items-center justify-center'
        >
          {loginMutation.isPending ? (
            <>
              <svg
                className='animate-spin -ml-1 mr-3 h-5 w-5 text-movie-black'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
              >
                <circle
                  className='opacity-25'
                  cx='12'
                  cy='12'
                  r='10'
                  stroke='currentColor'
                  strokeWidth='4'
                ></circle>
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                ></path>
              </svg>
              Signing In...
            </>
          ) : (
            'Sign In'
          )}
        </button>
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
