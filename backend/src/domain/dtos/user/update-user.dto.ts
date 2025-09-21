import { UserProps } from '../../../types/types';

export class UpdateUserDto {
  private constructor(
    public readonly id: string,
    public readonly data?: Partial<UserProps>,
  ) {}

  get values() {
    const returnObj: { data?: Partial<UserProps> } = {};

    if (this.data) {
      returnObj.data = this.data;
    }

    return returnObj;
  }

  static create(props: {
    id: string;
    data?: Partial<UserProps>;
  }): [string?, UpdateUserDto?] {
    const { id, data } = props;

    if (!id || typeof id !== 'string') {
      return ['id must be a valid string'];
    }

    return [undefined, new UpdateUserDto(id, data)];
  }
}
