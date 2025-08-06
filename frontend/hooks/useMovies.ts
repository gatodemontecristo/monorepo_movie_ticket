import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { movieService, MovieService } from '@/services';
import { queryKeys } from '@/lib/query-keys';
import { MovieFilters } from '@/types/tmdb';

/**
 * Hook para obtener películas populares
 */

export const useGetMoviesHomepage = () => {
  return useQuery({
    queryKey: queryKeys.movies.homepage(),
    queryFn: movieService.getMoviesForHomepage,
    // Cache los datos por 10 minutos
    staleTime: 1000 * 60 * 10,
    // Refetch en background cada 30 minutos
    refetchInterval: 1000 * 60 * 30,
  });
};

export const usePopularMovies = (page: number = 1) => {
  return useQuery({
    queryKey: queryKeys.movies.popular(page),
    queryFn: () => MovieService.getPopular({ page }),
    staleTime: 1000 * 60 * 5,
  });
};

/**
 * Hook para obtener películas mejor valoradas
 */
export const useTopRatedMovies = (page: number = 1) => {
  return useQuery({
    queryKey: queryKeys.movies.topRated(page),
    queryFn: () => MovieService.getTopRated({ page }),
    staleTime: 1000 * 60 * 5,
  });
};

/**
 * Hook para obtener próximos estrenos
 */
export const useUpcomingMovies = (page: number = 1) => {
  return useQuery({
    queryKey: queryKeys.movies.upcoming(page),
    queryFn: () => MovieService.getUpcoming({ page }),
    staleTime: 1000 * 60 * 5,
  });
};

/**
 * Hook para obtener películas en cartelera
 */
export const useNowPlayingMovies = (page: number = 1) => {
  return useQuery({
    queryKey: queryKeys.movies.nowPlaying(page),
    queryFn: () => MovieService.getNowPlaying({ page }),
    staleTime: 1000 * 60 * 5,
  });
};

/**
 * Hook para obtener cambios de películas (tu endpoint específico)
 */
export const useMovieChanges = (page: number = 1) => {
  return useQuery({
    queryKey: queryKeys.movies.changes(page),
    queryFn: () => MovieService.getChanges(page),
    staleTime: 1000 * 60 * 2, // Los cambios son más frecuentes
    refetchInterval: 1000 * 60 * 5, // Refetch cada 5 minutos
  });
};

/**
 * Hook para obtener detalles de una película
 */
export const useMovieDetails = (movieId: number, language?: string) => {
  return useQuery({
    queryKey: queryKeys.movies.detail(movieId),
    queryFn: () => MovieService.getDetails(movieId, language),
    enabled: !!movieId, // Solo ejecutar si tenemos un ID
    staleTime: 1000 * 60 * 15, // Los detalles cambian menos frecuentemente
  });
};

/**
 * Hook para obtener películas similares
 */
export const useSimilarMovies = (movieId: number, page: number = 1) => {
  return useQuery({
    queryKey: queryKeys.movies.similar(movieId, page),
    queryFn: () => MovieService.getSimilar(movieId, { page }),
    enabled: !!movieId,
    staleTime: 1000 * 60 * 10,
  });
};

/**
 * Hook para obtener recomendaciones
 */
export const useMovieRecommendations = (movieId: number, page: number = 1) => {
  return useQuery({
    queryKey: queryKeys.movies.recommendations(movieId, page),
    queryFn: () => MovieService.getRecommendations(movieId, { page }),
    enabled: !!movieId,
    staleTime: 1000 * 60 * 10,
  });
};

/**
 * Hook para buscar películas
 */
export const useSearchMovies = (query: string, page: number = 1) => {
  return useQuery({
    queryKey: queryKeys.movies.search(query, page),
    queryFn: () => MovieService.searchMovies({ query, page }),
    enabled: query.length > 2, // Solo buscar si hay al menos 3 caracteres
    staleTime: 1000 * 60 * 5,
  });
};

/**
 * Hook para descubrir películas con filtros
 */
export const useDiscoverMovies = (filters: MovieFilters) => {
  return useQuery({
    queryKey: queryKeys.movies.discover(filters),
    queryFn: () => MovieService.discoverMovies(filters),
    staleTime: 1000 * 60 * 5,
  });
};

/**
 * Hook para obtener géneros
 * Los géneros se persisten automáticamente en localStorage por 24 horas
 */
export const useMovieGenres = (language?: string) => {
  return useQuery({
    queryKey: queryKeys.genres.movies(),
    queryFn: () => MovieService.getGenres(language),
    staleTime: 1000 * 60 * 60 * 24, // Los géneros casi nunca cambian, cache por 24 horas
    gcTime: 1000 * 60 * 60 * 24, // Mantener en memoria por 24 horas también
  });
};

/**
 * Hook para scroll infinito - películas populares
 */
export const useInfinitePopularMovies = () => {
  return useInfiniteQuery({
    queryKey: [...queryKeys.movies.popular(), 'infinite'],
    queryFn: ({ pageParam = 1 }) =>
      MovieService.getPopular({ page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      // Si estamos en la última página, retornar undefined
      if (lastPage.page >= lastPage.total_pages) return undefined;
      return lastPage.page + 1;
    },
    staleTime: 1000 * 60 * 5,
  });
};

/**
 * Hook para obtener película con toda su información relacionada
 */
export const useMovieWithDetails = (movieId: number) => {
  const movieDetails = useMovieDetails(movieId);
  const similarMovies = useSimilarMovies(movieId);
  const recommendations = useMovieRecommendations(movieId);

  return {
    movie: movieDetails.data,
    similar: similarMovies.data?.results || [],
    recommendations: recommendations.data?.results || [],
    isLoading:
      movieDetails.isLoading ||
      similarMovies.isLoading ||
      recommendations.isLoading,
    isError:
      movieDetails.isError || similarMovies.isError || recommendations.isError,
    error: movieDetails.error || similarMovies.error || recommendations.error,
  };
};
