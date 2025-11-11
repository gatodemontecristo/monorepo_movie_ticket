import { Router } from 'express';
import { authMiddleware } from '../users/middlewares/authMiddleware';
import { SeatDataSourceImpl } from '../../infrastructure/datasource/seat.datasource.impl';
import { SeatRepositoryImpl } from '../../infrastructure/repositories/seat.repository.impl';
import { TicketDataSourceImpl } from '../../infrastructure/datasource/ticket.datasource.impl';
import { TicketRepositoryImpl } from '../../infrastructure/repositories/ticket.repository.impl';
import { SeatController } from './controllers/seatController';

const router = Router();

// Inicializar datasources y repositories
const seatDatasource = new SeatDataSourceImpl();
const seatRepository = new SeatRepositoryImpl(seatDatasource);

const ticketDatasource = new TicketDataSourceImpl();
const ticketRepository = new TicketRepositoryImpl(ticketDatasource);

const seatController = new SeatController(seatRepository, ticketRepository);

// CRUD Seats (requieren autenticación)
router.get('/', authMiddleware, seatController.getListSeat);
router.get('/:id', authMiddleware, seatController.getSeatById);
router.post('/', authMiddleware, seatController.createSeat);
router.put('/:id', authMiddleware, seatController.updateSeat);
router.delete('/:id', authMiddleware, seatController.deleteSeat);

// Rutas específicas de seats
router.get(
  '/ticket/:ticketId',
  authMiddleware,
  seatController.getSeatsByTicketId,
);
router.get(
  '/position/search',
  authMiddleware,
  seatController.getSeatByPosition,
);

export default router;
