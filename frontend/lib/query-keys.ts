/**
 * Query Keys Factory
 * Centraliza todas las query keys para mejor organización y type safety
 */

import { MovieFilters, SearchFilters } from '../types/tmdb';

export const queryKeys = {
  // Movies
  movies: {
    all: ['movies'] as const,
    lists: () => [...queryKeys.movies.all, 'list'] as const,
    list: (filters: MovieFilters) =>
      [...queryKeys.movies.lists(), { filters }] as const,
    details: () => [...queryKeys.movies.all, 'detail'] as const,
    detail: (id: number) => [...queryKeys.movies.details(), id] as const,

    // Specific movie lists
    popular: (page: number = 1) =>
      [...queryKeys.movies.lists(), 'popular', { page }] as const,
    topRated: (page: number = 1) =>
      [...queryKeys.movies.lists(), 'topRated', { page }] as const,
    upcoming: (page: number = 1) =>
      [...queryKeys.movies.lists(), 'upcoming', { page }] as const,
    nowPlaying: (page: number = 1) =>
      [...queryKeys.movies.lists(), 'nowPlaying', { page }] as const,
    changes: (page: number = 1) =>
      [...queryKeys.movies.lists(), 'changes', { page }] as const,

    // Search and discover
    search: (query: string, page: number = 1) =>
      [...queryKeys.movies.lists(), 'search', { query, page }] as const,
    discover: (filters: MovieFilters) =>
      [...queryKeys.movies.lists(), 'discover', { filters }] as const,

    // Related movies
    similar: (id: number, page: number = 1) =>
      [...queryKeys.movies.detail(id), 'similar', { page }] as const,
    recommendations: (id: number, page: number = 1) =>
      [...queryKeys.movies.detail(id), 'recommendations', { page }] as const,
    reviews: (id: number, page: number = 1) =>
      [...queryKeys.movies.detail(id), 'reviews', { page }] as const,

    // Homepage composite
    homepage: () => [...queryKeys.movies.lists(), 'homepage'] as const,
  },

  // Genres
  genres: {
    all: ['genres'] as const,
    movies: () => [...queryKeys.genres.all, 'movies'] as const,
  },

  // User favorites (para futuro)
  user: {
    all: ['user'] as const,
    favorites: () => [...queryKeys.user.all, 'favorites'] as const,
    watchlist: () => [...queryKeys.user.all, 'watchlist'] as const,
  },
} as const;

/**
 * Helper type para extraer query keys
 */
export type QueryKeys = typeof queryKeys;
