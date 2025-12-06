'use client';
import { LineTheather, MovieTheather, SeatPosition } from '@/types';
import { useEffect, useReducer } from 'react';
import { useSeatsByMovieId } from './useSeats';
import { getMovieTheather } from '@/utils';
export type ActionTheater =
  | {
      type: 'select';
      payload: SeatPosition;
    }
  | { type: 'occupied'; payload: SeatPosition[] }
  | { type: 'theather'; payload: MovieTheather[] };
export const useMovieTheater = (movieId: number) => {
  const { data: seats, isLoading, isError } = useSeatsByMovieId(movieId);
  const MovieReducer = (
    state: MovieTheather[],
    action: ActionTheater,
  ): MovieTheather[] => {
    switch (action.type) {
      case 'select':
        return state.map(theater => {
          if (theater.row !== action.payload.row) return theater;
          const updateLines = (lines: LineTheather[]) =>
            lines.map(seat =>
              seat.number === action.payload.line
                ? {
                    ...seat,
                    state:
                      seat.state === 'available' ? 'selected' : 'available',
                  }
                : seat,
            );

          return {
            ...theater,
            lines: updateLines(theater.lines),
            other_lines: updateLines(theater.other_lines),
          } as MovieTheather;
        });
      case 'occupied':
        return state.map(theater => {
          const occupiedSeats = action.payload.filter(
            seat => seat.row === theater.row,
          );
          if (occupiedSeats.length === 0) return theater;
          const updateLines = (lines: LineTheather[]) =>
            lines.map(seat => {
              const isOccupied = occupiedSeats.find(
                occSeat => occSeat.line === seat.number,
              );
              if (isOccupied) {
                return { ...seat, state: 'unavailable' };
              }
              return seat;
            });

          return {
            ...theater,
            lines: updateLines(theater.lines),
            other_lines: updateLines(theater.other_lines),
          } as MovieTheather;
        });
      case 'theather':
        return action.payload;

      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(MovieReducer, []);

  useEffect(() => {
    dispatch({ type: 'theather', payload: getMovieTheather(seats || []) });
  }, [seats]);
  return { state, dispatch, isLoading, isError };
};
