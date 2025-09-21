import { CreateUserDto, UpdateUserDto, UserRepository } from '../../../domain';
import { ListUsers } from '../../../domain/use-cases/user2/get-list-user';
import { Request, Response } from 'express';
import { GetUserById } from '../../../domain/use-cases/user2/get-user-by-id';
import { CreateUser } from '../../../domain/use-cases/user2/create-user';
import { LoginUser } from '../../../domain/use-cases/user2/login-user';
import { TokenService } from '../../../infrastructure/tokenService';
import { UpdateUser } from '../../../domain/use-cases/user2/update-user';
import { DeleteUser } from '../../../domain/use-cases/user2/delete-user';
const tokenService = new TokenService();

export class UsuarioController2 {
  constructor(private readonly userRepository: UserRepository) {}
  public getListUser = (req: Request, res: Response) => {
    new ListUsers(this.userRepository)
      .execute()
      .then(users => res.json(users))
      .catch(error =>
        res.status(400).json({ error: (error as Error).message }),
      );
  };
  public getUserById = (req: Request, res: Response) => {
    const id = req.params.id;

    new GetUserById(this.userRepository)
      .execute(id)
      .then(user => res.json(user))
      .catch(error =>
        res.status(400).json({ error: (error as Error).message }),
      );
  };
  public createUser = (req: Request, res: Response) => {
    const [error, createUserDto] = CreateUserDto.create(req.body);
    if (error) return res.status(400).json({ error });

    new CreateUser(this.userRepository)
      .execute(createUserDto!)
      .then(user => res.json(user))
      .catch(error =>
        res.status(400).json({ error: (error as Error).message }),
      );
  };

  public loginUser = (req: Request, res: Response) => {
    const { email, password } = req.body;

    new LoginUser(this.userRepository, tokenService)
      .execute(email, password)
      .then(({ user, token }) => res.json({ user, token }))
      .catch(error =>
        res.status(400).json({ error: (error as Error).message }),
      );
  };

  public updateUser = (req: Request, res: Response) => {
    const id = req.params.id;
    const [error, updateUserDto] = UpdateUserDto.create({ ...req.body, id });
    if (error) return res.status(400).json({ error });

    new UpdateUser(this.userRepository)
      .execute(updateUserDto!)
      .then(user => res.json(user))
      .catch(error =>
        res.status(400).json({ error: (error as Error).message }),
      );
  };

  public deleteUser = (req: Request, res: Response) => {
    const id = req.params.id;

    new DeleteUser(this.userRepository)
      .execute(id)
      .then(user => res.json(user))
      .catch(error =>
        res.status(400).json({ error: (error as Error).message }),
      );
  };
}
