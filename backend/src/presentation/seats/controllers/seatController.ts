import { Request, Response } from 'express';

import {
  CreateSeat,
  CreateSeatDto,
  DeleteSeat,
  GetSeatById,
  GetListSeat,
  GetSeatsByTicketId,
  GetSeatByPosition,
  UpdateSeat,
  UpdateSeatDto,
  SeatRepository,
  TicketRepository,
} from '../../../domain';

export class SeatController {
  constructor(
    private readonly seatRepository: SeatRepository,
    private readonly ticketRepository: TicketRepository,
  ) {}

  public getListSeat = (req: Request, res: Response) => {
    new GetListSeat(this.seatRepository)
      .execute()
      .then(seats => res.json(seats))
      .catch(error => res.status(400).json({ error }));
  };

  public getSeatById = (req: Request, res: Response) => {
    const id = req.params.id;

    new GetSeatById(this.seatRepository)
      .execute(id)
      .then(seat => res.json(seat))
      .catch(error => res.status(400).json({ error }));
  };

  public getSeatsByTicketId = (req: Request, res: Response) => {
    const idticket = req.params.ticketId;

    new GetSeatsByTicketId(this.seatRepository)
      .execute(idticket)
      .then(seats => res.json(seats))
      .catch(error => res.status(400).json({ error }));
  };

  public getSeatByPosition = (req: Request, res: Response) => {
    const { column, row, ticketId } = req.query;

    if (!column || !row || !ticketId) {
      return res.status(400).json({
        error: 'Column, row, and ticketId are required query parameters',
      });
    }

    const columnNum = parseInt(column as string);
    const rowNum = parseInt(row as string);

    if (isNaN(columnNum) || isNaN(rowNum)) {
      return res
        .status(400)
        .json({ error: 'Column and row must be valid numbers' });
    }

    new GetSeatByPosition(this.seatRepository)
      .execute(columnNum, rowNum, ticketId as string)
      .then(seat => res.json(seat))
      .catch(error => res.status(400).json({ error }));
  };

  public createSeat = (req: Request, res: Response) => {
    const [error, createSeatDto] = CreateSeatDto.create(req.body);

    if (error) return res.status(400).json({ error });

    new CreateSeat(this.seatRepository, this.ticketRepository)
      .execute(createSeatDto!)
      .then(seat => res.json(seat))
      .catch(error =>
        res.status(400).json({ error: (error as Error).message }),
      );
  };

  public updateSeat = (req: Request, res: Response) => {
    const id = req.params.id;
    const [error, updateSeatDto] = UpdateSeatDto.create({
      ...req.body,
      id,
    });

    if (error) return res.status(400).json({ error });

    new UpdateSeat(this.seatRepository)
      .execute(updateSeatDto!)
      .then(seat => res.json(seat))
      .catch(error => res.status(400).json({ error }));
  };

  public deleteSeat = (req: Request, res: Response) => {
    const id = req.params.id;

    new DeleteSeat(this.seatRepository)
      .execute(id)
      .then(() => res.json({ message: 'Seat deleted successfully' }))
      .catch(error => res.status(400).json({ error }));
  };
}
