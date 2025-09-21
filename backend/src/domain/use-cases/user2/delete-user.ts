import { UserEntity } from '../../entities/user.entity';
import { UserRepository } from '../../repository/user.repository';

export interface DeleteUserUseCase {
  execute(id: string): Promise<UserEntity>;
}

export class DeleteUser implements DeleteUserUseCase {
  constructor(private readonly repository: UserRepository) {}

  async execute(id: string): Promise<UserEntity> {
    const user = await this.repository.findById(id);
    if (!user) {
      throw new Error('Usuario not found');
    }

    await this.repository.delete(id);
    return user;
  }
}
