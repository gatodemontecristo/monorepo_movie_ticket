import express from 'express';
import cors from 'cors';

import usuarioRoutes from './users/usuarioRoutes';
import ticketRoutes from './tickets/ticketRoutes';
import seatRoutes from './seats/seatRoutes';

const app = express();

// Configuración CORS para permitir peticiones del frontend
app.use(
  cors({
    origin: [
      'http://localhost:3000', // Frontend en desarrollo local
      'http://localhost:3009', // Puerto alternativo del frontend
      'http://frontend:3009', // Comunicación interna en Docker
    ],
    credentials: true, // Permitir cookies y headers de autenticación
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

app.use(express.json());

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/seats', seatRoutes);

app.get('/health', (_, res) => res.json({ status: 'ok' }));

export default app;
