export interface UserProps {
  id: string;
  email: string;
  passwordHash: string;
  createdAt?: Date | string | null;
  updatedAt?: Date | string | null;
}
