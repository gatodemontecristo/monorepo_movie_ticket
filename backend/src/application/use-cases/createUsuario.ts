import { UsuarioRepository } from '../../domain/usuarioRepository';
import { HashService } from '../../infrastructure/hashService';

export class CreateUsuario {
  constructor(
    private usuarioRepo: UsuarioRepository,
    private hashService: HashService,
  ) {}

  async execute(email: string, password: string) {
    const existing = await this.usuarioRepo.findByEmail(email);
    if (existing) throw new Error('Email already in use');

    const passwordHash = await this.hashService.hash(password);
    return this.usuarioRepo.create({ email, password: passwordHash });
  }
}
