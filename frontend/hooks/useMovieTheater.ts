'use client';
import { LineTheather, MovieTheather, SeatPosition } from '@/types';
import { useReducer } from 'react';
export type ActionTheater =
  | {
      type: 'select';
      payload: SeatPosition;
    }
  | { type: 'occupied'; payload: SeatPosition[] };
export const useMovieTheater = (initialState: MovieTheather[]) => {
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

      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(MovieReducer, initialState);
  return { state, dispatch };
};
