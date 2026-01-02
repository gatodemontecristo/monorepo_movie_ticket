import React from 'react';
import { ButtonCircle } from '../atoms';
import {
  GITHUB_URL,
  LEETCODE_URL,
  LETTERBOXD_URL,
  LINKEDIN_URL,
  LinkSection,
} from '@/constants';
import { FaGithub, FaLinkedin, FaSquareLetterboxd } from 'react-icons/fa6';
import { SiLeetcode } from 'react-icons/si';
import { LinkCollection } from '../molecules';
import { nanoid } from 'nanoid';

const FooterSection = ({ children }: { children?: React.ReactNode }) => {
  return <div className='bg-movie-yellow flex flex-col mt-10'>{children}</div>;
};

const FooterSocial = ({ label }: { label: string }) => {
  const windowOpen = (url: string) => {
    window.open(url, '_blank');
  };
  return (
    <div className='flex flex-row items-center justify-between py-5 md:px-10 px-5'>
      <p className='text-movie-black font-mont md:text-base text-sm'>{label}</p>
      <div className='flex flex-row gap-1'>
        <ButtonCircle type='filled' onClick={() => windowOpen(LINKEDIN_URL)}>
          <FaLinkedin className='md:w-5 md:h-5 w-4 h-4 p-0.5' />
        </ButtonCircle>
        <ButtonCircle type='filled' onClick={() => windowOpen(GITHUB_URL)}>
          <FaGithub className='md:w-5 md:h-5 w-4 h-4 p-0.5' />
        </ButtonCircle>
        <ButtonCircle type='filled' onClick={() => windowOpen(LEETCODE_URL)}>
          <SiLeetcode className='md:w-5 md:h-5 w-4 h-4 p-0.5' />
        </ButtonCircle>
        <ButtonCircle type='filled' onClick={() => windowOpen(LETTERBOXD_URL)}>
          <FaSquareLetterboxd className='md:w-5 md:h-5 w-4 h-4 p-0.5' />
        </ButtonCircle>
      </div>
    </div>
  );
};

const FooterLine = () => {
  return <div className='border-t border-1 border-movie-black'></div>;
};

const FooterLinks = ({ collection }: { collection: LinkSection[] }) => {
  return (
    <footer className='flex flex-row w-full flex-wrap items-start gap-y-5 justify-around py-5 md:px-10 px-5 mt-5 mb-5'>
      {collection.map(section => (
        <LinkCollection
          key={nanoid()}
          collection={section.links}
          title={section.title}
        />
      ))}
    </footer>
  );
};

FooterSection.Social = FooterSocial;
FooterSection.Line = FooterLine;
FooterSection.Links = FooterLinks;

export default FooterSection;
