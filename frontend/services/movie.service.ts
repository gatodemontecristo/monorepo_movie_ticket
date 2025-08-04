import { tmdbHttpClient } from '../lib/tmdb-client';
import { TMDB_ENDPOINTS } from '../config/tmdb';
import {
  Movie,
  MovieDetails,
  TMDBResponse,
  MovieChangesResponse,
  MovieFilters,
  SearchFilters,
  Genre,
} from '../types/tmdb';

/**
 * Helper para construir URLs sin API key (se envía en header)
 */
const buildTMDBUrl = (
  endpoint: string,
  params?: Record<string, string | number | boolean | undefined>,
): string => {
  const url = new URL(
    endpoint.replace(/^\/+/, ''),
    process.env.NEXT_PUBLIC_TMDB_BASE_URL,
  );

  // Add parameters (sin API key)
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, String(value));
      }
    });
  }

  return url.toString();
};

/**
 * Movie Service - Handles all movie-related API calls
 */
export class MovieService {
  /**
   * Get popular movies
   */
  static async getPopular(
    filters?: MovieFilters,
  ): Promise<TMDBResponse<Movie>> {
    const url = buildTMDBUrl(TMDB_ENDPOINTS.MOVIE_POPULAR, filters);
    return tmdbHttpClient.get<TMDBResponse<Movie>>(url);
  }

  /**
   * Get top rated movies
   */
  static async getTopRated(
    filters?: MovieFilters,
  ): Promise<TMDBResponse<Movie>> {
    const url = buildTMDBUrl(TMDB_ENDPOINTS.MOVIE_TOP_RATED, filters);
    return tmdbHttpClient.get<TMDBResponse<Movie>>(url);
  }

  /**
   * Get upcoming movies
   */
  static async getUpcoming(
    filters?: MovieFilters,
  ): Promise<TMDBResponse<Movie>> {
    const url = buildTMDBUrl(TMDB_ENDPOINTS.MOVIE_UPCOMING, filters);
    return tmdbHttpClient.get<TMDBResponse<Movie>>(url);
  }

  /**
   * Get now playing movies
   */
  static async getNowPlaying(
    filters?: MovieFilters,
  ): Promise<TMDBResponse<Movie>> {
    const url = buildTMDBUrl(TMDB_ENDPOINTS.MOVIE_NOW_PLAYING, filters);
    return tmdbHttpClient.get<TMDBResponse<Movie>>(url);
  }

  /**
   * Get movie changes - The endpoint you specifically asked about
   */
  static async getChanges(page: number = 1): Promise<MovieChangesResponse> {
    const url = buildTMDBUrl(TMDB_ENDPOINTS.MOVIE_CHANGES, { page });
    return tmdbHttpClient.get<MovieChangesResponse>(url);
  }

  /**
   * Get movie details by ID
   */
  static async getDetails(
    movieId: number,
    language?: string,
  ): Promise<MovieDetails> {
    const params: Record<string, string | undefined> = {};
    if (language) {
      params.language = language;
    }
    const url = buildTMDBUrl(TMDB_ENDPOINTS.MOVIE_DETAILS(movieId), params);
    return tmdbHttpClient.get<MovieDetails>(url);
  }

  /**
   * Get similar movies
   */
  static async getSimilar(
    movieId: number,
    filters?: MovieFilters,
  ): Promise<TMDBResponse<Movie>> {
    const url = buildTMDBUrl(TMDB_ENDPOINTS.MOVIE_SIMILAR(movieId), filters);
    return tmdbHttpClient.get<TMDBResponse<Movie>>(url);
  }

  /**
   * Get movie recommendations
   */
  static async getRecommendations(
    movieId: number,
    filters?: MovieFilters,
  ): Promise<TMDBResponse<Movie>> {
    const url = buildTMDBUrl(
      TMDB_ENDPOINTS.MOVIE_RECOMMENDATIONS(movieId),
      filters,
    );
    return tmdbHttpClient.get<TMDBResponse<Movie>>(url);
  }

  /**
   * Search movies
   */
  static async searchMovies(
    filters: SearchFilters,
  ): Promise<TMDBResponse<Movie>> {
    const url = buildTMDBUrl(TMDB_ENDPOINTS.SEARCH_MOVIES, filters);
    return tmdbHttpClient.get<TMDBResponse<Movie>>(url);
  }

  /**
   * Discover movies with advanced filters
   */
  static async discoverMovies(
    filters?: MovieFilters,
  ): Promise<TMDBResponse<Movie>> {
    const url = buildTMDBUrl(TMDB_ENDPOINTS.DISCOVER_MOVIES, filters);
    return tmdbHttpClient.get<TMDBResponse<Movie>>(url);
  }

  /**
   * Get movie genres
   */
  static async getGenres(language?: string): Promise<{ genres: Genre[] }> {
    const params: Record<string, string | undefined> = {};
    if (language) {
      params.language = language;
    }
    const url = buildTMDBUrl(TMDB_ENDPOINTS.MOVIE_GENRES, params);
    return tmdbHttpClient.get<{ genres: Genre[] }>(url);
  }
}

/**
 * Hook-style functions for easier integration with React components
 */
export const movieService = {
  // Direct access to all methods
  ...MovieService,

  // Convenience methods with common use cases
  async getMoviesForHomepage() {
    const [popular, topRated, upcoming] = await Promise.all([
      MovieService.getPopular({ page: 1 }),
      MovieService.getTopRated({ page: 1 }),
      MovieService.getUpcoming({ page: 1 }),
    ]);

    return {
      popular: popular.results,
      topRated: topRated.results,
      upcoming: upcoming.results,
    };
  },

  async getMovieWithDetails(movieId: number) {
    const [details, similar, recommendations] = await Promise.all([
      MovieService.getDetails(movieId),
      MovieService.getSimilar(movieId, { page: 1 }),
      MovieService.getRecommendations(movieId, { page: 1 }),
    ]);

    return {
      movie: details,
      similar: similar.results,
      recommendations: recommendations.results,
    };
  },
} as const;
