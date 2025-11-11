import {
  CreateTicketDto,
  UpdateTicketDto,
  TicketDataSource,
  TicketEntity,
} from '../../domain';
import { prisma } from '../prismaClient';

export class TicketDataSourceImpl implements TicketDataSource {
  async create(createTicketDto: CreateTicketDto): Promise<TicketEntity> {
    const { price, movieName, idmovie, iduser } = createTicketDto;
    const ticket = await prisma.ticket.create({
      data: {
        price,
        movieName,
        idmovie,
        iduser,
      },
    });
    return TicketEntity.fromObject(ticket);
  }

  async findById(idticket: string): Promise<TicketEntity | null> {
    const ticket = await prisma.ticket.findUnique({
      where: { idticket },
    });
    if (!ticket) return null;
    return TicketEntity.fromObject(ticket);
  }

  async findByUserId(iduser: string): Promise<TicketEntity[]> {
    const tickets = await prisma.ticket.findMany({
      where: { iduser },
      orderBy: { createdAt: 'desc' },
    });
    return tickets.map(ticket => TicketEntity.fromObject(ticket));
  }

  async findByMovieId(idmovie: number): Promise<TicketEntity[]> {
    const tickets = await prisma.ticket.findMany({
      where: { idmovie },
      orderBy: { createdAt: 'desc' },
    });
    return tickets.map(ticket => TicketEntity.fromObject(ticket));
  }

  async list(): Promise<TicketEntity[]> {
    const tickets = await prisma.ticket.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return tickets.map(ticket => TicketEntity.fromObject(ticket));
  }

  async update(updateTicketDto: UpdateTicketDto): Promise<TicketEntity> {
    const { idticket, ...updateData } = updateTicketDto;

    // Verificar que el ticket existe
    await this.findById(idticket);

    const ticket = await prisma.ticket.update({
      where: { idticket },
      data: updateData,
    });
    return TicketEntity.fromObject(ticket);
  }

  async delete(idticket: string): Promise<void> {
    await prisma.ticket.delete({ where: { idticket } });
  }

  async findTicketsWithSeats(idticket: string): Promise<TicketEntity | null> {
    const ticket = await prisma.ticket.findUnique({
      where: { idticket },
      include: {
        seats: true,
        user: {
          select: {
            id: true,
            email: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    if (!ticket) return null;
    return TicketEntity.fromObject(ticket);
  }
}
