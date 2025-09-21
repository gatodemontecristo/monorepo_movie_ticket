import {
  CreateUserDto,
  UpdateUserDto,
  UserDataSource,
  UserEntity,
  UserRepository,
} from '../../domain';

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly userDataSource: UserDataSource) {}

  create(createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userDataSource.create(createUserDto);
  }
  findByEmail(email: string): Promise<UserEntity> {
    return this.userDataSource.findByEmail(email);
  }
  findById(id: string): Promise<UserEntity> {
    return this.userDataSource.findById(id);
  }
  list(): Promise<UserEntity[]> {
    return this.userDataSource.list();
  }
  update(updateUserDto: UpdateUserDto): Promise<UserEntity> {
    return this.userDataSource.update(updateUserDto);
  }
  delete(id: string): Promise<void> {
    return this.userDataSource.delete(id);
  }
}
