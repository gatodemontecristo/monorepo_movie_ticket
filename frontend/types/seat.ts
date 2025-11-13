// ==========================================
// Seat Interfaces - Frontend
// ==========================================

import { Ticket } from './ticket';

export interface Seat {
  id: string;
  column: number;
  row: number;
  idticket: string;
  createdAt?: string;
  updatedAt?: string;
}

// DTOs para crear y actualizar asientos
export interface CreateSeatDto {
  column: number;
  row: number;
  idticket: string;
}

export interface UpdateSeatDto {
  id: string;
  column?: number;
  row?: number;
  idticket?: string;
}

// DTO para creación múltiple de asientos
export interface CreateMultipleSeatsDto {
  idticket: string;
  seats: Array<{ row: number; column: number }>;
}

// Respuesta específica para creación múltiple
export interface CreateMultipleSeatsResponse {
  success: boolean;
  message: string;
  data: Seat[];
}

// Respuesta del backend con estructura estándar
export interface SeatResponse {
  success: boolean;
  data: Seat;
}

export interface SeatsListResponse {
  success: boolean;
  data: Seat[];
}

// Asiento con ticket incluido (cuando se incluye la relación)
export interface SeatWithTicket extends Seat {
  ticket: Ticket;
}

// Respuesta del backend para asientos con tickets
export interface SeatWithTicketResponse {
  success: boolean;
  data: SeatWithTicket;
}

// Parámetros para filtros y búsquedas
export interface SeatFilters {
  ticketId?: string;
  movieId?: number;
  row?: number;
  column?: number;
  minRow?: number;
  maxRow?: number;
  minColumn?: number;
  maxColumn?: string;
}

// Para búsqueda por posición específica
export interface SeatPositionQuery {
  column: number;
  row: number;
  ticketId: string;
}

// Para gestión de teatro/sala
export interface TheaterSeat extends Seat {
  isOccupied?: boolean;
  isSelected?: boolean;
  seatType?: 'VIP' | 'PREMIUM' | 'REGULAR';
  isAvailable?: boolean;
}

// Configuración de sala de cine
export interface TheaterLayout {
  rows: number;
  columnsPerRow: number[];
  seatTypes?: Record<string, string>; // posición -> tipo
  blockedSeats?: string[]; // posiciones bloqueadas
}

// Para estadísticas de ocupación
export interface SeatOccupancyStats {
  totalSeats: number;
  occupiedSeats: number;
  availableSeats: number;
  occupancyRate: number;
  seatsByRow: Record<number, number>;
  seatsByMovie: Record<number, number>;
}

// Para generación de patrones de asientos
export interface SeatPattern {
  type: 'consecutive' | 'rectangular' | 'specific' | 'checkerboard';
  positions: Array<{ row: number; column: number }>;
}

export interface ConsecutivePattern {
  row: number;
  startColumn: number;
  count: number;
}

export interface RectangularPattern {
  startRow: number;
  endRow: number;
  startColumn: number;
  endColumn: number;
}

export interface CheckerboardPattern {
  startRow: number;
  endRow: number;
  startColumn: number;
  endColumn: number;
  offset?: boolean;
}

// Para preview y validación
export interface SeatsPreview {
  total: number;
  byRow: Record<number, number>;
  range: string;
  positions: string[];
  estimatedTime: string;
}
