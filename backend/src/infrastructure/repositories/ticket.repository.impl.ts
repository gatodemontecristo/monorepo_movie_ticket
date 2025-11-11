import {
  CreateTicketDto,
  UpdateTicketDto,
  TicketDataSource,
  TicketEntity,
  TicketRepository,
} from '../../domain';

export class TicketRepositoryImpl implements TicketRepository {
  constructor(private readonly datasource: TicketDataSource) {}

  create(createTicketDto: CreateTicketDto): Promise<TicketEntity> {
    return this.datasource.create(createTicketDto);
  }
  findById(idticket: string): Promise<TicketEntity | null> {
    return this.datasource.findById(idticket);
  }
  findByUserId(iduser: string): Promise<TicketEntity[]> {
    return this.datasource.findByUserId(iduser);
  }
  findByMovieId(idmovie: number): Promise<TicketEntity[]> {
    return this.datasource.findByMovieId(idmovie);
  }
  list(): Promise<TicketEntity[]> {
    return this.datasource.list();
  }
  update(updateTicketDto: UpdateTicketDto): Promise<TicketEntity> {
    return this.datasource.update(updateTicketDto);
  }
  delete(idticket: string): Promise<void> {
    return this.datasource.delete(idticket);
  }
}
