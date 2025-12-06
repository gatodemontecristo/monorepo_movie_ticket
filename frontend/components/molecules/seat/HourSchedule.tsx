import { HourTime } from '@/components/atoms';
import React from 'react';

interface HourScheduleProps {
  hours: string[];
  title: string;
}
export const HourSchedule = ({ hours, title }: HourScheduleProps) => {
  return (
    <>
      <p className='font-caros text-movie-white text-lg'>{title}</p>
      <div className='flex flex-row gap-2 flex-wrap'>
        {hours.map((hour, index) => (
          <HourTime text={hour} key={index} />
        ))}
      </div>
    </>
  );
};
