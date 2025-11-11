import { TicketEntity } from '../../entities/ticket.entity';
import { TicketRepository } from '../../repository/ticket.repository';

export interface GetTicketsByUserIdUseCase {
  execute(iduser: string): Promise<TicketEntity[]>;
}

export class GetTicketsByUserId implements GetTicketsByUserIdUseCase {
  constructor(private readonly repository: TicketRepository) {}

  async execute(iduser: string): Promise<TicketEntity[]> {
    return this.repository.findByUserId(iduser);
  }
}
