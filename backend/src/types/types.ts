export interface UserProps {
  id: string;
  email: string;
  passwordHash: string;
  createdAt?: Date | string | null;
  updatedAt?: Date | string | null;
}

export interface TicketProps {
  idticket: string;
  price: number;
  movieName: string;
  idmovie: number;
  iduser: string;
  day: string;
  hour: string;
  location: string;
  createdAt?: Date | string | null;
  updatedAt?: Date | string | null;
}

export interface SeatProps {
  id: string;
  column: number;
  row: number;
  idticket: string;
  createdAt?: Date | string | null;
  updatedAt?: Date | string | null;
}
