import { HourTime } from '@/components/atoms';
import React from 'react';

interface HourScheduleProps {
  hours: string[];
  title: string;
  selected: string;
  // eslint-disable-next-line no-unused-vars
  onSelect: (hour: string) => void;
}
export const HourSchedule = ({
  hours,
  title,
  selected,
  onSelect,
}: HourScheduleProps) => {
  return (
    <>
      <p className='font-caros text-movie-white text-lg'>{title}</p>
      <div className='flex flex-row gap-2 flex-wrap md:items-start items-center justify-center md:justify-start'>
        {hours.map((hour, index) => (
          <HourTime
            text={hour}
            key={index}
            selected={selected === hour}
            onSelect={() => onSelect(hour)}
          />
        ))}
      </div>
    </>
  );
};
