import { fnCompare } from '../../../infrastructure/hashService';
import { TokenService } from '../../../infrastructure/tokenService';
import { UserEntity } from '../../entities/user.entity';
import { UserRepository } from '../../repository/user.repository';
export interface LoginUserUseCase {
  execute(
    email: string,
    password: string,
  ): Promise<{
    user: UserEntity;
    token: string;
  }>;
}

export class LoginUser implements LoginUserUseCase {
  constructor(
    private userRepo: UserRepository,
    private tokenService: TokenService,
  ) {}

  async execute(email: string, password: string) {
    const user = await this.userRepo.findByEmail(email);
    if (!user) throw new Error('Invalid email user 💁');

    const isValid = await fnCompare(password, user.passwordHash);
    if (!isValid) throw new Error('Invalid password user for that email');

    const token = this.tokenService.generate({
      id: user.id,
      email: user.email,
    });
    return { user, token };
  }
}
