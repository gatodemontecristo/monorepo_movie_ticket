import { Router } from 'express';
import { authMiddleware } from './middlewares/authMiddleware';
import { UserDataSourceImpl } from '../../infrastructure/datasource/user.datasource.impl';
import { UserRepositoryImpl } from '../../infrastructure/repositories/user.repository.impl';
import { UserController } from './controllers/usuarioController';

const router = Router();
const datasource = new UserDataSourceImpl();
const userRepository = new UserRepositoryImpl(datasource);
const userController = new UserController(userRepository);

router.post('/register', userController.createUser);
router.post('/login', userController.loginUser);

// CRUD Usuarios
router.get('/', authMiddleware, userController.getListUser);
router.get('/:id', authMiddleware, userController.getUserById);
router.put('/:id', authMiddleware, userController.updateUser);
router.delete('/:id', authMiddleware, userController.deleteUser);

export default router;
