'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useRegister } from '../../../hooks/useUser';
import type { RegisterUserDto } from '../../../types/user';

interface SignUpFormData extends RegisterUserDto {
  confirmPassword: string;
}

interface SignUpFormProps {
  onSignUp: () => void;
}

export const SignUpForm = ({ onSignUp }: SignUpFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpFormData>();
  const registerMutation = useRegister();

  // Watch password para validar confirmación
  const watchPassword = watch('password');

  const onSubmit = async (data: SignUpFormData) => {
    try {
      await registerMutation.mutateAsync({
        email: data.email,
        password: data.password,
      });
      // Después del registro exitoso, cambiar al formulario de login
      onSignUp();
    } catch (error) {
      // El error se maneja automáticamente por TanStack Query
    }
  };

  return (
    <div className='w-full p-10'>
      <p className='text-4xl text-movie-white font-caros font-light mb-6 text-start'>
        Sign Up
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

        <div>
          <input
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: value =>
                value === watchPassword || 'Passwords do not match',
            })}
            type='password'
            placeholder='Repeat password'
            className={`w-full px-4 py-3 bg-white rounded-lg border transition-all duration-200 font-mont text-gray-800 placeholder-gray-500 ${
              errors.confirmPassword
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                : 'border-gray-300 focus:border-movie-duck focus:ring-movie-duck/20'
            } focus:outline-none focus:ring-2`}
          />
          {errors.confirmPassword && (
            <p className='text-red-400 text-sm mt-1 font-mont'>
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Mostrar error de registro si existe */}
        {registerMutation.isError && (
          <div className='bg-red-500/10 border border-red-500/20 rounded-lg p-3 mt-2'>
            <p className='text-red-400 text-sm font-mont'>
              {registerMutation.error?.message ||
                'Registration failed. Please try again.'}
            </p>
          </div>
        )}

        {/* Mostrar mensaje de éxito */}
        {registerMutation.isSuccess && (
          <div className='bg-green-500/10 border border-green-500/20 rounded-lg p-3 mt-2'>
            <p className='text-green-400 text-sm font-mont'>
              Registration successful! You can now sign in.
            </p>
          </div>
        )}

        <button
          type='submit'
          disabled={registerMutation.isPending}
          className='w-full bg-movie-duck hover:bg-movie-duck/90 disabled:bg-movie-duck/50 disabled:cursor-not-allowed text-movie-black font-mont font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:hover:scale-100 mt-6 flex items-center justify-center'
        >
          {registerMutation.isPending ? (
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
              Signing Up...
            </>
          ) : (
            'Sign Up'
          )}
        </button>
      </form>
      <div className='flex items-center justify-end px-2 mt-4'>
        <p className='font-light text-sm text-movie-white font-mont'>
          Need help?
        </p>
      </div>
      <div className='flex flex-col gap-1 mt-5'>
        <div className='flex flex-row justify-start items-center mt-6 gap-2'>
          <p className='text-sm text-movie-white font-mont '>
            Are you already a member?
          </p>
          <button
            className='text-sm text-movie-duck font-mont font-semibold hover:underline'
            onClick={onSignUp}
          >
            Sign in now.
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
