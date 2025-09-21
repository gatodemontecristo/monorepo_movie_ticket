import { fnHash } from '../../../infrastructure/hashService';
import { CreateUserDto } from '../../dtos';
import { UserEntity } from '../../entities/user.entity';
import { UserRepository } from '../../repository/user.repository';

export interface CreateUserUseCase {
  execute(dto: CreateUserDto): Promise<UserEntity>;
}

export class CreateUser implements CreateUserUseCase {
  constructor(private readonly repository: UserRepository) {}

  async execute(dto: CreateUserDto): Promise<UserEntity> {
    const existing = await this.repository.findByEmail(dto.email);
    if (existing) throw new Error('Email already in use');
    if (dto.password) {
      dto = { ...dto, password: await fnHash(dto.password) };
    }
    return this.repository.create(dto);
  }
}
