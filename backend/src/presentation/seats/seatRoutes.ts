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
router.get('/', seatController.getListSeat);
router.get('/:id', seatController.getSeatById);
router.post('/', authMiddleware, seatController.createSeat);
router.post('/bulk', authMiddleware, seatController.createMultipleSeats);
router.put('/:id', authMiddleware, seatController.updateSeat);
router.delete('/:id', authMiddleware, seatController.deleteSeat);

// Rutas específicas de seats
router.get('/ticket/:ticketId', seatController.getSeatsByTicketId);
router.get('/movie/:movieId', seatController.getSeatsByMovieId);
router.get('/position/search', seatController.getSeatByPosition);

export default router;
