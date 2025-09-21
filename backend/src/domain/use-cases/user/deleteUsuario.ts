import { UsuarioRepository } from '../../repository/usuarioRepository';

export class DeleteUsuario {
  constructor(private usuarioRepo: UsuarioRepository) {}

  async execute(id: string) {
    const user = await this.usuarioRepo.findById(id);
    if (!user) {
      throw new Error('Usuario not found');
    }

    await this.usuarioRepo.delete(id);
    return { message: 'Usuario deleted successfully' };
  }
}
