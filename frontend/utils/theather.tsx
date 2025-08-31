import { LINES_THEATHER_A, LINES_THEATHER_B, ROWS_THEATHER } from '@/constants';
import { LineTheather, MovieTheather } from '@/types';

export const getMovieTheather = (): MovieTheather[] => {
  return ROWS_THEATHER.map(row => ({
    row,
    lines: LINES_THEATHER_A.map(number => ({
      number,
      state: 'available',
    })) as LineTheather[],
    other_lines: LINES_THEATHER_B.map(number => ({
      number,
      state: 'available',
    })) as LineTheather[],
  }));
};
