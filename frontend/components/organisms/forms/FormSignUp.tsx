'use client';
import { GeneralLoader, MsgError } from '@/components/atoms';
import { InputEmail, InputPassword } from '@/components/molecules';
import { useRegister } from '@/hooks';
import { RegisterUserDto } from '@/types';
import { Notyf } from 'notyf';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
interface SignUpFormData extends RegisterUserDto {
  confirmPassword: string;
}
interface FormSignUpProps {
  fnExtra?: () => void;
}
export const FormSignUp = ({ fnExtra }: FormSignUpProps) => {
  const notyf = new Notyf();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpFormData>();
  const { mutateAsync: signup, isError, error, isPending } = useRegister();
  const [errorLogin, setErrorLogin] = useState<string | null>(null);
  const watchPassword = watch('password');

  const onSubmit = async (
    data: SignUpFormData,
    event?: React.BaseSyntheticEvent,
  ) => {
    event?.preventDefault();
    try {
      setErrorLogin(null);
      await signup({
        email: data.email,
        password: data.password,
      });
      if (fnExtra) fnExtra();
      notyf.success('Signup successful!');
    } catch (error) {
      setErrorLogin('Signup failed: ' + error);
    }
  };
  return (
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
      <InputPassword
        errorMsg={errors.confirmPassword?.message}
        placeholder='Confirm your password'
        register={register}
        name='confirmPassword'
        requiredMsg='Please confirm your password'
        validate={value => value === watchPassword || 'Passwords do not match'}
      />

      {isError && (
        <MsgError
          message={error?.message || 'Registration failed. Please try again.'}
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
          className='w-full bg-movie-duck hover:bg-movie-duck/90 disabled:bg-movie-duck/50 disabled:cursor-not-allowed text-movie-black font-mont font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:hover:scale-100 mt-6 flex items-center justify-center'
        >
          Sign Up
        </button>
      )}
    </form>
  );
};
