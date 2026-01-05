import { ButtonUserSign } from '@/components/atoms';
import { User } from '@/types';
import React from 'react';
import { FaSignOutAlt, FaUserCircle } from 'react-icons/fa';

const UserEmailText = ({ email }: { email: string }) => {
  return (
    <h3 className='text-movie-white font-mont font-semibold md:text-lg text-base truncate'>
      {email}
    </h3>
  );
};
const UserEmailId = ({ id }: { id: string }) => {
  return (
    <p className='text-movie-white/60 text-sm font-mont truncate'>
      User ID: {id?.slice(0, 8)}...
    </p>
  );
};
const UserStatusOnline = () => {
  return (
    <div className='space-y-3 mb-4'>
      <div className='flex justify-between items-center'>
        <span className='text-movie-white/70 text-sm font-mont'>Status:</span>
        <span className='text-green-400 text-sm font-mont flex items-center gap-1'>
          <div className='w-2 h-2 bg-green-400 rounded-full'></div>
          Online
        </span>
      </div>
    </div>
  );
};

const UserNotFound = () => {
  return (
    <p className='text-movie-white/70 font-mont mb-4'>No user logged in</p>
  );
};

const UserDarkArrow = () => {
  return (
    <div className='absolute -top-2 right-6 w-4 h-4 bg-movie-black/95 border-l border-t border-movie-duck/20 transform rotate-45'></div>
  );
};
interface UserStatusDialogProps {
  currentUser?: User;
  isPending?: boolean;
  onLogout: () => void;
}
export const UserStatusDialog = ({
  currentUser,
  isPending,
  onLogout,
}: UserStatusDialogProps) => {
  return (
    <>
      <UserDarkArrow />
      {currentUser ? (
        <div className='p-6'>
          <div className='flex items-center gap-4 mb-4 pb-4 border-b border-movie-duck/10'>
            <div className='w-12 h-12 bg-movie-duck/20 rounded-full flex items-center justify-center'>
              <FaUserCircle className='text-movie-duck text-2xl' />
            </div>
            <div className='min-w-0'>
              <UserEmailText email={currentUser.email} />
              <UserEmailId id={currentUser.id || ''} />
            </div>
          </div>
          <UserStatusOnline />
          <div className='flex flex-col gap-2'>
            <ButtonUserSign
              isPending={isPending}
              onLogout={onLogout}
              text='Sign Out'
            />
          </div>
        </div>
      ) : (
        <div className='p-6 text-center flex flex-col items-center  justify-center'>
          <FaUserCircle className='text-movie-duck text-4xl mx-auto mb-3' />
          <UserNotFound />
          <ButtonUserSign
            isPending={isPending}
            onLogout={onLogout}
            text='Sign In'
            icon={<FaSignOutAlt className='text-movie-black' />}
          />
        </div>
      )}
    </>
  );
};
