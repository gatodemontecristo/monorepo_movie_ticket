/* eslint-disable no-unused-vars */

import { DayProps, getDays, getDefaultHour } from '@/utils';
import { create } from 'zustand';

interface TheaaterStoreProps {
  days: DayProps[];
  hourSelected: string;
  setDays: (value: DayProps[]) => void;
  setHourSelected: (value: string) => void;
}
export const useTheaterStore = create<TheaaterStoreProps>(set => ({
  days: getDays(),
  setDays: (value: DayProps[]) => set({ days: value }),
  hourSelected: getDefaultHour(),
  setHourSelected: (value: string) => set({ hourSelected: value }),
}));
