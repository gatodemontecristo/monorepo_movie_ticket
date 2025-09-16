import 'dotenv/config';
import * as env from 'env-var';

export const envs = {
  DATABASE_URL: env.get('DATABASE_URL').required().asString(),
  JWT_SECRET: env.get('JWT_SECRET').required().asString(),
  PORT: env.get('PORT').required().asPortNumber(),
};
