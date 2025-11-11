import { CreateSeatDto } from '../../dtos';
import { SeatEntity } from '../../entities/seat.entity';
import { SeatRepository } from '../../repository/seat.repository';
import { TicketRepository } from '../../repository/ticket.repository';

export interface CreateSeatUseCase {
  execute(dto: CreateSeatDto): Promise<SeatEntity>;
}

export class CreateSeat implements CreateSeatUseCase {
  constructor(
    private readonly seatRepository: SeatRepository,
    private readonly ticketRepository: TicketRepository,
  ) {}

  async execute(dto: CreateSeatDto): Promise<SeatEntity> {
    // Verificar que el ticket existe
    const ticket = await this.ticketRepository.findById(dto.idticket);
    if (!ticket) throw new Error('Ticket not found');

    // Verificar que la posición no esté ocupada
    const existingSeat = await this.seatRepository.findByPosition(
      dto.column,
      dto.row,
      dto.idticket,
    );
    if (existingSeat) throw new Error('Seat position already taken');

    return this.seatRepository.create(dto);
  }
}
