'use client';
import { Notyf } from 'notyf';
import { useState } from 'react';
import { useCurrentUser } from './useUser';
import { useMovieDetails } from './useMovies';
import { useTheaterStore } from '@/store';
import { getCountryName, getTotal } from '@/utils';
import { useCreateTicket } from './useTickets';
import { useCreateMultipleSeats } from './useSeats';
import { useMovieTheater } from './useMovieTheater';
import { useRouter } from 'next/navigation';

export const usePayment = () => {
  const [movieId, setMovieId] = useState<number | null>(null);
  const router = useRouter();
  const createTicketMutation = useCreateTicket();
  const createMultipleSeatsMutation = useCreateMultipleSeats();
  const { data: movie, error, isLoading } = useMovieDetails(movieId || 0);
  const { days, hourSelected, setHourSelected } = useTheaterStore();
  const [country, setCountry] = useState('US');

  const {
    state,
    dispatch,
    isLoading: isLoadingTheater,
  } = useMovieTheater(movieId || 0);
  const [isLoadingService, setIsLoadingService] = useState(false);
  const currentUser = useCurrentUser();

  const handlePayment = async () => {
    setIsLoadingService(true);
    const notyf = new Notyf();

    try {
      if (!currentUser) {
        notyf.error('User not authenticated');
        return;
      }

      if (!movie) {
        notyf.error('Movie information not available');
        return;
      }

      // Get selected day
      const selectedDay = days.find(day => day.highlight);
      if (!selectedDay) {
        notyf.error('Please select a day');
        return;
      }

      // Validate that there's a selected time
      if (!hourSelected) {
        notyf.error('Please select a time');
        return;
      }

      // Get selected seats
      const selectedSeats: Array<{ row: string; number: number }> = [];
      state.forEach(theater => {
        theater.lines.forEach(line => {
          if (line.state === 'selected') {
            selectedSeats.push({ row: theater.row, number: line.number });
          }
        });
        theater.other_lines.forEach(other_line => {
          if (other_line.state === 'selected') {
            selectedSeats.push({ row: theater.row, number: other_line.number });
          }
        });
      });

      if (selectedSeats.length === 0) {
        notyf.error('Please select at least one seat');
        return;
      }

      // Prepare ticket data
      const ticketData = {
        iduser: currentUser.id,
        idmovie: movie.id,
        price: parseFloat(getTotal(state)),
        day: selectedDay.date.toISOString().split('T')[0], // YYYY-MM-DD format
        hour: hourSelected,
        location: getCountryName(country),
        movieName: movie.title,
      };

      // 1. Create the ticket
      const createdTicket = await createTicketMutation.mutateAsync(ticketData);

      // 2. Prepare seat positions (convert row string to number)

      const seatPositions = selectedSeats.map(seat => {
        // Convert row letter to number (A=1, B=2, etc.)
        const rowNumber = seat.row.charCodeAt(0) - 64;
        return {
          row: rowNumber,
          column: seat.number,
        };
      });

      // 3. Create multiple seats
      await createMultipleSeatsMutation.mutateAsync({
        ticketId: createdTicket.idticket,
        seatPositions: seatPositions,
      });
      // 4. Redirect to history with success message
      router.push(
        `/movies/history?message=${encodeURIComponent('Ticket and seats created successfully!')}`,
      );
    } catch (error) {
      notyf.error('Failed to create ticket. Please try again.');
    } finally {
      setIsLoadingService(false);
    }
  };
  return {
    handlePayment,
    isLoadingService,
    setMovieId,
    movie,
    error,
    isLoading,
    movieId,
    country,
    setCountry,
    dispatch,
    isLoadingTheater,
    state,
    hourSelected,
    setHourSelected,
    days,
  };
};
