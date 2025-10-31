import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { movieService, MovieService } from '@/services';
import { queryKeys } from '@/lib/query-keys';
import { MovieFilters } from '@/types/tmdb';
import {
  GENRES_EXPIRY_TIME,
  REFETCH_INTERVAL_TANSTACK,
  STALE_TIME_TANSTACK,
} from '@/constants';

/**
 * Hook para obtener películas populares
 */

export const useGetMoviesHomepage = () => {
  return useQuery({
    queryKey: queryKeys.movies.homepage(),
    queryFn: movieService.getMoviesForHomepage,
    staleTime: STALE_TIME_TANSTACK,
    refetchInterval: REFETCH_INTERVAL_TANSTACK,
  });
};

export const usePopularMovies = (page: number = 1) => {
  return useQuery({
    queryKey: queryKeys.movies.popular(page),
    queryFn: () => MovieService.getPopular({ page }),
    staleTime: STALE_TIME_TANSTACK,
  });
};

/**
 * Hook para obtener películas mejor valoradas
 */
export const useTopRatedMovies = (page: number = 1) => {
  return useQuery({
    queryKey: queryKeys.movies.topRated(page),
    queryFn: () => MovieService.getTopRated({ page }),
    staleTime: STALE_TIME_TANSTACK,
  });
};

/**
 * Hook para obtener próximos estrenos
 */
export const useUpcomingMovies = (page: number = 1) => {
  return useQuery({
    queryKey: queryKeys.movies.upcoming(page),
    queryFn: () => MovieService.getUpcoming({ page }),
    staleTime: STALE_TIME_TANSTACK,
  });
};

/**
 * Hook para obtener películas en cartelera
 */
export const useNowPlayingMovies = (page: number = 1) => {
  return useQuery({
    queryKey: queryKeys.movies.nowPlaying(page),
    queryFn: () => MovieService.getNowPlaying({ page }),
    staleTime: STALE_TIME_TANSTACK,
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
    staleTime: STALE_TIME_TANSTACK,
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
    staleTime: STALE_TIME_TANSTACK,
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
    staleTime: STALE_TIME_TANSTACK,
  });
};

/**
 * Hook para obtener reviews
 */
export const useMovieReviews = (movieId: number, page: number = 1) => {
  return useQuery({
    queryKey: queryKeys.movies.reviews(movieId, page),
    queryFn: () => MovieService.getReviews(movieId, { page }),
    enabled: !!movieId,
    staleTime: STALE_TIME_TANSTACK,
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
    staleTime: STALE_TIME_TANSTACK,
  });
};

/**
 * Hook para descubrir películas con filtros
 */
export const useDiscoverMovies = (filters: MovieFilters) => {
  return useQuery({
    queryKey: queryKeys.movies.discover(filters),
    queryFn: () => MovieService.discoverMovies(filters),
    staleTime: STALE_TIME_TANSTACK,
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
    staleTime: GENRES_EXPIRY_TIME,
    gcTime: GENRES_EXPIRY_TIME,
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
    staleTime: STALE_TIME_TANSTACK,
  });
};

export const useMovieCredits = (movieId: number) => {
  return useQuery({
    queryKey: ['movie', movieId, 'credits'],
    queryFn: () => MovieService.getCredits(movieId),
    enabled: !!movieId,
    staleTime: STALE_TIME_TANSTACK,
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

export const useMovieMoreDetails = (movieId: number) => {
  const movieCredits = useMovieCredits(movieId);
  const movieDetails = useMovieDetails(movieId);

  return {
    movie: movieDetails.data,
    credits: movieCredits.data,
    isLoading: movieDetails.isLoading || movieCredits.isLoading,
    isError: movieDetails.isError || movieCredits.isError,
    error: movieDetails.error || movieCredits.error,
  };
};
export const useMovieReviewDetails = (movieId: number) => {
  const movieReviews = useMovieReviews(movieId);
  const movieDetails = useMovieDetails(movieId);

  return {
    movie: movieDetails.data,
    reviews: movieReviews.data,
    isLoading: movieDetails.isLoading || movieReviews.isLoading,
    isError: movieDetails.isError || movieReviews.isError,
    error: movieDetails.error || movieReviews.error,
  };
};
