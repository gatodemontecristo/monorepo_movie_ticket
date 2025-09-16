import { UsuarioRepository } from '../../domain/usuarioRepository';
import { HashService } from '../../infrastructure/hashService';

interface UpdateUsuarioDTO {
  email?: string;
  password?: string;
}

export class UpdateUsuario {
  constructor(
    private usuarioRepo: UsuarioRepository,
    private hashService: HashService,
  ) {}

  async execute(id: string, data: UpdateUsuarioDTO) {
    const user = await this.usuarioRepo.findById(id);
    if (!user) {
      throw new Error('Usuario not found');
    }

    const updateData: any = {};
    if (data.email) updateData.email = data.email;
    if (data.password) {
      updateData.passwordHash = await this.hashService.hash(data.password);
    }

    return this.usuarioRepo.update(id, updateData);
  }
}
