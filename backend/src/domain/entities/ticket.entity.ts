import { TicketProps } from '../../types/types';

export class TicketEntity {
  constructor(
    public idticket: string,
    public price: number,
    public movieName: string,
    public idmovie: number,
    public iduser: string,
    public day: string,
    public hour: string,
    public location: string,
    public createdAt?: Date | null,
    public updatedAt?: Date | null,
  ) {}

  public static fromObject(object: TicketProps): TicketEntity {
    const {
      idticket,
      price,
      movieName,
      idmovie,
      iduser,
      day,
      hour,
      location,
      createdAt,
      updatedAt,
    } = object;

    if (!idticket) throw 'Ticket ID is required';
    if (price === undefined || price === null) throw 'Price is required';
    if (!movieName) throw 'Movie name is required';
    if (idmovie === undefined || idmovie === null) throw 'Movie ID is required';
    if (!iduser) throw 'User ID is required';
    if (!day) throw 'Day is required';
    if (!hour) throw 'Hour is required';
    if (!location) throw 'Location is required';

    // Validaciones adicionales
    if (price < 0) throw 'Price must be a positive number';
    if (typeof idmovie !== 'number') throw 'Movie ID must be a number';

    let newCreatedAt;
    if (createdAt) {
      newCreatedAt = new Date(createdAt);
      if (isNaN(newCreatedAt.getTime()))
        throw 'Invalid date format for createdAt';
    }

    let newUpdatedAt;
    if (updatedAt) {
      newUpdatedAt = new Date(updatedAt);
      if (isNaN(newUpdatedAt.getTime()))
        throw 'Invalid date format for updatedAt';
    }

    return new TicketEntity(
      idticket,
      price,
      movieName,
      idmovie,
      iduser,
      day,
      hour,
      location,
      newCreatedAt,
      newUpdatedAt,
    );
  }
}
