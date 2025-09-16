import { Router } from 'express';
import { UsuarioController } from '../controllers/usuarioController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/register', UsuarioController.register);
router.post('/login', UsuarioController.login);

// CRUD Usuarios
router.get('/', authMiddleware, UsuarioController.list);
router.get('/:id', authMiddleware, UsuarioController.getById);
router.put('/:id', authMiddleware, UsuarioController.update);
router.delete('/:id', authMiddleware, UsuarioController.delete);

export default router;
