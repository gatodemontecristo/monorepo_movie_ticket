import { Request, Response } from 'express';

import {
  CreateUser,
  CreateUserDto,
  DeleteUser,
  GetUserById,
  ListUsers,
  LoginUser,
  UpdateUser,
  UpdateUserDto,
  UserRepository,
} from '../../../domain';
import { TokenService } from '../../../infrastructure/tokenService';

const tokenService = new TokenService();

export class UserController {
  constructor(private readonly userRepository: UserRepository) {}
  public getListUser = (req: Request, res: Response) => {
    new ListUsers(this.userRepository)
      .execute()
      .then(users => res.json(users))
      .catch(error => res.status(400).json({ error }));
  };
  public getUserById = (req: Request, res: Response) => {
    const id = req.params.id;

    new GetUserById(this.userRepository)
      .execute(id)
      .then(user => res.json(user))
      .catch(error => res.status(400).json({ error }));
  };
  public createUser = (req: Request, res: Response) => {
    const [error, createUserDto] = CreateUserDto.create(req.body);
    console.log('error', error);

    console.log('createUserDto', createUserDto);

    if (error) return res.status(400).json({ error });
    console.log('LLEGO');

    new CreateUser(this.userRepository)
      .execute(createUserDto!)
      .then(user => res.json(user))
      .catch(error => res.status(400).json({ error }));
  };

  public loginUser = (req: Request, res: Response) => {
    const { email, password } = req.body;

    new LoginUser(this.userRepository, tokenService)
      .execute(email, password)
      .then(({ user, token }) => res.json({ user, token }))
      .catch(error => res.status(400).json({ error }));
  };

  public updateUser = (req: Request, res: Response) => {
    const id = req.params.id;
    const [error, updateUserDto] = UpdateUserDto.create({ ...req.body, id });
    if (error) return res.status(400).json({ error });

    new UpdateUser(this.userRepository)
      .execute(updateUserDto!)
      .then(user => res.json(user))
      .catch(error => res.status(400).json({ error }));
  };

  public deleteUser = (req: Request, res: Response) => {
    const id = req.params.id;

    new DeleteUser(this.userRepository)
      .execute(id)
      .then(user => res.json(user))
      .catch(error => res.status(400).json({ error }));
  };
}
