import { CreateSeatDto, UpdateSeatDto } from '../dtos';
import { SeatEntity } from '../entities/seat.entity';

export abstract class SeatDataSource {
  abstract create(createSeatDto: CreateSeatDto): Promise<SeatEntity>;

  abstract findById(id: string): Promise<SeatEntity | null>;
  abstract findByTicketId(idticket: string): Promise<SeatEntity[]>;
  abstract findByMovieId(idmovie: number): Promise<SeatEntity[]>;
  abstract findByPosition(
    column: number,
    row: number,
    idticket: string,
  ): Promise<SeatEntity | null>;
  abstract list(): Promise<SeatEntity[]>;
  abstract update(updateSeatDto: UpdateSeatDto): Promise<SeatEntity>;
  abstract delete(id: string): Promise<void>;
}
