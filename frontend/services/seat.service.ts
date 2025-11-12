import { apiClient } from '../lib/api-client';
import type {
  Seat,
  CreateSeatDto,
  UpdateSeatDto,
  SeatResponse,
  SeatsListResponse,
  SeatWithTicket,
  SeatFilters,
  SeatPositionQuery,
  TheaterSeat,
  SeatOccupancyStats,
} from '../types/seat';

export class SeatService {
  // ==========================================
  // CRUD Básico de Asientos
  // ==========================================

  /**
   * Obtener todos los asientos
   */
  static async getAllSeats(): Promise<Seat[]> {
    const response = await apiClient.get<SeatsListResponse>('/seats');
    return response.data;
  }

  /**
   * Obtener un asiento por su ID
   */
  static async getSeatById(id: string): Promise<Seat> {
    const response = await apiClient.get<SeatResponse>(`/seats/${id}`);
    return response.data;
  }

  /**
   * Crear un nuevo asiento
   */
  static async createSeat(seatData: CreateSeatDto): Promise<Seat> {
    const response = await apiClient.post<SeatResponse>('/seats', seatData);
    return response.data;
  }

  /**
   * Actualizar un asiento existente
   */
  static async updateSeat(
    id: string,
    seatData: Partial<UpdateSeatDto>,
  ): Promise<Seat> {
    const updateData = { id, ...seatData };
    const response = await apiClient.put<SeatResponse>(
      `/seats/${id}`,
      updateData,
    );
    return response.data;
  }

  /**
   * Eliminar un asiento
   */
  static async deleteSeat(id: string): Promise<void> {
    await apiClient.delete<void>(`/seats/${id}`);
  }

  // ==========================================
  // Consultas Específicas
  // ==========================================

  /**
   * Obtener asientos por ID de ticket
   */
  static async getSeatsByTicketId(ticketId: string): Promise<Seat[]> {
    const response = await apiClient.get<SeatsListResponse>(
      `/seats/ticket/${ticketId}`,
    );
    return response.data;
  }

  /**
   * Obtener asientos por ID de película
   */
  static async getSeatsByMovieId(movieId: number): Promise<SeatWithTicket[]> {
    const response = await apiClient.get<{
      success: boolean;
      data: SeatWithTicket[];
    }>(`/seats/movie/${movieId}`);
    return response.data;
  }

  /**
   * Buscar asiento por posición específica
   */
  static async getSeatByPosition(
    query: SeatPositionQuery,
  ): Promise<Seat | null> {
    const { column, row, ticketId } = query;
    const response = await apiClient.get<SeatResponse>(
      `/seats/position/search?column=${column}&row=${row}&ticketId=${ticketId}`,
    );
    return response.data;
  }

  /**
   * Obtener asientos con filtros opcionales
   */
  static async getSeatsWithFilters(filters?: SeatFilters): Promise<Seat[]> {
    let endpoint = '/seats';
    const queryParams = new URLSearchParams();

    if (filters) {
      if (filters.ticketId) queryParams.append('ticketId', filters.ticketId);
      if (filters.movieId)
        queryParams.append('movieId', filters.movieId.toString());
      if (filters.row) queryParams.append('row', filters.row.toString());
      if (filters.column)
        queryParams.append('column', filters.column.toString());
      if (filters.minRow)
        queryParams.append('minRow', filters.minRow.toString());
      if (filters.maxRow)
        queryParams.append('maxRow', filters.maxRow.toString());
      if (filters.minColumn)
        queryParams.append('minColumn', filters.minColumn.toString());
      if (filters.maxColumn) queryParams.append('maxColumn', filters.maxColumn);
    }

    if (queryParams.toString()) {
      endpoint += `?${queryParams.toString()}`;
    }

    const response = await apiClient.get<SeatsListResponse>(endpoint);
    return response.data;
  }

  // ==========================================
  // Operaciones en Lote
  // ==========================================

  /**
   * Crear múltiples asientos de una vez
   */
  static async createMultipleSeats(
    seatsData: CreateSeatDto[],
  ): Promise<Seat[]> {
    const createdSeats: Seat[] = [];

    // Crear asientos secuencialmente para evitar conflictos
    for (const seatData of seatsData) {
      try {
        const seat = await this.createSeat(seatData);
        createdSeats.push(seat);
      } catch {
        // Error silencioso, se puede manejar en el componente si es necesario
        continue;
      }
    }

    return createdSeats;
  }

  /**
   * Eliminar múltiples asientos
   */
  static async deleteMultipleSeats(seatIds: string[]): Promise<void> {
    await Promise.all(seatIds.map(id => this.deleteSeat(id)));
  }

  // ==========================================
  // Utilidades y Validaciones
  // ==========================================

  /**
   * Validar datos antes de crear un asiento
   */
  static validateCreateSeatData(data: CreateSeatDto): string[] {
    const errors: string[] = [];

    if (!data.column || data.column <= 0) {
      errors.push('La columna debe ser mayor a 0');
    }

    if (!data.row || data.row <= 0) {
      errors.push('La fila debe ser mayor a 0');
    }

    if (!data.idticket || data.idticket.trim().length === 0) {
      errors.push('El ID del ticket es requerido');
    }

    return errors;
  }

  /**
   * Convertir posición numérica a formato de asiento (ej: A1, B2)
   */
  static formatSeatPosition(row: number, column: number): string {
    const rowLetter = String.fromCharCode(64 + row); // 1=A, 2=B, etc.
    return `${rowLetter}${column}`;
  }

  /**
   * Convertir formato de asiento a posición numérica
   */
  static parseSeatPosition(
    position: string,
  ): { row: number; column: number } | null {
    const match = position.match(/^([A-Z])(\d+)$/);
    if (!match) return null;

    const row = match[1].charCodeAt(0) - 64; // A=1, B=2, etc.
    const column = parseInt(match[2], 10);

    return { row, column };
  }

  /**
   * Verificar si un asiento está ocupado en una posición específica
   */
  static async isSeatOccupied(
    row: number,
    column: number,
    ticketId: string,
  ): Promise<boolean> {
    try {
      const seat = await this.getSeatByPosition({ row, column, ticketId });
      return seat !== null;
    } catch {
      return false;
    }
  }

  /**
   * Obtener asientos adyacentes a una posición
   */
  static getAdjacentPositions(
    row: number,
    column: number,
  ): Array<{ row: number; column: number }> {
    const adjacent = [];

    // Verificar las 8 posiciones alrededor
    for (let r = row - 1; r <= row + 1; r++) {
      for (let c = column - 1; c <= column + 1; c++) {
        // Excluir la posición actual y posiciones inválidas
        if ((r !== row || c !== column) && r > 0 && c > 0) {
          adjacent.push({ row: r, column: c });
        }
      }
    }

    return adjacent;
  }

  /**
   * Generar estadísticas de ocupación
   */
  static calculateOccupancyStats(seats: Seat[]): SeatOccupancyStats {
    const totalSeats = seats.length;
    const occupiedSeats = totalSeats; // Todos los asientos en el array están ocupados
    const availableSeats = 0; // Esta lógica depende de tu modelo de negocio
    const occupancyRate =
      totalSeats > 0 ? (occupiedSeats / totalSeats) * 100 : 0;

    const seatsByRow = seats.reduce(
      (acc, seat) => {
        acc[seat.row] = (acc[seat.row] || 0) + 1;
        return acc;
      },
      {} as Record<number, number>,
    );

    const seatsByMovie = {}; // Necesitaría incluir información del ticket/película

    return {
      totalSeats,
      occupiedSeats,
      availableSeats,
      occupancyRate,
      seatsByRow,
      seatsByMovie,
    };
  }

  /**
   * Ordenar asientos por posición (fila y luego columna)
   */
  static sortSeatsByPosition(seats: Seat[]): Seat[] {
    return seats.sort((a, b) => {
      if (a.row !== b.row) return a.row - b.row;
      return a.column - b.column;
    });
  }

  /**
   * Agrupar asientos por fila
   */
  static groupSeatsByRow(seats: Seat[]): Record<number, Seat[]> {
    return seats.reduce(
      (groups, seat) => {
        const row = seat.row;
        if (!groups[row]) {
          groups[row] = [];
        }
        groups[row].push(seat);
        return groups;
      },
      {} as Record<number, Seat[]>,
    );
  }

  /**
   * Agrupar asientos por ticket
   */
  static groupSeatsByTicket(seats: Seat[]): Record<string, Seat[]> {
    return seats.reduce(
      (groups, seat) => {
        const ticketId = seat.idticket;
        if (!groups[ticketId]) {
          groups[ticketId] = [];
        }
        groups[ticketId].push(seat);
        return groups;
      },
      {} as Record<string, Seat[]>,
    );
  }

  /**
   * Buscar el mejor grupo de asientos consecutivos disponibles
   */
  static findBestConsecutiveSeats(
    occupiedSeats: Seat[],
    requestedCount: number,
    preferredRow?: number,
  ): Array<{ row: number; column: number }> {
    // Esta es una implementación básica
    // En una app real, necesitarías más lógica compleja

    const occupiedPositions = new Set(
      occupiedSeats.map(seat => `${seat.row}-${seat.column}`),
    );

    const startRow = preferredRow || 1;
    const maxColumns = 20; // Asume un máximo de 20 columnas por fila

    for (let row = startRow; row <= 10; row++) {
      // Asume máximo 10 filas
      for (
        let startCol = 1;
        startCol <= maxColumns - requestedCount + 1;
        startCol++
      ) {
        const consecutive = [];
        let available = true;

        for (let col = startCol; col < startCol + requestedCount; col++) {
          const position = `${row}-${col}`;
          if (occupiedPositions.has(position)) {
            available = false;
            break;
          }
          consecutive.push({ row, column: col });
        }

        if (available) {
          return consecutive;
        }
      }
    }

    return [];
  }

  /**
   * Convertir asientos a formato de teatro visual
   */
  static convertToTheaterSeats(
    seats: Seat[],
    allPossibleSeats?: Array<{ row: number; column: number }>,
  ): TheaterSeat[] {
    const occupiedMap = new Map(
      seats.map(seat => [`${seat.row}-${seat.column}`, seat]),
    );

    const theaterSeats: TheaterSeat[] = [];

    // Si se proporcionan todas las posiciones posibles, úsalas
    if (allPossibleSeats) {
      allPossibleSeats.forEach(pos => {
        const key = `${pos.row}-${pos.column}`;
        const occupiedSeat = occupiedMap.get(key);

        theaterSeats.push({
          id: occupiedSeat?.id || `empty-${pos.row}-${pos.column}`,
          row: pos.row,
          column: pos.column,
          idticket: occupiedSeat?.idticket || '',
          isOccupied: !!occupiedSeat,
          isAvailable: !occupiedSeat,
          isSelected: false,
          seatType: 'REGULAR',
          createdAt: occupiedSeat?.createdAt,
          updatedAt: occupiedSeat?.updatedAt,
        });
      });
    } else {
      // Solo convertir asientos ocupados
      seats.forEach(seat => {
        theaterSeats.push({
          ...seat,
          isOccupied: true,
          isAvailable: false,
          isSelected: false,
          seatType: 'REGULAR',
        });
      });
    }

    return this.sortTheaterSeatsByPosition(theaterSeats);
  }

  /**
   * Ordenar asientos de teatro por posición
   */
  static sortTheaterSeatsByPosition(seats: TheaterSeat[]): TheaterSeat[] {
    return seats.sort((a, b) => {
      if (a.row !== b.row) return a.row - b.row;
      return a.column - b.column;
    });
  }

  // ==========================================
  // Funciones de Formato y Display
  // ==========================================

  /**
   * Formatear fecha de creación del asiento
   */
  static formatSeatDate(seat: Seat): string {
    if (!seat.createdAt) return 'Fecha no disponible';

    const date = new Date(seat.createdAt);
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  }

  /**
   * Generar descripción del asiento para UI
   */
  static getSeatDescription(seat: Seat): string {
    const position = this.formatSeatPosition(seat.row, seat.column);
    return `Asiento ${position}`;
  }

  /**
   * Generar resumen de asientos para un ticket
   */
  static getSeatsSummary(seats: Seat[]): string {
    if (seats.length === 0) return 'Sin asientos';
    if (seats.length === 1) {
      const position = this.formatSeatPosition(seats[0].row, seats[0].column);
      return `Asiento ${position}`;
    }

    const positions = seats.map(seat =>
      this.formatSeatPosition(seat.row, seat.column),
    );
    return `Asientos: ${positions.join(', ')}`;
  }
}
