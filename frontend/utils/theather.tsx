import {
  LIMIT_SEATS,
  LINES_THEATHER_A,
  LINES_THEATHER_B,
  ROWS_THEATHER,
  TIMES_SCHEDULE,
} from '@/constants';
import { LineTheather, MovieTheather, SeatWithTicket } from '@/types';
import { isPastTime } from './format';

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

export const getTotal = (state: MovieTheather[]) => {
  let total = 0;
  state.forEach(theater => {
    theater.lines.forEach(line => {
      if (line.state === 'selected') {
        total += 20.99;
      }
    });
    theater.other_lines.forEach(other_line => {
      if (other_line.state === 'selected') {
        total += 20.99;
      }
    });
  });
  return total.toFixed(2);
};

export const getNotAvailableWSeats = (state: MovieTheather[]) => {
  let notAvailable = true;
  state.forEach(theater => {
    theater.lines.forEach(line => {
      if (line.state === 'selected') {
        notAvailable = false;
      }
    });
    theater.other_lines.forEach(other_line => {
      if (other_line.state === 'selected') {
        notAvailable = false;
      }
    });
  });

  return notAvailable;
};
export const getCountSeatsSelected = (state: MovieTheather[]): boolean => {
  let cont = 0;
  state.forEach(theater => {
    theater.lines.forEach(line => {
      if (line.state === 'selected') {
        cont++;
      }
    });
    theater.other_lines.forEach(other_line => {
      if (other_line.state === 'selected') {
        cont++;
      }
    });
  });
  if (cont >= LIMIT_SEATS) {
    return true;
  } else {
    return false;
  }
};

export const getDefaultHour = () => {
  const defaultHour =
    TIMES_SCHEDULE.find(hour => {
      return !isPastTime(hour);
    }) || '';
  return defaultHour;
};
