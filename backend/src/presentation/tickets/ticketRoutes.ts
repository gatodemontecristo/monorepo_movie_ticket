import { Router } from 'express';
import { authMiddleware } from '../users/middlewares/authMiddleware';
import { TicketDataSourceImpl } from '../../infrastructure/datasource/ticket.datasource.impl';
import { TicketRepositoryImpl } from '../../infrastructure/repositories/ticket.repository.impl';
import { UserDataSourceImpl } from '../../infrastructure/datasource/user.datasource.impl';
import { UserRepositoryImpl } from '../../infrastructure/repositories/user.repository.impl';
import { TicketController } from './controllers/ticketController';

const router = Router();

// Inicializar datasources y repositories
const ticketDatasource = new TicketDataSourceImpl();
const ticketRepository = new TicketRepositoryImpl(ticketDatasource);

const userDatasource = new UserDataSourceImpl();
const userRepository = new UserRepositoryImpl(userDatasource);

const ticketController = new TicketController(ticketRepository, userRepository);

// CRUD Tickets (requieren autenticación)
router.get('/', authMiddleware, ticketController.getListTicket);
router.get('/:id', authMiddleware, ticketController.getTicketById);
router.post('/', authMiddleware, ticketController.createTicket);
router.put('/:id', authMiddleware, ticketController.updateTicket);
router.delete('/:id', authMiddleware, ticketController.deleteTicket);

// Rutas específicas de tickets
router.get(
  '/user/:userId',
  authMiddleware,
  ticketController.getTicketsByUserId,
);
router.get(
  '/movie/:movieId',
  authMiddleware,
  ticketController.getTicketsByMovieId,
);

export default router;
