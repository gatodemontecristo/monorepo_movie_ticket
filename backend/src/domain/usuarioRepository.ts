import { Usuario } from './usuario';

export interface UsuarioRepository {
  create(email: string, passwordHash: string): Promise<Usuario>;
  findByEmail(email: string): Promise<Usuario | null>;
  findById(id: string): Promise<Usuario | null>;
  list(): Promise<Usuario[]>;
  update(id: string, data: Partial<Usuario>): Promise<Usuario>;
  delete(id: string): Promise<void>;
}
