export class UserEntity {
  constructor(
    public id: string,
    public email: string,
    public passwordHash: string,
    public createdAt?: Date | null,
    public updatedAt?: Date | null,
  ) {}

  public static fromObject(object: {
    id: string;
    email: string;
    passwordHash: string;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
  }): UserEntity {
    const { id, email, passwordHash, createdAt, updatedAt } = object;
    if (!id) throw 'Id is required';
    if (!email) throw 'Email is required';
    if (!passwordHash) throw 'Password hash is required';
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

    return new UserEntity(id, email, passwordHash, newCreatedAt, newUpdatedAt);
  }
}
