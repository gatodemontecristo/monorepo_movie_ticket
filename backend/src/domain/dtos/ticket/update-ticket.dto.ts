export class UpdateTicketDto {
  private constructor(
    public readonly idticket: string,
    public readonly price?: number,
    public readonly movieName?: string,
    public readonly idmovie?: number,
    public readonly iduser?: string,
  ) {}

  get values() {
    const returnObj: {
      price?: number;
      movieName?: string;
      idmovie?: number;
      iduser?: string;
    } = {};

    if (this.price !== undefined) returnObj.price = this.price;
    if (this.movieName) returnObj.movieName = this.movieName;
    if (this.idmovie !== undefined) returnObj.idmovie = this.idmovie;
    if (this.iduser) returnObj.iduser = this.iduser;

    return returnObj;
  }

  static create(props: {
    idticket: string;
    price?: number;
    movieName?: string;
    idmovie?: number;
    iduser?: string;
  }): [string?, UpdateTicketDto?] {
    const { idticket, price, movieName, idmovie, iduser } = props;

    if (!idticket || typeof idticket !== 'string') {
      return ['Ticket ID must be a valid string'];
    }

    if (price !== undefined && (typeof price !== 'number' || price <= 0)) {
      return ['Price must be a positive number'];
    }

    if (movieName !== undefined && typeof movieName !== 'string') {
      return ['Movie name must be a string'];
    }

    if (idmovie !== undefined && typeof idmovie !== 'number') {
      return ['Movie ID must be a number'];
    }

    if (iduser !== undefined && typeof iduser !== 'string') {
      return ['User ID must be a string'];
    }

    return [
      undefined,
      new UpdateTicketDto(idticket, price, movieName, idmovie, iduser),
    ];
  }
}
