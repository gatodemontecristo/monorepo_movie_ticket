import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { TicketService } from '@/services';
import { queryKeys } from '@/lib/query-keys';
import {
  CreateTicketDto,
  UpdateTicketDto,
  TicketFilters,
  Ticket,
} from '@/types/ticket';
import { STALE_TIME_TANSTACK, REFETCH_INTERVAL_TANSTACK } from '@/constants';

// ==========================================
// HOOKS DE CONSULTA (READ)
// ==========================================

/**
 * Hook para obtener todos los tickets del usuario autenticado
 */
export const useAllTickets = () => {
  return useQuery({
    queryKey: queryKeys.tickets.lists(),
    queryFn: TicketService.getAllTickets,
    staleTime: STALE_TIME_TANSTACK,
    refetchInterval: REFETCH_INTERVAL_TANSTACK,
  });
};

/**
 * Hook para obtener un ticket específico por ID (incluye asientos)
 */
export const useTicketById = (ticketId: string) => {
  return useQuery({
    queryKey: queryKeys.tickets.detail(ticketId),
    queryFn: () => TicketService.getTicketById(ticketId),
    enabled: !!ticketId, // Solo ejecutar si tenemos un ID válido
    staleTime: STALE_TIME_TANSTACK,
  });
};

/**
 * Hook para obtener tickets por ID de usuario
 */
export const useTicketsByUserId = (userId: string) => {
  return useQuery({
    queryKey: queryKeys.tickets.byUser(userId),
    queryFn: () => TicketService.getTicketsByUserId(userId),
    enabled: !!userId,
    staleTime: STALE_TIME_TANSTACK,
  });
};

/**
 * Hook para obtener tickets por ID de película
 */
export const useTicketsByMovieId = (movieId: number) => {
  return useQuery({
    queryKey: queryKeys.tickets.byMovie(movieId),
    queryFn: () => TicketService.getTicketsByMovieId(movieId),
    enabled: !!movieId && movieId > 0,
    staleTime: STALE_TIME_TANSTACK,
  });
};

/**
 * Hook para obtener mis tickets con filtros opcionales
 */
export const useMyTickets = (filters?: TicketFilters) => {
  return useQuery({
    queryKey: queryKeys.tickets.myTickets(filters),
    queryFn: () => TicketService.getMyTickets(filters),
    staleTime: STALE_TIME_TANSTACK,
  });
};

// ==========================================
// HOOKS DE MUTACIÓN (CREATE, UPDATE, DELETE)
// ==========================================

/**
 * Hook para crear un nuevo ticket
 */
export const useCreateTicket = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ticketData: CreateTicketDto) =>
      TicketService.createTicket(ticketData),
    onSuccess: (newTicket: Ticket) => {
      // Invalidar queries relacionadas para refrescar los datos
      queryClient.invalidateQueries({ queryKey: queryKeys.tickets.all });

      // Agregar el nuevo ticket al cache optimísticamente
      queryClient.setQueryData<Ticket[]>(
        queryKeys.tickets.lists(),
        (oldData = []) => [newTicket, ...oldData],
      );
    },
    onError: () => {
      // Error handling se puede manejar en el componente
    },
  });
};

/**
 * Hook para actualizar un ticket existente
 */
export const useUpdateTicket = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<UpdateTicketDto>;
    }) => TicketService.updateTicket(id, data),
    onSuccess: (updatedTicket: Ticket) => {
      // Actualizar el cache del ticket específico
      queryClient.setQueryData(
        queryKeys.tickets.detail(updatedTicket.idticket),
        updatedTicket,
      );

      // Invalidar listas para asegurar consistencia
      queryClient.invalidateQueries({ queryKey: queryKeys.tickets.lists() });
    },
    onError: () => {
      // Error handling se puede manejar en el componente
    },
  });
};

/**
 * Hook para eliminar un ticket
 */
export const useDeleteTicket = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ticketId: string) => TicketService.deleteTicket(ticketId),
    onSuccess: (_, ticketId) => {
      // Remover el ticket del cache
      queryClient.removeQueries({
        queryKey: queryKeys.tickets.detail(ticketId),
      });

      // Actualizar listas removiendo el ticket eliminado
      queryClient.setQueryData<Ticket[]>(
        queryKeys.tickets.lists(),
        (oldData = []) =>
          oldData.filter(ticket => ticket.idticket !== ticketId),
      );

      // Invalidar todas las queries relacionadas
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
 * Hook para obtener estadísticas de tickets del usuario
 */
export const useTicketStats = () => {
  const { data: tickets = [], isLoading, error } = useAllTickets();

  const stats = {
    totalTickets: tickets.length,
    totalRevenue: TicketService.calculateTotalRevenue(tickets),
    averagePrice:
      tickets.length > 0
        ? TicketService.calculateTotalRevenue(tickets) / tickets.length
        : 0,
    ticketsByMovie: TicketService.groupTicketsByMovie(tickets),
    latestTicket: TicketService.getLatestTicket(tickets),
  };

  return {
    stats,
    isLoading,
    error,
  };
};

/**
 * Hook para obtener ticket con detalles de película
 */
export const useTicketWithMovieDetails = (ticketId: string) => {
  const ticketQuery = useTicketById(ticketId);

  return {
    ticket: ticketQuery.data,
    isLoading: ticketQuery.isLoading,
    isError: ticketQuery.isError,
    error: ticketQuery.error,
    refetch: ticketQuery.refetch,
  };
};

/**
 * Hook para gestión completa de un ticket (CRUD)
 */
export const useTicketManagement = (ticketId?: string) => {
  const ticketQuery = ticketId ? useTicketById(ticketId) : undefined;
  const createMutation = useCreateTicket();
  const updateMutation = useUpdateTicket();
  const deleteMutation = useDeleteTicket();

  return {
    // Datos del ticket
    ticket: ticketQuery?.data,
    isLoading: ticketQuery?.isLoading || false,
    isError: ticketQuery?.isError || false,
    error: ticketQuery?.error,

    // Acciones CRUD
    createTicket: createMutation.mutate,
    updateTicket: (data: Partial<UpdateTicketDto>) =>
      ticketId && updateMutation.mutate({ id: ticketId, data }),
    deleteTicket: () => ticketId && deleteMutation.mutate(ticketId),

    // Estados de las mutaciones
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,

    // Errores de las mutaciones
    createError: createMutation.error,
    updateError: updateMutation.error,
    deleteError: deleteMutation.error,
  };
};

/**
 * Hook para filtrar tickets con funcionalidad de búsqueda
 */
export const useFilteredTickets = (filters: TicketFilters) => {
  const { data: allTickets = [], ...queryState } = useAllTickets();

  const filteredTickets = allTickets.filter(ticket => {
    if (filters.movieId && ticket.idmovie !== filters.movieId) return false;
    if (filters.minPrice && ticket.price < filters.minPrice) return false;
    if (filters.maxPrice && ticket.price > filters.maxPrice) return false;
    if (filters.startDate) {
      const ticketDate = new Date(ticket.createdAt || '');
      const startDate = new Date(filters.startDate);
      if (ticketDate < startDate) return false;
    }
    if (filters.endDate) {
      const ticketDate = new Date(ticket.createdAt || '');
      const endDate = new Date(filters.endDate);
      if (ticketDate > endDate) return false;
    }
    return true;
  });

  return {
    tickets: filteredTickets,
    totalCount: allTickets.length,
    filteredCount: filteredTickets.length,
    ...queryState,
  };
};

/**
 * Hook para prefetch de tickets relacionados
 */
export const usePrefetchRelatedTickets = (
  movieId?: number,
  userId?: string,
) => {
  const queryClient = useQueryClient();

  const prefetchByMovie = (id: number) => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.tickets.byMovie(id),
      queryFn: () => TicketService.getTicketsByMovieId(id),
      staleTime: STALE_TIME_TANSTACK,
    });
  };

  const prefetchByUser = (id: string) => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.tickets.byUser(id),
      queryFn: () => TicketService.getTicketsByUserId(id),
      staleTime: STALE_TIME_TANSTACK,
    });
  };

  return {
    prefetchByMovie,
    prefetchByUser,
    prefetchCurrentMovie: movieId ? () => prefetchByMovie(movieId) : undefined,
    prefetchCurrentUser: userId ? () => prefetchByUser(userId) : undefined,
  };
};
