import { SeatEntity } from '../../entities/seat.entity';
import { SeatRepository } from '../../repository/seat.repository';

export interface GetSeatByIdUseCase {
  execute(id: string): Promise<SeatEntity>;
}

export class GetSeatById implements GetSeatByIdUseCase {
  constructor(private readonly repository: SeatRepository) {}

  async execute(id: string): Promise<SeatEntity> {
    const seat = await this.repository.findById(id);
    if (!seat) throw new Error('Seat not found');

    return seat;
  }
}
