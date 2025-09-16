import { Request, Response } from 'express';
import { PrismaUsuarioRepository } from '../../infrastructure/prismaUsuarioRepository';
import { HashService } from '../../infrastructure/hashService';
import { TokenService } from '../../infrastructure/tokenService';
import { CreateUsuario } from '../../application/use-cases/createUsuario';
import { LoginUsuario } from '../../application/use-cases/loginUsuario';
import { GetUsuarioById } from '../../application/use-cases/getUsuarioById';
import { ListUsuarios } from '../../application/use-cases/listUsuarios';

import { UpdateUsuario } from '../../application/use-cases/updateUsuario';
import { DeleteUsuario } from '../../application/use-cases/deleteUsuario';

const usuarioRepo = new PrismaUsuarioRepository();
const hashService = new HashService();
const tokenService = new TokenService();

export class UsuarioController {
  static async register(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const useCase = new CreateUsuario(usuarioRepo, hashService);
      const user = await useCase.execute(email, password);
      res.status(201).json(user);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const useCase = new LoginUsuario(usuarioRepo, hashService, tokenService);
      const result = await useCase.execute(email, password);
      res.json(result);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
  static async list(req: Request, res: Response) {
    try {
      const useCase = new ListUsuarios(usuarioRepo);
      const users = await useCase.execute();
      res.json(users);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const useCase = new GetUsuarioById(usuarioRepo);
      const user = await useCase.execute(id);
      res.json(user);
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { email, password } = req.body;
      const useCase = new UpdateUsuario(usuarioRepo, hashService);
      const updatedUser = await useCase.execute(id, { email, password });
      res.json(updatedUser);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const useCase = new DeleteUsuario(usuarioRepo);
      const result = await useCase.execute(id);
      res.json(result);
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  }
}
