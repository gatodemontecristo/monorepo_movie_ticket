'use client';
import { ButtonDaySelected } from '@/components/atoms';
import { useTheaterStore } from '@/store';
import { DayProps } from '@/utils';
import { nanoid } from 'nanoid';
import React from 'react';

export const DaySelected = () => {
  const { days, setDays } = useTheaterStore();

  return (
    <div className='flex gap-2'>
      {days.map((day, idx) => (
        <ButtonDaySelected
          key={nanoid()}
          highlight={day.highlight}
          type={day.type}
          label={day.label}
          onClick={() => {
            if (day.type !== 'past') {
              setDays(
                days.map((d, i) =>
                  i === idx
                    ? { ...d, highlight: true }
                    : { ...d, highlight: false },
                ) as DayProps[],
              );
            }
          }}
        />
      ))}
    </div>
  );
};
