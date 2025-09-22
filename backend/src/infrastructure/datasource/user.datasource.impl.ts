import {
  CreateUserDto,
  UpdateUserDto,
  UserDataSource,
  UserEntity,
} from '../../domain';
import { prisma } from '../prismaClient';

export class UserDataSourceImpl implements UserDataSource {
  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { email, password } = createUserDto;
    console.log('LLEGO 3');
    console.log('DTO', createUserDto);
    console.log('EMAIL', email);
    console.log('PASSWORD', password);
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash: password,
      },
    });
    return UserEntity.fromObject(user);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const usuario = await prisma.user.findUnique({ where: { email } });
    if (!usuario) return null;
    return UserEntity.fromObject(usuario);
  }

  async findById(id: string): Promise<UserEntity | null> {
    const usuario = await prisma.user.findUnique({ where: { id } });
    if (!usuario) return null;
    return UserEntity.fromObject(usuario);
  }

  async list(): Promise<UserEntity[]> {
    return prisma.user.findMany();
  }

  async update(updateUserDto: UpdateUserDto): Promise<UserEntity> {
    await this.findById(updateUserDto.id);
    console.log('ID', updateUserDto.id);
    console.log('DTOP', updateUserDto);
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
