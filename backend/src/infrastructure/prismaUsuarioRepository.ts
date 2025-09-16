import { prisma } from './prismaClient';
import { UsuarioRepository } from '../domain/usuarioRepository';
import { Usuario } from '../domain/usuario';

export class PrismaUsuarioRepository implements UsuarioRepository {
  async create(email: string, passwordHash: string): Promise<Usuario> {
    return prisma.usuario.create({ data: { email, passwordHash } });
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
