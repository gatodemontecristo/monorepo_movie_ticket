'use client';
import { DashedLine, TitleTicket } from '@/components/atoms';
import { DEFAULT_REGION } from '@/constants';
import { MovieTheather } from '@/types';
import { DayProps, getCountryName, getTotal } from '@/utils';
import React, { createContext, useContext } from 'react';

interface FormTicketProps {
  country: string;
  hourSelected: string;
  days: DayProps[];
  state: MovieTheather[];
}
interface MainFormTicketProps extends FormTicketProps {
  children?: React.ReactNode;
  button?: React.ReactNode;
}
const FormTicketContext = createContext<FormTicketProps>({
  country: DEFAULT_REGION,
  hourSelected: '',
  days: [],
  state: [],
});

const FormTicketRoot = ({
  children,
  country,
  hourSelected,
  days,
  state,
  button,
}: MainFormTicketProps) => {
  return (
    <FormTicketContext.Provider value={{ country, hourSelected, days, state }}>
      <div className='flex flex-col w-1/4 relative justify-start items-start'>
        <div className='aux-container bg-movie-grey flex flex-col px-10 pt-8 pb-10 w-[90%] items-center rounded-lg gap-2'>
          {children}
        </div>
        <div
          className='aux-container-2 bg-movie-grey flex flex-col  w-[90%] items-center
             rounded-lg'
        >
          {button}
        </div>
      </div>
    </FormTicketContext.Provider>
  );
};

const FormTicketTitle = ({ title }: { title: string }) => {
  return (
    <>
      <TitleTicket title={title} />
      <DashedLine />
    </>
  );
};
const FormTicketCountry = ({ title }: { title: string }) => {
  const { country } = useContext(FormTicketContext);
  return (
    <div className='text-movie-white flex flex-row justify-between w-full font-mont text-sm font-bold'>
      <p>{title}</p>
      <p>{getCountryName(country)}</p>
    </div>
  );
};
const FormTicketInfoCountry = () => {
  const { days, hourSelected } = useContext(FormTicketContext);
  return (
    <div className='text-movie-white flex flex-row justify-between w-full font-mont text-sm'>
      <div className='flex flex-col'>
        <p>{days.find(day => day.highlight)?.dayOfWeek}</p>
        <p className='text-xs italic'>{hourSelected || 'No time available'}</p>
      </div>
      <p>{days.find(day => day.highlight)?.format}</p>
    </div>
  );
};

const FormTicketTotal = ({ title }: { title: string }) => {
  const { state } = useContext(FormTicketContext);
  return (
    <>
      <DashedLine />
      <div className='text-movie-white flex flex-row justify-between w-full font-mont text-sm font-semibold'>
        <p>{title}</p>
        <p>${getTotal(state)}</p>
      </div>
    </>
  );
};

export const FormTicketMain = Object.assign(FormTicketRoot, {
  Title: FormTicketTitle,
  Country: FormTicketCountry,
  InfoCountry: FormTicketInfoCountry,
  Total: FormTicketTotal,
});
