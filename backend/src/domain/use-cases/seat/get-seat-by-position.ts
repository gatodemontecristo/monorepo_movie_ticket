import { SeatEntity } from '../../entities/seat.entity';
import { SeatRepository } from '../../repository/seat.repository';

export interface GetSeatByPositionUseCase {
  execute(
    column: number,
    row: number,
    idticket: string,
  ): Promise<SeatEntity | null>;
}

export class GetSeatByPosition implements GetSeatByPositionUseCase {
  constructor(private readonly repository: SeatRepository) {}

  async execute(
    column: number,
    row: number,
    idticket: string,
  ): Promise<SeatEntity | null> {
    return this.repository.findByPosition(column, row, idticket);
  }
}
