import { CreateUserDto, UpdateUserDto } from '../dtos';
import { UserEntity } from '../entities/user.entity';

export abstract class UserDataSource {
  abstract create(createUserDto: CreateUserDto): Promise<UserEntity>;

  abstract findByEmail(email: string): Promise<UserEntity>;
  abstract findById(id: string): Promise<UserEntity>;
  abstract list(): Promise<UserEntity[]>;
  abstract update(updateUserDto: UpdateUserDto): Promise<UserEntity>;
  abstract delete(id: string): Promise<void>;
}
