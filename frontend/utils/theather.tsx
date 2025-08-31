import { LINES_THEATHER, ROWS_THEATHER } from '@/constants';
import { LineTheather, MovieTheather } from '@/types';

export const getMovieTheather = (): MovieTheather[] => {
  return ROWS_THEATHER.map(row => ({
    row,
    lines: LINES_THEATHER.map(number => ({
      number,
      state: 'available',
    })) as LineTheather[],
  }));
};
