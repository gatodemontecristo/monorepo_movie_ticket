import { SeatProps } from '../../types/types';

export class SeatEntity {
  constructor(
    public id: string,
    public column: number,
    public row: number,
    public idticket: string,
    public createdAt?: Date | null,
    public updatedAt?: Date | null,
  ) {}

  public static fromObject(object: SeatProps): SeatEntity {
    const { id, column, row, idticket, createdAt, updatedAt } = object;

    if (!id) throw 'Seat ID is required';
    if (column === undefined || column === null) throw 'Column is required';
    if (row === undefined || row === null) throw 'Row is required';
    if (!idticket) throw 'Ticket ID is required';

    // Validaciones adicionales
    if (typeof column !== 'number') throw 'Column must be a number';
    if (typeof row !== 'number') throw 'Row must be a number';
    if (column <= 0) throw 'Column must be a positive number';
    if (row <= 0) throw 'Row must be a positive number';

    let newCreatedAt;
    if (createdAt) {
      newCreatedAt = new Date(createdAt);
      if (isNaN(newCreatedAt.getTime()))
        throw 'Invalid date format for createdAt';
    }

    let newUpdatedAt;
    if (updatedAt) {
      newUpdatedAt = new Date(updatedAt);
      if (isNaN(newUpdatedAt.getTime()))
        throw 'Invalid date format for updatedAt';
    }

    return new SeatEntity(
      id,
      column,
      row,
      idticket,
      newCreatedAt,
      newUpdatedAt,
    );
  }

  // Método útil para obtener la posición del asiento como string
  public getPosition(): string {
    return `${String.fromCharCode(64 + this.row)}${this.column}`;
  }

  // Método para verificar si dos asientos son adyacentes
  public isAdjacentTo(otherSeat: SeatEntity): boolean {
    const rowDiff = Math.abs(this.row - otherSeat.row);
    const columnDiff = Math.abs(this.column - otherSeat.column);

    return (
      rowDiff <= 1 && columnDiff <= 1 && !(rowDiff === 0 && columnDiff === 0)
    );
  }
}
