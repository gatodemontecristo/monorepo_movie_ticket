import { apiClient } from '../lib/api-client';
import type {
  User,
  LoginUserDto,
  RegisterUserDto,
  UpdateUserDto,
  LoginResponse,
} from '../types/user';

export class UserService {
  // Autenticación
  static async register(userData: RegisterUserDto): Promise<User> {
    return apiClient.post<User>('/usuarios/register', userData);
  }

  static async login(credentials: LoginUserDto): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>(
      '/usuarios/login',
      credentials,
    );

    // Guardar el token en localStorage
    if (response.token) {
      localStorage.setItem('authToken', response.token);
    }

    return response;
  }

  static logout(): void {
    localStorage.removeItem('authToken');
  }

  // CRUD de usuarios (requieren autenticación)
  static async getUsers(): Promise<User[]> {
    return apiClient.get<User[]>('/usuarios');
  }

  static async getUserById(id: string): Promise<User> {
    return apiClient.get<User>(`/usuarios/${id}`);
  }

  static async updateUser(id: string, userData: UpdateUserDto): Promise<User> {
    return apiClient.put<User>(`/usuarios/${id}`, userData);
  }

  static async deleteUser(id: string): Promise<void> {
    return apiClient.delete<void>(`/usuarios/${id}`);
  }

  // Utilidades
  static getStoredToken(): string | null {
    return localStorage.getItem('authToken');
  }

  static isAuthenticated(): boolean {
    return !!this.getStoredToken();
  }
}
