export class UpdateSeatDto {
  private constructor(
    public readonly id: string,
    public readonly column?: number,
    public readonly row?: number,
    public readonly idticket?: string,
  ) {}

  get values() {
    const returnObj: {
      column?: number;
      row?: number;
      idticket?: string;
    } = {};

    if (this.column !== undefined) returnObj.column = this.column;
    if (this.row !== undefined) returnObj.row = this.row;
    if (this.idticket) returnObj.idticket = this.idticket;

    return returnObj;
  }

  static create(props: {
    id: string;
    column?: number;
    row?: number;
    idticket?: string;
  }): [string?, UpdateSeatDto?] {
    const { id, column, row, idticket } = props;

    if (!id || typeof id !== 'string') {
      return ['Seat ID must be a valid string'];
    }

    if (column !== undefined && (typeof column !== 'number' || column <= 0)) {
      return ['Column must be a positive number'];
    }

    if (row !== undefined && (typeof row !== 'number' || row <= 0)) {
      return ['Row must be a positive number'];
    }

    if (idticket !== undefined && typeof idticket !== 'string') {
      return ['Ticket ID must be a string'];
    }

    return [undefined, new UpdateSeatDto(id, column, row, idticket)];
  }
}
