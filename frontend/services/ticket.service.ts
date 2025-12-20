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
    const response = await apiClient.post<Ticket>('/tickets', ticketData);
    return response;
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
    const response = await apiClient.get<Ticket[]>(`/tickets/user/${userId}`);
    return response;
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
      if (filters.day) queryParams.append('day', filters.day);
      if (filters.location) queryParams.append('location', filters.location);
      if (filters.timeFrom) queryParams.append('timeFrom', filters.timeFrom);
      if (filters.timeTo) queryParams.append('timeTo', filters.timeTo);
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

    if (!data.day || data.day.trim().length === 0) {
      errors.push('El día es requerido');
    }

    if (!data.hour || data.hour.trim().length === 0) {
      errors.push('La hora es requerida');
    }

    if (!data.location || data.location.trim().length === 0) {
      errors.push('La ubicación es requerida');
    }

    // Validación de formato de fecha (YYYY-MM-DD)
    if (data.day && !/^\d{4}-\d{2}-\d{2}$/.test(data.day)) {
      errors.push('El formato del día debe ser YYYY-MM-DD');
    }

    // Validación de formato de hora (HH:MM)
    if (data.hour && !/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(data.hour)) {
      errors.push('El formato de la hora debe ser HH:MM');
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
    return `${ticket.movieName} - ${this.formatPrice(ticket.price)} - ${ticket.day} ${ticket.hour}`;
  }

  /**
   * Formatear información completa del ticket
   */
  static getFullTicketInfo(ticket: Ticket): string {
    return `${ticket.movieName} | ${this.formatPrice(ticket.price)} | ${this.formatShowDateTime(ticket)} | ${ticket.location}`;
  }

  /**
   * Formatear fecha y hora de la función
   */
  static formatShowDateTime(ticket: Ticket): string {
    try {
      const date = new Date(`${ticket.day}T${ticket.hour}`);
      return new Intl.DateTimeFormat('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(date);
    } catch {
      return `${ticket.day} ${ticket.hour}`;
    }
  }

  /**
   * Verificar si un ticket ya pasó (función ya terminó)
   */
  static isTicketExpired(ticket: Ticket): boolean {
    try {
      const showDateTime = new Date(`${ticket.day}T${ticket.hour}`);
      return showDateTime < new Date();
    } catch {
      return false;
    }
  }

  /**
   * Obtener tickets por ubicación
   */
  static async getTicketsByLocation(location: string): Promise<Ticket[]> {
    const tickets = await this.getAllTickets();
    return tickets.filter(ticket =>
      ticket.location.toLowerCase().includes(location.toLowerCase()),
    );
  }

  /**
   * Obtener tickets para un día específico
   */
  static async getTicketsForDay(day: string): Promise<Ticket[]> {
    const tickets = await this.getAllTickets();
    return tickets.filter(ticket => ticket.day === day);
  }

  /**
   * Agrupar tickets por ubicación
   */
  static groupTicketsByLocation(tickets: Ticket[]): Record<string, Ticket[]> {
    return tickets.reduce(
      (groups, ticket) => {
        const location = ticket.location;
        if (!groups[location]) {
          groups[location] = [];
        }
        groups[location].push(ticket);
        return groups;
      },
      {} as Record<string, Ticket[]>,
    );
  }

  /**
   * Obtener horarios únicos para una película
   */
  static getUniqueShowTimes(tickets: Ticket[]): string[] {
    const times = tickets.map(ticket => ticket.hour);
    return [...new Set(times)].sort();
  }

  /**
   * Obtener ubicaciones únicas
   */
  static getUniqueLocations(tickets: Ticket[]): string[] {
    const locations = tickets.map(ticket => ticket.location);
    return [...new Set(locations)].sort();
  }

  // ==========================================
  // Utilidades de Fecha y Hora
  // ==========================================

  /**
   * Validar formato de fecha (YYYY-MM-DD)
   */
  static isValidDateFormat(date: string): boolean {
    return /^\d{4}-\d{2}-\d{2}$/.test(date);
  }

  /**
   * Validar formato de hora (HH:MM)
   */
  static isValidTimeFormat(time: string): boolean {
    return /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time);
  }

  /**
   * Convertir fecha a formato legible
   */
  static formatDateForDisplay(date: string): string {
    try {
      return new Intl.DateTimeFormat('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(new Date(date));
    } catch {
      return date;
    }
  }

  /**
   * Convertir hora a formato de 12 horas
   */
  static formatTimeTo12Hour(time: string): string {
    try {
      const [hours, minutes] = time.split(':');
      const hour12 = parseInt(hours) % 12 || 12;
      const ampm = parseInt(hours) >= 12 ? 'PM' : 'AM';
      return `${hour12}:${minutes} ${ampm}`;
    } catch {
      return time;
    }
  }

  /**
   * Obtener fecha actual en formato YYYY-MM-DD
   */
  static getCurrentDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  /**
   * Obtener hora actual en formato HH:MM
   */
  static getCurrentTime(): string {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  }

  /**
   * Obtener status del ticket basado en la fecha y hora de la función
   */
  static getTicketStatus(ticket: Ticket): 'active' | 'expired' | 'upcoming' {
    try {
      const showDateTime = new Date(`${ticket.day}T${ticket.hour}`);
      const now = new Date();
      const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000);

      if (showDateTime < now) {
        return 'expired';
      } else if (showDateTime < oneHourFromNow) {
        return 'active'; // Función próxima (dentro de 1 hora)
      } else {
        return 'upcoming'; // Función futura
      }
    } catch {
      return 'active'; // Si hay error en el parsing, consideramos activo por defecto
    }
  }

  /**
   * Obtener tiempo restante hasta la función
   */
  static getTimeUntilShow(ticket: Ticket): string {
    try {
      const showDateTime = new Date(`${ticket.day}T${ticket.hour}`);
      const now = new Date();
      const diffMs = showDateTime.getTime() - now.getTime();

      if (diffMs <= 0) {
        return 'Función finalizada';
      }

      const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

      if (days > 0) {
        return `${days} día${days > 1 ? 's' : ''} y ${hours} hora${hours > 1 ? 's' : ''}`;
      } else if (hours > 0) {
        return `${hours} hora${hours > 1 ? 's' : ''} y ${minutes} minuto${minutes > 1 ? 's' : ''}`;
      } else {
        return `${minutes} minuto${minutes > 1 ? 's' : ''}`;
      }
    } catch {
      return 'Tiempo no disponible';
    }
  }
}
