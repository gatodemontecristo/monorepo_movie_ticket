import { UpdateTicketDto } from '../../dtos';
import { TicketEntity } from '../../entities/ticket.entity';
import { TicketRepository } from '../../repository/ticket.repository';

export interface UpdateTicketUseCase {
  execute(dto: UpdateTicketDto): Promise<TicketEntity>;
}

export class UpdateTicket implements UpdateTicketUseCase {
  constructor(private readonly repository: TicketRepository) {}

  async execute(dto: UpdateTicketDto): Promise<TicketEntity> {
    const existingTicket = await this.repository.findById(dto.idticket);
    if (!existingTicket) throw new Error('Ticket not found');

    return this.repository.update(dto);
  }
}
