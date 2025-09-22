import { UserEntity } from '../../entities/user.entity';
import { UserRepository } from '../../repository/user.repository';

export interface ListUsersUseCase {
  execute(): Promise<UserEntity[]>;
}
export class ListUsers implements ListUsersUseCase {
  constructor(private userRepo: UserRepository) {}

  execute(): Promise<UserEntity[]> {
    return this.userRepo.list();
  }
}
