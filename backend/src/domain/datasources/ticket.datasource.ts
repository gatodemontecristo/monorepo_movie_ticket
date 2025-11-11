import { CreateTicketDto } from '../dtos';
import { UpdateTicketDto } from '../dtos';
import { TicketEntity } from '../entities/ticket.entity';

export abstract class TicketDataSource {
  abstract create(createTicketDto: CreateTicketDto): Promise<TicketEntity>;
  abstract findById(idticket: string): Promise<TicketEntity | null>;
  abstract findByUserId(iduser: string): Promise<TicketEntity[]>;
  abstract findByMovieId(idmovie: number): Promise<TicketEntity[]>;
  abstract list(): Promise<TicketEntity[]>;
  abstract update(updateTicketDto: UpdateTicketDto): Promise<TicketEntity>;
  abstract delete(idticket: string): Promise<void>;
  abstract findTicketsWithSeats(idticket: string): Promise<TicketEntity | null>;
}
