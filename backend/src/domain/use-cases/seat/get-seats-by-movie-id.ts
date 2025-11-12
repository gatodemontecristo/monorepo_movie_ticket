import { SeatEntity } from '../../entities/seat.entity';
import { SeatRepository } from '../../repository/seat.repository';

export interface GetSeatsByMovieIdUseCase {
  execute(idmovie: number): Promise<SeatEntity[]>;
}

export class GetSeatsByMovieId implements GetSeatsByMovieIdUseCase {
  constructor(private readonly repository: SeatRepository) {}

  async execute(idmovie: number): Promise<SeatEntity[]> {
    if (!idmovie || idmovie <= 0) {
      throw new Error('Invalid movie ID');
    }

    try {
      const seats = await this.repository.findByMovieId(idmovie);
      return seats;
    } catch (error) {
      throw new Error(`Error fetching seats by movie ID: ${error}`);
    }
  }
}
