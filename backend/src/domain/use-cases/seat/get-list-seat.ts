import { SeatEntity } from '../../entities/seat.entity';
import { SeatRepository } from '../../repository/seat.repository';

export interface GetListSeatUseCase {
  execute(): Promise<SeatEntity[]>;
}

export class GetListSeat implements GetListSeatUseCase {
  constructor(private readonly repository: SeatRepository) {}

  async execute(): Promise<SeatEntity[]> {
    return this.repository.list();
  }
}
