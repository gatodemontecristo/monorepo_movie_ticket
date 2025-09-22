import dotenv from 'dotenv';
import path from 'path';
dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
});

import { envs } from './config/envs';
import app from './presentation/server';

const PORT = envs.PORT || 4000;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`🚀 Server running on port ${PORT}`);
});
