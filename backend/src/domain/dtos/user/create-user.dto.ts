export class CreateUserDto {
  private constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}

  static create(props: {
    email: string;
    password: string;
  }): [string?, CreateUserDto?] {
    const { email, password } = props;
    if (!email) return ['Email property is required', undefined];
    if (!password) return ['Password property is required', undefined];
    return [undefined, new CreateUserDto(email, password)];
  }
}
