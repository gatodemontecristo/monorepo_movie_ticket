import { TicketEntity } from '../../entities/ticket.entity';
import { TicketRepository } from '../../repository/ticket.repository';

export interface GetTicketByIdUseCase {
  execute(idticket: string): Promise<TicketEntity>;
}

export class GetTicketById implements GetTicketByIdUseCase {
  constructor(private readonly repository: TicketRepository) {}

  async execute(idticket: string): Promise<TicketEntity> {
    const ticket = await this.repository.findById(idticket);
    if (!ticket) throw new Error('Ticket not found');

    return ticket;
  }
}
