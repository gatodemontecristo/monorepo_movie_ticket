import { SeatRepository } from '../../repository/seat.repository';

export interface DeleteSeatUseCase {
  execute(id: string): Promise<void>;
}

export class DeleteSeat implements DeleteSeatUseCase {
  constructor(private readonly repository: SeatRepository) {}

  async execute(id: string): Promise<void> {
    const seat = await this.repository.findById(id);
    if (!seat) throw new Error('Seat not found');

    return this.repository.delete(id);
  }
}
