import jwt from 'jsonwebtoken';
import { envs } from '../config/envs';

export class TokenService {
  private secret = envs.JWT_SECRET || 'supersecret';

  generate(payload: object): string {
    return jwt.sign(payload, this.secret, { expiresIn: '1h' });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  verify(token: string): any {
    return jwt.verify(token, this.secret);
  }
}
