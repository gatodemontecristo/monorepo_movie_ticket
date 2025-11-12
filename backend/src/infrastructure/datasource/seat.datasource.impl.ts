import {
  CreateSeatDto,
  UpdateSeatDto,
  SeatDataSource,
  SeatEntity,
} from '../../domain';
import { prisma } from '../prismaClient';

export class SeatDataSourceImpl implements SeatDataSource {
  async create(createSeatDto: CreateSeatDto): Promise<SeatEntity> {
    const { column, row, idticket } = createSeatDto;
    const seat = await prisma.seat.create({
      data: {
        column,
        row,
        idticket,
      },
    });
    return SeatEntity.fromObject(seat);
  }

  async findById(id: string): Promise<SeatEntity | null> {
    const seat = await prisma.seat.findUnique({
      where: { id },
    });
    if (!seat) return null;
    return SeatEntity.fromObject(seat);
  }

  async findByTicketId(idticket: string): Promise<SeatEntity[]> {
    const seats = await prisma.seat.findMany({
      where: { idticket },
      orderBy: [{ row: 'asc' }, { column: 'asc' }],
    });
    return seats.map(seat => SeatEntity.fromObject(seat));
  }

  async findByMovieId(idmovie: number): Promise<SeatEntity[]> {
    const seats = await prisma.seat.findMany({
      where: {
        ticket: {
          idmovie: idmovie,
        },
      },
      include: {
        ticket: true,
      },
      orderBy: [
        { ticket: { idmovie: 'asc' } },
        { row: 'asc' },
        { column: 'asc' },
      ],
    });
    return seats.map(seat => SeatEntity.fromObject(seat));
  }

  async findByPosition(
    column: number,
    row: number,
    idticket: string,
  ): Promise<SeatEntity | null> {
    const seat = await prisma.seat.findFirst({
      where: {
        column,
        row,
        idticket,
      },
    });
    if (!seat) return null;
    return SeatEntity.fromObject(seat);
  }

  async list(): Promise<SeatEntity[]> {
    const seats = await prisma.seat.findMany({
      orderBy: [{ idticket: 'asc' }, { row: 'asc' }, { column: 'asc' }],
    });
    return seats.map(seat => SeatEntity.fromObject(seat));
  }

  async update(updateSeatDto: UpdateSeatDto): Promise<SeatEntity> {
    const { id, ...updateData } = updateSeatDto;

    // Verificar que el asiento existe
    await this.findById(id);

    const seat = await prisma.seat.update({
      where: { id },
      data: updateData,
    });
    return SeatEntity.fromObject(seat);
  }

  async delete(id: string): Promise<void> {
    await prisma.seat.delete({ where: { id } });
  }

  async findAvailableSeats(idticket: string): Promise<SeatEntity[]> {
    // Para esta implementación, consideramos que todos los asientos del ticket están disponibles
    // En una implementación más compleja, podrías tener un campo 'status' o 'available'
    return this.findByTicketId(idticket);
  }

  async bulkCreate(createSeatsDto: CreateSeatDto[]): Promise<SeatEntity[]> {
    const seats = await prisma.seat.createMany({
      data: createSeatsDto,
      skipDuplicates: true,
    });

    // Retornar los asientos creados
    // Como createMany no retorna los objetos creados, necesitamos buscarlos
    const createdSeats = await prisma.seat.findMany({
      where: {
        idticket: {
          in: createSeatsDto.map(dto => dto.idticket),
        },
      },
      orderBy: [{ row: 'asc' }, { column: 'asc' }],
    });

    return createdSeats.map(seat => SeatEntity.fromObject(seat));
  }
}
