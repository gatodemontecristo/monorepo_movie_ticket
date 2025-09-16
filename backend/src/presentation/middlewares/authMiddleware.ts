import { Request, Response, NextFunction } from 'express';
import { TokenService } from '../../infrastructure/tokenService';

const tokenService = new TokenService();

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({ error: 'Authorization header missing' });
    }

    const token = authHeader.split(' ')[1]; // "Bearer <token>"
    if (!token) {
      return res.status(401).json({ error: 'Token missing' });
    }

    const payload = tokenService.verify(token);
    (req as any).user = payload; // guardamos payload en req.user
    next();
  } catch (err: any) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}
