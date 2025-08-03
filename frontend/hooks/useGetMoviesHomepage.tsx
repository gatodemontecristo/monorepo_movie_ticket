import { useQuery } from '@tanstack/react-query';
import { movieService } from '@/services';
import { queryKeys } from '@/lib/query-keys';

/**
 * Hook para obtener las películas de la homepage
 * Utiliza TanStack Query para mejor manejo de cache, loading, y errores
 */
export const useGetMoviesHomepage = () => {
  const { data, error, isLoading, isError, refetch } = useQuery({
    queryKey: queryKeys.movies.homepage(),
    queryFn: movieService.getMoviesForHomepage,
    // Cache los datos por 10 minutos
    staleTime: 1000 * 60 * 10,
    // Refetch en background cada 30 minutos
    refetchInterval: 1000 * 60 * 30,
  });

  return {
    movies: data,
    error,
    isLoading,
    isError,
    refetch,
  };
};
