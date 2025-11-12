import { TicketRepository } from '../../repository/ticket.repository';

export interface DeleteTicketUseCase {
  execute(idticket: string): Promise<void>;
}

export class DeleteTicket implements DeleteTicketUseCase {
  constructor(private readonly repository: TicketRepository) {}

  async execute(idticket: string): Promise<void> {
    const ticket = await this.repository.findById(idticket);
    if (!ticket) throw new Error('Ticket not found');

    return this.repository.delete(idticket);
  }
}
