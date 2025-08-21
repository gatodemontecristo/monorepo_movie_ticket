import React from 'react';
import { GeneralLoader } from '../atoms';
interface ScreenContentProps {
  isLoading: boolean;
  children: React.ReactNode;
}
export const ScreenContent = ({ isLoading, children }: ScreenContentProps) => {
  return (
    <div className='relative overflow-hidden h-screen w-screen'>
      {isLoading ? <GeneralLoader></GeneralLoader> : children}
    </div>
  );
};
