import { TicketEntity } from '../../entities/ticket.entity';
import { TicketRepository } from '../../repository/ticket.repository';

export interface GetListTicketUseCase {
  execute(): Promise<TicketEntity[]>;
}

export class GetListTicket implements GetListTicketUseCase {
  constructor(private readonly repository: TicketRepository) {}

  async execute(): Promise<TicketEntity[]> {
    return this.repository.list();
  }
}
