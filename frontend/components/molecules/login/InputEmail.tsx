import { MsgError } from '@/components/atoms';
import React from 'react';
import { UseFormRegister } from 'react-hook-form';

interface InputEmailProps {
  errorMsg: string | undefined;
  placeholder: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  name: string;
}
export const InputEmail = ({
  errorMsg,
  placeholder,
  register,
  name,
}: InputEmailProps) => {
  return (
    <>
      <input
        {...register(name, {
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address',
          },
        })}
        type='email'
        placeholder={placeholder}
        className={`w-full px-4 py-3 bg-white rounded-lg border transition-all duration-200 font-mont text-gray-800 placeholder-gray-500  border-gray-300 focus:border-movie-duck focus:ring-movie-duck/20 focus:outline-none focus:ring-2`}
      />
      {errorMsg && <MsgError message={errorMsg} type='simple' />}
    </>
  );
};
