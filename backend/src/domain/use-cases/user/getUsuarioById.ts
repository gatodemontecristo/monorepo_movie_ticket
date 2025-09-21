import { UsuarioRepository } from '../../repository/usuarioRepository';

export class GetUsuarioById {
  constructor(private usuarioRepo: UsuarioRepository) {}

  async execute(id: string) {
    const user = await this.usuarioRepo.findById(id);
    if (!user) {
      throw new Error('Usuario not found');
    }
    return user;
  }
}
