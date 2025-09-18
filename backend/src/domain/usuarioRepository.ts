import { CreateUserDto } from './dtos';
import { UserEntity } from './entities/user.entity';
import { Usuario } from './usuario';

export interface UsuarioRepository {
  create(createUserDto: CreateUserDto): Promise<UserEntity>;
  findByEmail(email: string): Promise<Usuario | null>;
  findById(id: string): Promise<Usuario | null>;
  list(): Promise<Usuario[]>;
  update(id: string, data: Partial<Usuario>): Promise<Usuario>;
  delete(id: string): Promise<void>;
}
