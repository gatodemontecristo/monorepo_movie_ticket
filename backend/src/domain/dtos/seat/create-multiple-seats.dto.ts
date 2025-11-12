import { CreateSeatDto } from './create-seat.dto';

export class CreateMultipleSeatsDto {
  private constructor(
    public readonly seats: CreateSeatDto[],
    public readonly idticket: string,
  ) {}

  static create(props: {
    seats: { column: number; row: number }[];
    idticket: string;
  }): [string?, CreateMultipleSeatsDto?] {
    const { seats, idticket } = props;

    if (!idticket) return ['Ticket ID property is required', undefined];
    if (typeof idticket !== 'string')
      return ['Ticket ID must be a string', undefined];

    if (!seats || !Array.isArray(seats))
      return ['Seats array is required', undefined];
    if (seats.length === 0) return ['Seats array cannot be empty', undefined];
    if (seats.length > 50)
      return ['Cannot create more than 50 seats at once', undefined];

    const validatedSeats: CreateSeatDto[] = [];
    const seenPositions = new Set<string>();

    for (let i = 0; i < seats.length; i++) {
      const seat = seats[i];
      const [error, validatedSeat] = CreateSeatDto.create({
        column: seat.column,
        row: seat.row,
        idticket,
      });

      if (error) {
        return [`Seat at position ${i}: ${error}`, undefined];
      }

      if (!validatedSeat) {
        return [`Invalid seat at position ${i}`, undefined];
      }

      // Verificar que no haya asientos duplicados en la misma posición
      const position = `${seat.row}-${seat.column}`;
      if (seenPositions.has(position)) {
        return [
          `Duplicate seat position: row ${seat.row}, column ${seat.column}`,
          undefined,
        ];
      }
      seenPositions.add(position);

      validatedSeats.push(validatedSeat);
    }

    return [undefined, new CreateMultipleSeatsDto(validatedSeats, idticket)];
  }
}
