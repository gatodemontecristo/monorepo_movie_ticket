// Tipos para los datos de usuario
export interface User {
  id: string;
  email: string;
  passwordHash: string;
  createdAt: string;
  updatedAt: string;
}

// DTOs para las peticiones
export interface RegisterUserDto {
  email: string;
  password: string;
}

export interface LoginUserDto {
  email: string;
  password: string;
}

export interface UpdateUserDto {
  email?: string;
  password?: string;
}

// Respuestas de la API
export interface LoginResponse {
  user: User;
  token: string;
}

export interface ApiError {
  error: string;
}
