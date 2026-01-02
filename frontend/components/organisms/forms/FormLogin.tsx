'use client';

import { GeneralLoader, MsgError } from '@/components/atoms';
import { InputEmail, InputPassword } from '@/components/molecules';
import { MESSAGE_LOGIN } from '@/constants';
import { useLogin } from '@/hooks/useUser';
import { LoginUserDto } from '@/types/user';
import { useRouter, useSearchParams } from 'next/navigation';
import { Notyf } from 'notyf';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export const FormLogin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get('error');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserDto>();
  const { mutateAsync: login, isError, isPending, error } = useLogin();
  const [errorLogin, setErrorLogin] = useState<string | null>(null);

  // Show error message from URL parameter using Notyf
  useEffect(() => {
    if (errorMessage) {
      const notyf = new Notyf();
      notyf.error(decodeURIComponent(errorMessage));
    }
  }, [errorMessage]);

  const onSubmit = async (
    data: LoginUserDto,
    event?: React.BaseSyntheticEvent,
  ) => {
    event?.preventDefault();
    try {
      setErrorLogin(null);
      await login(data);

      // Check if there's a ticketId parameter to redirect back to the specific ticket page
      const ticketId = searchParams.get('ticketId');
      const originPath = searchParams.get('origin');
      if (ticketId) {
        router.push(
          `/movies/ticket/${ticketId}?message=${encodeURIComponent(MESSAGE_LOGIN)}`,
        );
      } else if (originPath) {
        router.push(
          `/movies/${originPath}?message=${encodeURIComponent(MESSAGE_LOGIN)}`,
        );
      } else {
        router.push(`/movies?message=${encodeURIComponent(MESSAGE_LOGIN)}`);
      }
    } catch (error) {
      setErrorLogin('Login failed: ' + error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col gap-2'
      method='POST'
      action=''
    >
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

      {isError && (
        <MsgError
          message={error?.message || 'Login failed. Please try again.'}
          type='complex'
        />
      )}
      {errorLogin && <MsgError message={errorLogin} type='complex' />}
      {isPending ? (
        <div className='relative flex flex-row justify-center my-10'>
          <GeneralLoader />
        </div>
      ) : (
        <button
          type='submit'
          disabled={isPending}
          className='w-full bg-movie-duck hover:bg-movie-duck/90 disabled:bg-movie-duck/50 disabled:cursor-not-allowed text-movie-black font-mont font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:hover:scale-100 mt-4 flex items-center justify-center'
        >
          {'Sign In'}
        </button>
      )}
    </form>
  );
};
