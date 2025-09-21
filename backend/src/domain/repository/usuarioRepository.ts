import { CreateUserDto } from '../dtos';
import { UserEntity } from '../entities/user.entity';
import { UpdateUserDto } from '../dtos/user/update-user.dto';

export interface UsuarioRepository {
  create(createUserDto: CreateUserDto): Promise<UserEntity>;
  findByEmail(email: string): Promise<UserEntity>;
  findById(id: string): Promise<UserEntity>;
  list(): Promise<UserEntity[]>;
  update(updateUserDto: UpdateUserDto): Promise<UserEntity>;
  delete(id: string): Promise<void>;
}
