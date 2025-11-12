import { Request, Response } from 'express';

import {
  CreateTicket,
  CreateTicketDto,
  DeleteTicket,
  GetTicketById,
  GetListTicket,
  GetTicketsByUserId,
  GetTicketsByMovieId,
  UpdateTicket,
  UpdateTicketDto,
  TicketRepository,
  UserRepository,
} from '../../../domain';

export class TicketController {
  constructor(
    private readonly ticketRepository: TicketRepository,
    private readonly userRepository: UserRepository,
  ) {}

  public getListTicket = (req: Request, res: Response) => {
    new GetListTicket(this.ticketRepository)
      .execute()
      .then(tickets => res.json(tickets))
      .catch(error => res.status(400).json({ error }));
  };

  public getTicketById = (req: Request, res: Response) => {
    const idticket = req.params.id;

    new GetTicketById(this.ticketRepository)
      .execute(idticket)
      .then(ticket => res.json(ticket))
      .catch(error => res.status(400).json({ error }));
  };

  public getTicketsByUserId = (req: Request, res: Response) => {
    const iduser = req.params.userId;

    new GetTicketsByUserId(this.ticketRepository)
      .execute(iduser)
      .then(tickets => res.json(tickets))
      .catch(error => res.status(400).json({ error }));
  };

  public getTicketsByMovieId = (req: Request, res: Response) => {
    const idmovie = parseInt(req.params.movieId);

    if (isNaN(idmovie)) {
      return res.status(400).json({ error: 'Invalid movie ID' });
    }

    new GetTicketsByMovieId(this.ticketRepository)
      .execute(idmovie)
      .then(tickets => res.json(tickets))
      .catch(error => res.status(400).json({ error }));
  };

  public createTicket = (req: Request, res: Response) => {
    const [error, createTicketDto] = CreateTicketDto.create(req.body);

    if (error) return res.status(400).json({ error });

    new CreateTicket(this.ticketRepository, this.userRepository)
      .execute(createTicketDto!)
      .then(ticket => res.json(ticket))
      .catch(error =>
        res.status(400).json({ error: (error as Error).message }),
      );
  };

  public updateTicket = (req: Request, res: Response) => {
    const idticket = req.params.id;
    const [error, updateTicketDto] = UpdateTicketDto.create({
      ...req.body,
      idticket,
    });

    if (error) return res.status(400).json({ error });

    new UpdateTicket(this.ticketRepository)
      .execute(updateTicketDto!)
      .then(ticket => res.json(ticket))
      .catch(error => res.status(400).json({ error }));
  };

  public deleteTicket = (req: Request, res: Response) => {
    const idticket = req.params.id;

    new DeleteTicket(this.ticketRepository)
      .execute(idticket)
      .then(() => res.json({ message: 'Ticket deleted successfully' }))
      .catch(error => res.status(400).json({ error }));
  };
}
