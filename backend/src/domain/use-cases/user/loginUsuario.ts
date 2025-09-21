import { UsuarioRepository } from '../../repository/usuarioRepository';
import { HashService } from '../../../infrastructure/hashService';
import { TokenService } from '../../../infrastructure/tokenService';

export class LoginUsuario {
  constructor(
    private usuarioRepo: UsuarioRepository,
    private hashService: HashService,
    private tokenService: TokenService,
  ) {}

  async execute(email: string, password: string) {
    const user = await this.usuarioRepo.findByEmail(email);
    if (!user) throw new Error('Invalid credentials');

    const isValid = await this.hashService.compare(password, user.passwordHash);
    if (!isValid) throw new Error('Invalid credentials');

    const token = this.tokenService.generate({
      id: user.id,
      email: user.email,
    });
    return { user, token };
  }
}
