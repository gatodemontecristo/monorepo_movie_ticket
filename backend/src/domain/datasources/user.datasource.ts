import { CreateUserDto } from '../dtos';
import { UpdateUserDto } from '../dtos/user/update-user.dto';
import { UserEntity } from '../entities/user.entity';

export abstract class UserDataSource {
  abstract create(createUserDto: CreateUserDto): Promise<UserEntity>;
  abstract findByEmail(email: string): Promise<UserEntity | null>;
  abstract findById(id: string): Promise<UserEntity | null>;
  abstract list(): Promise<UserEntity[]>;
  abstract update(updateUserDto: UpdateUserDto): Promise<UserEntity>;
  abstract delete(id: string): Promise<void>;
}
