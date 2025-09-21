import { UsuarioRepository } from '../../repository/usuarioRepository';

export class ListUsuarios {
  constructor(private usuarioRepo: UsuarioRepository) {}

  async execute() {
    return this.usuarioRepo.list();
  }
}
