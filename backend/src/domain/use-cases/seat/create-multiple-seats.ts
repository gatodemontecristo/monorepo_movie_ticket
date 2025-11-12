import { SeatEntity, SeatRepository, CreateMultipleSeatsDto } from '../..';

export interface CreateMultipleSeatsUseCase {
  execute(
    createMultipleSeatsDto: CreateMultipleSeatsDto,
  ): Promise<SeatEntity[]>;
}

export class CreateMultipleSeats implements CreateMultipleSeatsUseCase {
  constructor(private readonly repository: SeatRepository) {}

  async execute(
    createMultipleSeatsDto: CreateMultipleSeatsDto,
  ): Promise<SeatEntity[]> {
    return this.repository.createMany(createMultipleSeatsDto);
  }
}
