import bcrypt from 'bcryptjs';

export class HashService {
  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}

export const fnHash = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};
export const fnCompare = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};
