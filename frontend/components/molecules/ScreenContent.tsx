import React from 'react';
import { GeneralLoader } from '../atoms';
interface ScreenContentProps {
  isLoading: boolean;
  children: React.ReactNode;
  outside?: boolean;
}
export const ScreenContent = ({
  isLoading,
  children,
  outside = false,
}: ScreenContentProps) => {
  return !outside ? (
    <div className='relative overflow-hidden h-screen w-screen'>
      {isLoading ? <GeneralLoader></GeneralLoader> : children}
    </div>
  ) : (
    <>
      {isLoading ? (
        <div className='relative overflow-hidden h-screen w-screen'>
          <GeneralLoader></GeneralLoader>
        </div>
      ) : (
        children
      )}
    </>
  );
};
