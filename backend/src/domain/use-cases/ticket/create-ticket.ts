import { CreateTicketDto } from '../../dtos';
import { TicketEntity } from '../../entities/ticket.entity';
import { TicketRepository } from '../../repository/ticket.repository';
import { UserRepository } from '../../repository/user.repository';

export interface CreateTicketUseCase {
  execute(dto: CreateTicketDto): Promise<TicketEntity>;
}

export class CreateTicket implements CreateTicketUseCase {
  constructor(
    private readonly ticketRepository: TicketRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(dto: CreateTicketDto): Promise<TicketEntity> {
    // Verificar que el usuario existe
    const user = await this.userRepository.findById(dto.iduser);
    if (!user) throw new Error('User not found');

    // Validar que el precio sea válido
    if (dto.price <= 0) throw new Error('Price must be greater than 0');

    return this.ticketRepository.create(dto);
  }
}
