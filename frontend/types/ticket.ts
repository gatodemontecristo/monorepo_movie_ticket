// ==========================================
// Ticket Interfaces - Frontend
// ==========================================

import { Seat } from './seat';

export interface Ticket {
  idticket: string;
  price: number;
  movieName: string;
  idmovie: number;
  iduser: string;
  day: string;
  hour: string;
  location: string;
  createdAt?: string;
  updatedAt?: string;
}

// DTOs para crear y actualizar tickets
export interface CreateTicketDto {
  price: number;
  movieName: string;
  idmovie: number;
  iduser: string;
  day: string;
  hour: string;
  location: string;
}

export interface UpdateTicketDto {
  idticket: string;
  price?: number;
  movieName?: string;
  idmovie?: number;
  iduser?: string;
  day?: string;
  hour?: string;
  location?: string;
}

// Respuesta del backend con estructura estándar
export interface TicketResponse {
  success: boolean;
  data: Ticket;
}

export interface TicketsListResponse {
  success: boolean;
  data: Ticket[];
}

// Ticket con asientos incluidos (cuando se incluye la relación)
export interface TicketWithSeats extends Ticket {
  seats: Seat[];
}

// Interfaz básica de asiento (para la relación con ticket)

// Respuesta del backend para tickets con asientos
export interface TicketWithSeatsResponse {
  success: boolean;
  data: TicketWithSeats;
}

// Parámetros para filtros y búsquedas
export interface TicketFilters {
  userId?: string;
  movieId?: number;
  minPrice?: number;
  maxPrice?: number;
  startDate?: string;
  endDate?: string;
  day?: string;
  location?: string;
  timeFrom?: string;
  timeTo?: string;
}

// Para estadísticas y reportes
export interface TicketStats {
  totalTickets: number;
  totalRevenue: number;
  averagePrice: number;
  ticketsByMovie: Record<number, number>;
}
