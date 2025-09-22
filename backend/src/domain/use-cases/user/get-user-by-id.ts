import { UserEntity } from '../../entities/user.entity';
import { UserRepository } from '../../repository/user.repository';

export interface GetUserByIdUseCase {
  execute(id: string): Promise<UserEntity>;
}
export class GetUserById implements GetUserByIdUseCase {
  constructor(private userRepo: UserRepository) {}

  async execute(id: string): Promise<UserEntity> {
    const user = await this.userRepo.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}
