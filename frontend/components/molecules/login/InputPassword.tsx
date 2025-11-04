import { MsgError } from '@/components/atoms';
import React from 'react';
import { UseFormRegister, Validate } from 'react-hook-form';

interface InputPasswordProps {
  errorMsg: string | undefined;
  requiredMsg?: string;
  placeholder: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  name: string;
  validate?: // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | Validate<string, any>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | Record<string, Validate<string, any>>
    | undefined;
}

export const InputPassword = ({
  errorMsg,
  requiredMsg = 'Password is required',
  placeholder,
  register,
  name,
  validate,
}: InputPasswordProps) => {
  return (
    <>
      <input
        {...register(name, {
          required: requiredMsg,
          validate: validate,
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters',
          },
        })}
        type='password'
        placeholder={placeholder}
        className={`w-full px-4 py-3 bg-white rounded-lg border transition-all duration-200 font-mont text-gray-800 placeholder-gray-500   border-gray-300 focus:border-movie-duck focus:ring-movie-duck/20 focus:outline-none focus:ring-2`}
      />
      {errorMsg && <MsgError message={errorMsg} type='simple' />}
    </>
  );
};
