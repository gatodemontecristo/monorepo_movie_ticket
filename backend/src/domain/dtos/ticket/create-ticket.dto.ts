export class CreateTicketDto {
  private constructor(
    public readonly price: number,
    public readonly movieName: string,
    public readonly idmovie: number,
    public readonly iduser: string,
    public readonly day: string,
    public readonly hour: string,
    public readonly location: string,
  ) {}

  static create(props: {
    price: number;
    movieName: string;
    idmovie: number;
    iduser: string;
    day: string;
    hour: string;
    location: string;
  }): [string?, CreateTicketDto?] {
    const { price, movieName, idmovie, iduser, day, hour, location } = props;

    if (price === undefined || price === null)
      return ['Price property is required', undefined];
    if (typeof price !== 'number') return ['Price must be a number', undefined];
    if (price <= 0) return ['Price must be greater than 0', undefined];

    if (!movieName) return ['Movie name property is required', undefined];
    if (typeof movieName !== 'string')
      return ['Movie name must be a string', undefined];

    if (idmovie === undefined || idmovie === null)
      return ['Movie ID property is required', undefined];
    if (typeof idmovie !== 'number')
      return ['Movie ID must be a number', undefined];

    if (!iduser) return ['User ID property is required', undefined];
    if (typeof iduser !== 'string')
      return ['User ID must be a string', undefined];

    if (!day) return ['Day property is required', undefined];
    if (typeof day !== 'string') return ['Day must be a string', undefined];

    if (!hour) return ['Hour property is required', undefined];
    if (typeof hour !== 'string') return ['Hour must be a string', undefined];

    if (!location) return ['Location property is required', undefined];
    if (typeof location !== 'string')
      return ['Location must be a string', undefined];

    return [
      undefined,
      new CreateTicketDto(
        price,
        movieName,
        idmovie,
        iduser,
        day,
        hour,
        location,
      ),
    ];
  }
}
