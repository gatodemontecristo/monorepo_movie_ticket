import { UpdateSeatDto } from '../../dtos';
import { SeatEntity } from '../../entities/seat.entity';
import { SeatRepository } from '../../repository/seat.repository';

export interface UpdateSeatUseCase {
  execute(dto: UpdateSeatDto): Promise<SeatEntity>;
}

export class UpdateSeat implements UpdateSeatUseCase {
  constructor(private readonly repository: SeatRepository) {}

  async execute(dto: UpdateSeatDto): Promise<SeatEntity> {
    const existingSeat = await this.repository.findById(dto.id);
    if (!existingSeat) throw new Error('Seat not found');

    // Si se está cambiando la posición, verificar que no esté ocupada
    if (dto.column !== undefined || dto.row !== undefined) {
      const column = dto.column ?? existingSeat.column;
      const row = dto.row ?? existingSeat.row;
      const idticket = dto.idticket ?? existingSeat.idticket;

      const conflictingSeat = await this.repository.findByPosition(
        column,
        row,
        idticket,
      );
      if (conflictingSeat && conflictingSeat.id !== dto.id) {
        throw new Error('Seat position already taken');
      }
    }

    return this.repository.update(dto);
  }
}
