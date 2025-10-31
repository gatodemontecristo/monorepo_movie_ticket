import React from 'react';
import { MdError } from 'react-icons/md';

interface MsgErrorProps {
  message: string;
  type?: 'complex' | 'simple';
}
export const MsgError = ({ message, type = 'complex' }: MsgErrorProps) => {
  if (type === 'complex') {
    return (
      <div className='bg-red-500/10 border border-red-500/20 rounded-lg p-3 mt-2 flex flex-row items-center justify-between'>
        <p className='text-red-400 text-sm font-mont'>{message}</p>
        <MdError className='text-red-400 text-lg' />
      </div>
    );
  } else {
    return (
      <p className='text-red-400 text-sm mt-1 ms-2 font-mont'>{message}</p>
    );
  }
};
