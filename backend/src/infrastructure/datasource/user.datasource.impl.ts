import {
  CreateUserDto,
  UpdateUserDto,
  UserDataSource,
  UserEntity,
  Usuario,
} from '../../domain';
import { prisma } from '../prismaClient';

export class UserDataSourceImpl implements UserDataSource {
  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { email, password } = createUserDto;
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash: password,
      },
    });
    return UserEntity.fromObject(user);
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const usuario = await prisma.user.findUnique({ where: { email } });
    if (!usuario) throw `Usuario with email ${email} not found`;
    return UserEntity.fromObject(usuario);
  }

  async findById(id: string): Promise<UserEntity> {
    const usuario = await prisma.user.findUnique({ where: { id } });
    if (!usuario) throw `Usuario with id ${id} not found`;
    return UserEntity.fromObject(usuario);
  }

  async list(): Promise<Usuario[]> {
    return prisma.user.findMany();
  }

  async update(updateUserDto: UpdateUserDto): Promise<UserEntity> {
    await this.findById(updateUserDto.id);
    const usuario = await prisma.user.update({
      where: { id: updateUserDto.id },
      data: updateUserDto!.values,
    });
    return UserEntity.fromObject(usuario);
  }

  async delete(id: string): Promise<void> {
    await prisma.user.delete({ where: { id } });
  }
}
