import { UserProps } from '../../../types/types';

export class UpdateUserDto {
  private constructor(
    public readonly id: string,
    public readonly email?: string,
    public readonly password?: string,
  ) {}

  get values() {
    const returnObj: { email?: string; passwordHash?: string } = {};

    if (this.email) returnObj.email = this.email;
    if (this.password) returnObj.passwordHash = this.password;

    return returnObj;
  }

  static create(props: {
    id: string;
    email?: string;
    password?: string;
  }): [string?, UpdateUserDto?] {
    const { id, email, password } = props;

    if (!id || typeof id !== 'string') {
      return ['id must be a valid string'];
    }

    return [undefined, new UpdateUserDto(id, email, password)];
  }
}
