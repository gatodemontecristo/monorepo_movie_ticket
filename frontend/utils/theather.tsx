import { LINES_THEATHER_A, LINES_THEATHER_B, ROWS_THEATHER } from '@/constants';
import { LineTheather, MovieTheather, SeatWithTicket } from '@/types';

export const getMovieTheather = (seats: SeatWithTicket[]): MovieTheather[] => {
  const occupiedPositions = new Set(
    seats.map(seat => `${seat.row}-${seat.column}`),
  );

  const movieTheather = ROWS_THEATHER.map((row, indexR) => ({
    row,
    lines: LINES_THEATHER_A.map(number => ({
      number,
      state: occupiedPositions.has(`${indexR + 1}-${number}`)
        ? 'unavailable'
        : 'available',
    })) as LineTheather[],
    other_lines: LINES_THEATHER_B.map(number => ({
      number,
      state: occupiedPositions.has(`${indexR + 1}-${number}`)
        ? 'unavailable'
        : 'available',
    })) as LineTheather[],
  }));
  return movieTheather;
};
