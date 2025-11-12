export class CreateSeatDto {
  private constructor(
    public readonly column: number,
    public readonly row: number,
    public readonly idticket: string,
  ) {}

  static create(props: {
    column: number;
    row: number;
    idticket: string;
  }): [string?, CreateSeatDto?] {
    const { column, row, idticket } = props;

    if (column === undefined || column === null)
      return ['Column property is required', undefined];
    if (typeof column !== 'number')
      return ['Column must be a number', undefined];
    if (column <= 0) return ['Column must be greater than 0', undefined];

    if (row === undefined || row === null)
      return ['Row property is required', undefined];
    if (typeof row !== 'number') return ['Row must be a number', undefined];
    if (row <= 0) return ['Row must be greater than 0', undefined];

    if (!idticket) return ['Ticket ID property is required', undefined];
    if (typeof idticket !== 'string')
      return ['Ticket ID must be a string', undefined];

    return [undefined, new CreateSeatDto(column, row, idticket)];
  }
}
