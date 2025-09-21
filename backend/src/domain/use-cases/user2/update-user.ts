import { fnHash } from '../../../infrastructure/hashService';
import { UserProps } from '../../../types/types';
import { UpdateUserDto } from '../../dtos';
import { UserEntity } from '../../entities/user.entity';
import { UserRepository } from '../../repository/user.repository';

export interface UpdateUserUseCase {
  execute(dto: UpdateUserDto): Promise<UserEntity>;
}

export class UpdateUser implements UpdateUserUseCase {
  constructor(private readonly repository: UserRepository) {}

  async execute(dto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.repository.findById(dto.id);
    if (!user) throw new Error('User not found');

    const updatedUser = { ...user, ...dto.data };
    if (dto?.data?.passwordHash) {
      updatedUser.passwordHash = await fnHash(dto.data.passwordHash);
    }

    return this.repository.update({
      id: dto.id,
      data: { ...(updatedUser as UserProps) },
      values: dto.values,
    });
  }
}
