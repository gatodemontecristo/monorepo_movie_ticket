'use client';
import React from 'react';
import clsx from 'clsx';
// import { Itembar } from './Itembar';
// import { nanoid } from 'nanoid';
import { menuItems, SITE_NAME } from '@/constants';
import { nanoid } from 'nanoid';
import { Itembar } from './Itembar';
import { LogoWeb } from '@/components/atoms';
import Link from 'next/link';
// import { Itemextra } from './Itemextra';

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}
export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <div>
      <div
        className={clsx(
          'fixed left-0 top-0 lg:w-1/5 md:w-1/2 w-4/6 h-full p-8 shadow-lg bg-ghibli-black  transform transition-transform duration-500 ease-in-out z-99 bg-movie-black',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className='flex flex-col h-full'>
          <div className='flex flex-row gap-2 items-center mb-10'>
            <Link
              href={{
                pathname: '/movies',
              }}
            >
              <LogoWeb
                webname={SITE_NAME}
                direction='row'
                size='large'
              ></LogoWeb>
            </Link>
          </div>
          <div className='flex flex-col h-full gap-5'>
            {menuItems.map(item => (
              <Itembar key={nanoid()} {...item}></Itembar>
            ))}
          </div>
          {/* <Itemextra
            img='/ghibli-web/icon_kinen.png'
            title='Github creator'
            secondary='Erick Dejo Vicente'
            onClick={() =>
              window.open(
                'https://github.com/gatodemontecristo/ghibli-dashboard',
                '_blank',
              )
            }
          ></Itemextra> */}
        </div>
      </div>
      {isOpen && (
        <div
          className='fixed inset-0 bg-black opacity-0 z-40'
          onClick={onClose}
        ></div>
      )}
    </div>
  );
};
