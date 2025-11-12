import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { SeatService } from '@/services';
import { queryKeys } from '@/lib/query-keys';
import {
  CreateSeatDto,
  UpdateSeatDto,
  SeatFilters,
  Seat,
  SeatPositionQuery,
  TheaterSeat,
  SeatOccupancyStats,
} from '@/types/seat';
import { STALE_TIME_TANSTACK, REFETCH_INTERVAL_TANSTACK } from '@/constants';

// ==========================================
// HOOKS DE CONSULTA (READ)
// ==========================================

/**
 * Hook para obtener todos los asientos
 */
export const useAllSeats = () => {
  return useQuery({
    queryKey: queryKeys.seats.lists(),
    queryFn: SeatService.getAllSeats,
    staleTime: STALE_TIME_TANSTACK,
    refetchInterval: REFETCH_INTERVAL_TANSTACK,
  });
};

/**
 * Hook para obtener un asiento específico por ID
 */
export const useSeatById = (seatId: string) => {
  return useQuery({
    queryKey: queryKeys.seats.detail(seatId),
    queryFn: () => SeatService.getSeatById(seatId),
    enabled: !!seatId, // Solo ejecutar si tenemos un ID válido
    staleTime: STALE_TIME_TANSTACK,
  });
};

/**
 * Hook para obtener asientos por ID de ticket
 */
export const useSeatsByTicketId = (ticketId: string) => {
  return useQuery({
    queryKey: queryKeys.seats.byTicket(ticketId),
    queryFn: () => SeatService.getSeatsByTicketId(ticketId),
    enabled: !!ticketId,
    staleTime: STALE_TIME_TANSTACK,
  });
};

/**
 * Hook para obtener asientos por ID de película (incluye tickets)
 */
export const useSeatsByMovieId = (movieId: number) => {
  return useQuery({
    queryKey: queryKeys.seats.byMovie(movieId),
    queryFn: () => SeatService.getSeatsByMovieId(movieId),
    enabled: !!movieId && movieId > 0,
    staleTime: STALE_TIME_TANSTACK,
  });
};

/**
 * Hook para buscar asiento por posición específica
 */
export const useSeatByPosition = (query: SeatPositionQuery) => {
  const { row, column, ticketId } = query;

  return useQuery({
    queryKey: queryKeys.seats.byPosition(row, column, ticketId),
    queryFn: () => SeatService.getSeatByPosition(query),
    enabled: !!row && !!column && !!ticketId && row > 0 && column > 0,
    staleTime: STALE_TIME_TANSTACK,
  });
};

/**
 * Hook para obtener asientos con filtros
 */
export const useSeatsWithFilters = (filters?: SeatFilters) => {
  return useQuery({
    queryKey: queryKeys.seats.list(filters),
    queryFn: () => SeatService.getSeatsWithFilters(filters),
    staleTime: STALE_TIME_TANSTACK,
  });
};

/**
 * Hook para verificar si un asiento está ocupado
 */
export const useIsSeatOccupied = (
  row: number,
  column: number,
  ticketId: string,
) => {
  return useQuery({
    queryKey: ['seats', 'occupied', { row, column, ticketId }],
    queryFn: () => SeatService.isSeatOccupied(row, column, ticketId),
    enabled: !!row && !!column && !!ticketId && row > 0 && column > 0,
    staleTime: STALE_TIME_TANSTACK,
  });
};

// ==========================================
// HOOKS DE MUTACIÓN (CREATE, UPDATE, DELETE)
// ==========================================

/**
 * Hook para crear un nuevo asiento
 */
export const useCreateSeat = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (seatData: CreateSeatDto) => SeatService.createSeat(seatData),
    onSuccess: (newSeat: Seat) => {
      // Invalidar queries relacionadas
      queryClient.invalidateQueries({ queryKey: queryKeys.seats.all });

      // Invalidar también queries de tickets relacionados
      queryClient.invalidateQueries({
        queryKey: queryKeys.tickets.detail(newSeat.idticket),
      });

      // Agregar el nuevo asiento al cache optimísticamente
      queryClient.setQueryData<Seat[]>(
        queryKeys.seats.lists(),
        (oldData = []) => [newSeat, ...oldData],
      );
    },
    onError: () => {
      // Error handling se puede manejar en el componente
    },
  });
};

/**
 * Hook para crear múltiples asientos
 */
export const useCreateMultipleSeats = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (seatsData: CreateSeatDto[]) =>
      SeatService.createMultipleSeats(seatsData),
    onSuccess: (newSeats: Seat[]) => {
      // Invalidar todas las queries de asientos
      queryClient.invalidateQueries({ queryKey: queryKeys.seats.all });

      // Invalidar queries de tickets relacionados
      const ticketIds = [...new Set(newSeats.map(seat => seat.idticket))];
      ticketIds.forEach(ticketId => {
        queryClient.invalidateQueries({
          queryKey: queryKeys.tickets.detail(ticketId),
        });
      });
    },
    onError: () => {
      // Error handling se puede manejar en el componente
    },
  });
};

/**
 * Hook para actualizar un asiento existente
 */
export const useUpdateSeat = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<UpdateSeatDto> }) =>
      SeatService.updateSeat(id, data),
    onSuccess: (updatedSeat: Seat) => {
      // Actualizar el cache del asiento específico
      queryClient.setQueryData(
        queryKeys.seats.detail(updatedSeat.id),
        updatedSeat,
      );

      // Invalidar listas para asegurar consistencia
      queryClient.invalidateQueries({ queryKey: queryKeys.seats.lists() });

      // Invalidar ticket relacionado
      queryClient.invalidateQueries({
        queryKey: queryKeys.tickets.detail(updatedSeat.idticket),
      });
    },
    onError: () => {
      // Error handling se puede manejar en el componente
    },
  });
};

/**
 * Hook para eliminar un asiento
 */
export const useDeleteSeat = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (seatId: string) => SeatService.deleteSeat(seatId),
    onSuccess: (_, seatId) => {
      // Remover el asiento del cache
      queryClient.removeQueries({ queryKey: queryKeys.seats.detail(seatId) });

      // Actualizar listas removiendo el asiento eliminado
      queryClient.setQueryData<Seat[]>(
        queryKeys.seats.lists(),
        (oldData = []) => oldData.filter(seat => seat.id !== seatId),
      );

      // Invalidar todas las queries relacionadas
      queryClient.invalidateQueries({ queryKey: queryKeys.seats.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.tickets.all });
    },
    onError: () => {
      // Error handling se puede manejar en el componente
    },
  });
};

/**
 * Hook para eliminar múltiples asientos
 */
export const useDeleteMultipleSeats = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (seatIds: string[]) => SeatService.deleteMultipleSeats(seatIds),
    onSuccess: (_, seatIds) => {
      // Remover asientos del cache
      seatIds.forEach(seatId => {
        queryClient.removeQueries({ queryKey: queryKeys.seats.detail(seatId) });
      });

      // Invalidar todas las queries relacionadas
      queryClient.invalidateQueries({ queryKey: queryKeys.seats.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.tickets.all });
    },
    onError: () => {
      // Error handling se puede manejar en el componente
    },
  });
};

// ==========================================
// HOOKS COMPUESTOS Y UTILIDADES
// ==========================================

/**
 * Hook para obtener estadísticas de asientos
 */
export const useSeatStats = (seats?: Seat[]) => {
  const { data: allSeats = [], isLoading, error } = useAllSeats();
  const seatsToAnalyze = seats || allSeats;

  const stats: SeatOccupancyStats =
    SeatService.calculateOccupancyStats(seatsToAnalyze);

  return {
    stats,
    isLoading: seats ? false : isLoading,
    error: seats ? undefined : error,
  };
};

/**
 * Hook para gestión completa de un asiento (CRUD)
 */
export const useSeatManagement = (seatId?: string) => {
  const seatQuery = seatId ? useSeatById(seatId) : undefined;
  const createMutation = useCreateSeat();
  const createMultipleMutation = useCreateMultipleSeats();
  const updateMutation = useUpdateSeat();
  const deleteMutation = useDeleteSeat();
  const deleteMultipleMutation = useDeleteMultipleSeats();

  return {
    // Datos del asiento
    seat: seatQuery?.data,
    isLoading: seatQuery?.isLoading || false,
    isError: seatQuery?.isError || false,
    error: seatQuery?.error,

    // Acciones CRUD
    createSeat: createMutation.mutate,
    createMultipleSeats: createMultipleMutation.mutate,
    updateSeat: (data: Partial<UpdateSeatDto>) =>
      seatId && updateMutation.mutate({ id: seatId, data }),
    deleteSeat: () => seatId && deleteMutation.mutate(seatId),
    deleteMultipleSeats: deleteMultipleMutation.mutate,

    // Estados de las mutaciones
    isCreating: createMutation.isPending,
    isCreatingMultiple: createMultipleMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isDeletingMultiple: deleteMultipleMutation.isPending,

    // Errores de las mutaciones
    createError: createMutation.error,
    createMultipleError: createMultipleMutation.error,
    updateError: updateMutation.error,
    deleteError: deleteMutation.error,
    deleteMultipleError: deleteMultipleMutation.error,
  };
};

/**
 * Hook para gestión de asientos de teatro con funcionalidades visuales
 */
export const useTheaterSeats = (
  seats: Seat[],
  allPossiblePositions?: Array<{ row: number; column: number }>,
) => {
  // Convertir a asientos de teatro
  const theaterSeats: TheaterSeat[] = SeatService.convertToTheaterSeats(
    seats,
    allPossiblePositions,
  );

  // Estado para asientos seleccionados (se puede usar useState en el componente)
  const groupedByRow = SeatService.groupSeatsByRow(seats);
  const sortedSeats = SeatService.sortSeatsByPosition(seats);
  const occupancyStats = SeatService.calculateOccupancyStats(seats);

  return {
    theaterSeats,
    groupedByRow,
    sortedSeats,
    occupancyStats,
    utils: {
      formatPosition: SeatService.formatSeatPosition,
      parsePosition: SeatService.parseSeatPosition,
      getSummary: (selectedSeats: Seat[]) =>
        SeatService.getSeatsSummary(selectedSeats),
      findConsecutive: (requestedCount: number, preferredRow?: number) =>
        SeatService.findBestConsecutiveSeats(
          seats,
          requestedCount,
          preferredRow,
        ),
      getAdjacent: SeatService.getAdjacentPositions,
    },
  };
};

/**
 * Hook para filtrar asientos con funcionalidad de búsqueda
 */
export const useFilteredSeats = (filters: SeatFilters) => {
  const { data: allSeats = [], ...queryState } = useAllSeats();

  const filteredSeats = allSeats.filter(seat => {
    if (filters.ticketId && seat.idticket !== filters.ticketId) return false;
    if (filters.row && seat.row !== filters.row) return false;
    if (filters.column && seat.column !== filters.column) return false;
    if (filters.minRow && seat.row < filters.minRow) return false;
    if (filters.maxRow && seat.row > filters.maxRow) return false;
    if (filters.minColumn && seat.column < filters.minColumn) return false;
    if (filters.maxColumn && seat.column > parseInt(filters.maxColumn))
      return false;
    return true;
  });

  return {
    seats: filteredSeats,
    totalCount: allSeats.length,
    filteredCount: filteredSeats.length,
    ...queryState,
  };
};

/**
 * Hook para obtener asientos de un ticket con funcionalidades de teatro
 */
export const useTicketSeatsWithTheater = (ticketId: string) => {
  const seatsQuery = useSeatsByTicketId(ticketId);

  const theaterData = useTheaterSeats(seatsQuery.data || []);

  return {
    seats: seatsQuery.data || [],
    isLoading: seatsQuery.isLoading,
    isError: seatsQuery.isError,
    error: seatsQuery.error,
    refetch: seatsQuery.refetch,
    ...theaterData,
  };
};

/**
 * Hook para obtener asientos de una película con estadísticas
 */
export const useMovieSeatsWithStats = (movieId: number) => {
  const seatsQuery = useSeatsByMovieId(movieId);

  // Extraer solo los asientos (sin información del ticket para stats básicas)
  const seats =
    seatsQuery.data?.map(seatWithTicket => ({
      id: seatWithTicket.id,
      column: seatWithTicket.column,
      row: seatWithTicket.row,
      idticket: seatWithTicket.idticket,
      createdAt: seatWithTicket.createdAt,
      updatedAt: seatWithTicket.updatedAt,
    })) || [];

  const stats = useSeatStats(seats);
  const theaterData = useTheaterSeats(seats);

  return {
    seatsWithTickets: seatsQuery.data || [],
    seats,
    isLoading: seatsQuery.isLoading,
    isError: seatsQuery.isError,
    error: seatsQuery.error,
    refetch: seatsQuery.refetch,
    stats: stats.stats,
    ...theaterData,
  };
};

/**
 * Hook para prefetch de asientos relacionados
 */
export const usePrefetchRelatedSeats = (
  ticketId?: string,
  movieId?: number,
) => {
  const queryClient = useQueryClient();

  const prefetchByTicket = (id: string) => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.seats.byTicket(id),
      queryFn: () => SeatService.getSeatsByTicketId(id),
      staleTime: STALE_TIME_TANSTACK,
    });
  };

  const prefetchByMovie = (id: number) => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.seats.byMovie(id),
      queryFn: () => SeatService.getSeatsByMovieId(id),
      staleTime: STALE_TIME_TANSTACK,
    });
  };

  return {
    prefetchByTicket,
    prefetchByMovie,
    prefetchCurrentTicket: ticketId
      ? () => prefetchByTicket(ticketId)
      : undefined,
    prefetchCurrentMovie: movieId ? () => prefetchByMovie(movieId) : undefined,
  };
};
