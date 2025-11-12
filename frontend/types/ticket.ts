// ==========================================
// Ticket Interfaces - Frontend
// ==========================================

export interface Ticket {
  idticket: string;
  price: number;
  movieName: string;
  idmovie: number;
  iduser: string;
  createdAt?: string;
  updatedAt?: string;
}

// DTOs para crear y actualizar tickets
export interface CreateTicketDto {
  price: number;
  movieName: string;
  idmovie: number;
  iduser: string;
}

export interface UpdateTicketDto {
  idticket: string;
  price?: number;
  movieName?: string;
  idmovie?: number;
  iduser?: string;
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
export interface Seat {
  id: string;
  column: number;
  row: number;
  idticket: string;
  createdAt?: string;
  updatedAt?: string;
}

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
}

// Para estadísticas y reportes
export interface TicketStats {
  totalTickets: number;
  totalRevenue: number;
  averagePrice: number;
  ticketsByMovie: Record<number, number>;
}
