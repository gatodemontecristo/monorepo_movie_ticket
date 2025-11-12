import { apiClient } from '../lib/api-client';
import type {
  Ticket,
  CreateTicketDto,
  UpdateTicketDto,
  TicketResponse,
  TicketsListResponse,
  TicketWithSeats,
  TicketWithSeatsResponse,
  TicketFilters,
} from '../types/ticket';

export class TicketService {
  // ==========================================
  // CRUD Básico de Tickets
  // ==========================================

  /**
   * Obtener todos los tickets del usuario autenticado
   */
  static async getAllTickets(): Promise<Ticket[]> {
    const response = await apiClient.get<TicketsListResponse>('/tickets');
    return response.data;
  }

  /**
   * Obtener un ticket por su ID (incluye asientos asociados)
   */
  static async getTicketById(id: string): Promise<TicketWithSeats> {
    const response = await apiClient.get<TicketWithSeatsResponse>(
      `/tickets/${id}`,
    );
    return response.data;
  }

  /**
   * Crear un nuevo ticket
   */
  static async createTicket(ticketData: CreateTicketDto): Promise<Ticket> {
    const response = await apiClient.post<TicketResponse>(
      '/tickets',
      ticketData,
    );
    return response.data;
  }

  /**
   * Actualizar un ticket existente
   */
  static async updateTicket(
    id: string,
    ticketData: Partial<UpdateTicketDto>,
  ): Promise<Ticket> {
    const updateData = { idticket: id, ...ticketData };
    const response = await apiClient.put<TicketResponse>(
      `/tickets/${id}`,
      updateData,
    );
    return response.data;
  }

  /**
   * Eliminar un ticket
   */
  static async deleteTicket(id: string): Promise<void> {
    await apiClient.delete<void>(`/tickets/${id}`);
  }

  // ==========================================
  // Consultas Específicas
  // ==========================================

  /**
   * Obtener tickets por ID de usuario
   */
  static async getTicketsByUserId(userId: string): Promise<Ticket[]> {
    const response = await apiClient.get<TicketsListResponse>(
      `/tickets/user/${userId}`,
    );
    return response.data;
  }

  /**
   * Obtener tickets por ID de película
   */
  static async getTicketsByMovieId(movieId: number): Promise<Ticket[]> {
    const response = await apiClient.get<TicketsListResponse>(
      `/tickets/movie/${movieId}`,
    );
    return response.data;
  }

  /**
   * Obtener tickets del usuario actual con filtros opcionales
   */
  static async getMyTickets(filters?: TicketFilters): Promise<Ticket[]> {
    let endpoint = '/tickets';
    const queryParams = new URLSearchParams();

    if (filters) {
      if (filters.movieId)
        queryParams.append('movieId', filters.movieId.toString());
      if (filters.minPrice)
        queryParams.append('minPrice', filters.minPrice.toString());
      if (filters.maxPrice)
        queryParams.append('maxPrice', filters.maxPrice.toString());
      if (filters.startDate) queryParams.append('startDate', filters.startDate);
      if (filters.endDate) queryParams.append('endDate', filters.endDate);
    }

    if (queryParams.toString()) {
      endpoint += `?${queryParams.toString()}`;
    }

    const response = await apiClient.get<TicketsListResponse>(endpoint);
    return response.data;
  }

  // ==========================================
  // Utilidades y Validaciones
  // ==========================================

  /**
   * Validar datos antes de crear un ticket
   */
  static validateCreateTicketData(data: CreateTicketDto): string[] {
    const errors: string[] = [];

    if (!data.price || data.price <= 0) {
      errors.push('El precio debe ser mayor a 0');
    }

    if (!data.movieName || data.movieName.trim().length === 0) {
      errors.push('El nombre de la película es requerido');
    }

    if (!data.idmovie || data.idmovie <= 0) {
      errors.push('El ID de la película es requerido');
    }

    if (!data.iduser || data.iduser.trim().length === 0) {
      errors.push('El ID del usuario es requerido');
    }

    return errors;
  }

  /**
   * Formatear precio para mostrar en UI
   */
  static formatPrice(price: number): string {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  }

  /**
   * Calcular total de ingresos de un array de tickets
   */
  static calculateTotalRevenue(tickets: Ticket[]): number {
    return tickets.reduce((total, ticket) => total + ticket.price, 0);
  }

  /**
   * Agrupar tickets por película
   */
  static groupTicketsByMovie(tickets: Ticket[]): Record<number, Ticket[]> {
    return tickets.reduce(
      (groups, ticket) => {
        const movieId = ticket.idmovie;
        if (!groups[movieId]) {
          groups[movieId] = [];
        }
        groups[movieId].push(ticket);
        return groups;
      },
      {} as Record<number, Ticket[]>,
    );
  }

  /**
   * Obtener ticket más reciente
   */
  static getLatestTicket(tickets: Ticket[]): Ticket | null {
    if (tickets.length === 0) return null;

    return tickets.reduce((latest, ticket) => {
      const latestDate = new Date(latest.createdAt || 0);
      const ticketDate = new Date(ticket.createdAt || 0);
      return ticketDate > latestDate ? ticket : latest;
    });
  }

  /**
   * Filtrar tickets por rango de fechas
   */
  static filterTicketsByDateRange(
    tickets: Ticket[],
    startDate: Date,
    endDate: Date,
  ): Ticket[] {
    return tickets.filter(ticket => {
      if (!ticket.createdAt) return false;
      const ticketDate = new Date(ticket.createdAt);
      return ticketDate >= startDate && ticketDate <= endDate;
    });
  }

  /**
   * Verificar si un ticket pertenece al usuario actual
   * Nota: Esto requiere tener el ID del usuario actual
   */
  static isMyTicket(ticket: Ticket, currentUserId: string): boolean {
    return ticket.iduser === currentUserId;
  }

  // ==========================================
  // Funciones de Formato y Display
  // ==========================================

  /**
   * Formatear fecha de creación del ticket
   */
  static formatTicketDate(ticket: Ticket): string {
    if (!ticket.createdAt) return 'Fecha no disponible';

    const date = new Date(ticket.createdAt);
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  }

  /**
   * Generar resumen del ticket para mostrar en UI
   */
  static getTicketSummary(ticket: Ticket): string {
    return `${ticket.movieName} - ${this.formatPrice(ticket.price)}`;
  }

  /**
   * Obtener status del ticket basado en la fecha
   * (Para futuras funcionalidades como expiración)
   */
  static getTicketStatus(): 'active' | 'expired' | 'upcoming' {
    // Por ahora todos los tickets son activos
    // Esta lógica puede expandirse según reglas de negocio
    return 'active';
  }
}
