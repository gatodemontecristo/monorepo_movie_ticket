import { prisma } from './prismaClient';
import { UsuarioRepository } from '../domain/usuarioRepository';
import { Usuario } from '../domain/usuario';
import { UserEntity } from '../domain/entities/user.entity';
import { CreateUserDto } from '../domain/dtos';

export class PrismaUsuarioRepository implements UsuarioRepository {
  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { email, password } = createUserDto;
    const user = await prisma.usuario.create({
      data: {
        email,
        passwordHash: password,
      },
    });
    return UserEntity.fromObject(user);
  }

  async findByEmail(email: string): Promise<Usuario | null> {
    return prisma.usuario.findUnique({ where: { email } });
  }

  async findById(id: string): Promise<Usuario | null> {
    return prisma.usuario.findUnique({ where: { id } });
  }

  async list(): Promise<Usuario[]> {
    return prisma.usuario.findMany();
  }

  async update(id: string, data: Partial<Usuario>): Promise<Usuario> {
    return prisma.usuario.update({ where: { id }, data });
  }

  async delete(id: string): Promise<void> {
    await prisma.usuario.delete({ where: { id } });
  }
}
