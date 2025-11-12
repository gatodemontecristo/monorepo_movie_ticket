import {
  CreateSeatDto,
  UpdateSeatDto,
  SeatDataSource,
  SeatEntity,
  SeatRepository,
} from '../../domain';

export class SeatRepositoryImpl implements SeatRepository {
  constructor(private readonly datasource: SeatDataSource) {}

  create(createSeatDto: CreateSeatDto): Promise<SeatEntity> {
    return this.datasource.create(createSeatDto);
  }
  findById(id: string): Promise<SeatEntity | null> {
    return this.datasource.findById(id);
  }
  findByTicketId(idticket: string): Promise<SeatEntity[]> {
    return this.datasource.findByTicketId(idticket);
  }
  findByMovieId(idmovie: number): Promise<SeatEntity[]> {
    return this.datasource.findByMovieId(idmovie);
  }
  findByPosition(
    column: number,
    row: number,
    idticket: string,
  ): Promise<SeatEntity | null> {
    return this.datasource.findByPosition(column, row, idticket);
  }
  list(): Promise<SeatEntity[]> {
    return this.datasource.list();
  }
  update(updateSeatDto: UpdateSeatDto): Promise<SeatEntity> {
    return this.datasource.update(updateSeatDto);
  }
  delete(id: string): Promise<void> {
    return this.datasource.delete(id);
  }
}
