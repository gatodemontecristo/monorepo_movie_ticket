import { SeatEntity } from '../../entities/seat.entity';
import { SeatRepository } from '../../repository/seat.repository';

export interface GetSeatsByTicketIdUseCase {
  execute(idticket: string): Promise<SeatEntity[]>;
}

export class GetSeatsByTicketId implements GetSeatsByTicketIdUseCase {
  constructor(private readonly repository: SeatRepository) {}

  async execute(idticket: string): Promise<SeatEntity[]> {
    return this.repository.findByTicketId(idticket);
  }
}
