import {
  CreateUserDto,
  UpdateUserDto,
  UserDataSource,
  UserEntity,
  UserRepository,
} from '../../domain';

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly datasource: UserDataSource) {}

  create(createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.datasource.create(createUserDto);
  }
  findByEmail(email: string): Promise<UserEntity | null> {
    return this.datasource.findByEmail(email);
  }
  findById(id: string): Promise<UserEntity | null> {
    return this.datasource.findById(id);
  }
  list(): Promise<UserEntity[]> {
    return this.datasource.list();
  }
  update(updateUserDto: UpdateUserDto): Promise<UserEntity> {
    return this.datasource.update(updateUserDto);
  }
  delete(id: string): Promise<void> {
    return this.datasource.delete(id);
  }
}
