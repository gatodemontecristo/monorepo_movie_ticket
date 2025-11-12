import { TicketEntity } from '../../entities/ticket.entity';
import { TicketRepository } from '../../repository/ticket.repository';

export interface GetTicketsByMovieIdUseCase {
  execute(idmovie: number): Promise<TicketEntity[]>;
}

export class GetTicketsByMovieId implements GetTicketsByMovieIdUseCase {
  constructor(private readonly repository: TicketRepository) {}

  async execute(idmovie: number): Promise<TicketEntity[]> {
    return this.repository.findByMovieId(idmovie);
  }
}
