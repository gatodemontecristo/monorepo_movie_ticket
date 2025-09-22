import express from 'express';

import usuarioRoutes from './users/usuarioRoutes';

const app = express();
app.use(express.json());

app.use('/api/usuarios', usuarioRoutes);

app.get('/health', (_, res) => res.json({ status: 'ok' }));

export default app;
