/* eslint-disable no-unused-vars */

import { DayProps, getDays } from '@/utils';
import { create } from 'zustand';

interface TheaaterStoreProps {
  days: DayProps[];
  setDays: (value: DayProps[]) => void;
}
export const useTheaterStore = create<TheaaterStoreProps>(set => ({
  days: getDays(),
  setDays: (value: DayProps[]) => set({ days: value }),
}));
