import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationResult,
  type UseQueryResult,
} from '@tanstack/react-query';
import { UserService } from '../services/user.service';
import type {
  User,
  LoginUserDto,
  RegisterUserDto,
  UpdateUserDto,
  LoginResponse,
} from '../types/user';

// Query Keys para cache management
export const userQueryKeys = {
  all: ['users'] as const,
  lists: () => [...userQueryKeys.all, 'list'] as const,
  list: (filters: string) => [...userQueryKeys.lists(), { filters }] as const,
  details: () => [...userQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...userQueryKeys.details(), id] as const,
};

// Hook para obtener todos los usuarios
export function useUsers(): UseQueryResult<User[], Error> {
  return useQuery({
    queryKey: userQueryKeys.lists(),
    queryFn: UserService.getUsers,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
}

// Hook para obtener un usuario por ID
export function useUser(id: string): UseQueryResult<User, Error> {
  return useQuery({
    queryKey: userQueryKeys.detail(id),
    queryFn: () => UserService.getUserById(id),
    enabled: !!id, // Solo ejecutar si hay ID
  });
}

// Hook para registro de usuario
export function useRegister(): UseMutationResult<User, Error, RegisterUserDto> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: UserService.register,
    onSuccess: () => {
      // Invalidar cache de usuarios para refrescar la lista
      queryClient.invalidateQueries({ queryKey: userQueryKeys.all });
    },
  });
}

// Hook para login
export function useLogin(): UseMutationResult<
  LoginResponse,
  Error,
  LoginUserDto
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: UserService.login,
    onSuccess: data => {
      // Almacenar datos del usuario en cache
      queryClient.setQueryData(['currentUser'], data.user);
      // Invalidar todas las queries para refrescar con el nuevo token
      queryClient.invalidateQueries();
    },
  });
}

// Hook para logout
export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      UserService.logout();
    },
    onSuccess: () => {
      // Limpiar todo el cache al hacer logout
      queryClient.clear();
    },
  });
}

// Hook para actualizar usuario
export function useUpdateUser(): UseMutationResult<
  User,
  Error,
  { id: string; data: UpdateUserDto }
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => UserService.updateUser(id, data),
    onSuccess: updatedUser => {
      // Actualizar el cache del usuario específico
      queryClient.setQueryData(
        userQueryKeys.detail(updatedUser.id),
        updatedUser,
      );
      // Invalidar la lista de usuarios
      queryClient.invalidateQueries({ queryKey: userQueryKeys.lists() });
    },
  });
}

// Hook para eliminar usuario
export function useDeleteUser(): UseMutationResult<void, Error, string> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: UserService.deleteUser,
    onSuccess: (_, deletedUserId) => {
      // Remover usuario del cache
      queryClient.removeQueries({
        queryKey: userQueryKeys.detail(deletedUserId),
      });
      // Invalidar la lista de usuarios
      queryClient.invalidateQueries({ queryKey: userQueryKeys.lists() });
    },
  });
}

// Hook para verificar si el usuario está autenticado
export function useAuth() {
  return {
    isAuthenticated: UserService.isAuthenticated(),
    token: UserService.getStoredToken(),
  };
}
