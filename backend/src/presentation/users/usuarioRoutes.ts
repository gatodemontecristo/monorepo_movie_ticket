import { Router } from 'express';
import { authMiddleware } from './middlewares/authMiddleware';
import { UserDataSourceImpl } from '../../infrastructure/datasource/user.datasource.impl';
import { UserRepositoryImpl } from '../../infrastructure/repositories/user.repository.impl';
import { UsuarioController2 } from './controllers/usuarioController2';

const router = Router();
const datasource = new UserDataSourceImpl();
const userRepository = new UserRepositoryImpl(datasource);
const usuarioController = new UsuarioController2(userRepository);

router.post('/register', usuarioController.createUser);
router.post('/login', usuarioController.loginUser);

// CRUD Usuarios
router.get('/', authMiddleware, usuarioController.getListUser);
router.get('/:id', authMiddleware, usuarioController.getUserById);
router.put('/:id', authMiddleware, usuarioController.updateUser);
router.delete('/:id', authMiddleware, usuarioController.deleteUser);

export default router;
