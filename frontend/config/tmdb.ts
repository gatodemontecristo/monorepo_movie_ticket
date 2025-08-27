/**
 * TMDB API Configuration
 * Centralizes all API endpoints and configuration
 */

import { NOT_FOUND_POSTER, NOT_FOUND_USER } from '@/constants';

// Environment variables validation
const requiredEnvVars = {
  API_KEY: process.env.NEXT_PUBLIC_TMDB_API_KEY,
  BASE_URL: process.env.NEXT_PUBLIC_TMDB_BASE_URL,
  IMAGE_BASE_URL: process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL,
} as const;

// Validate environment variables
Object.entries(requiredEnvVars).forEach(([key, value]) => {
  if (!value) {
    throw new Error(
      `Missing required environment variable: NEXT_PUBLIC_TMDB_${key}`,
    );
  }
});

export const TMDB_CONFIG = {
  API_KEY: requiredEnvVars.API_KEY!,
  BASE_URL: requiredEnvVars.BASE_URL!,
  IMAGE_BASE_URL: requiredEnvVars.IMAGE_BASE_URL!,
  DEFAULT_LANGUAGE: 'en-US',
  DEFAULT_REGION: 'US',
} as const;

/**
 * TMDB API Endpoints
 */
export const TMDB_ENDPOINTS = {
  // Movies
  MOVIE_POPULAR: '/movie/popular',
  MOVIE_TOP_RATED: '/movie/top_rated',
  MOVIE_UPCOMING: '/movie/upcoming',
  MOVIE_NOW_PLAYING: '/movie/now_playing',
  MOVIE_DETAILS: (id: number) => `/movie/${id}`,
  MOVIE_CREDITS: (id: number) => `/movie/${id}/credits`,
  MOVIE_VIDEOS: (id: number) => `/movie/${id}/videos`,
  MOVIE_SIMILAR: (id: number) => `/movie/${id}/similar`,
  MOVIE_RECOMMENDATIONS: (id: number) => `/movie/${id}/recommendations`,
  MOVIE_CHANGES: '/movie/changes',
  MOVIE_REVIEWS: (id: number) => `/movie/${id}/reviews`,

  // Search
  SEARCH_MOVIES: '/search/movie',
  SEARCH_MULTI: '/search/multi',

  // Genres
  MOVIE_GENRES: '/genre/movie/list',

  // Discover
  DISCOVER_MOVIES: '/discover/movie',
} as const;

/**
 * Image size options for TMDB images
 */
export const IMAGE_SIZES = {
  POSTER: {
    SMALL: 'w154',
    MEDIUM: 'w342',
    LARGE: 'w500',
    XLARGE: 'w780',
    ORIGINAL: 'original',
  },
  BACKDROP: {
    SMALL: 'w300',
    MEDIUM: 'w780',
    LARGE: 'w1280',
    ORIGINAL: 'original',
  },
  PROFILE: {
    SMALL: 'w45',
    MEDIUM: 'w185',
    LARGE: 'h632',
    ORIGINAL: 'original',
  },
} as const;

/**
 * Helper function to build complete image URLs
 */
export const buildImageUrl = (
  path?: string | null,
  size: string = IMAGE_SIZES.POSTER.MEDIUM,
): string => {
  if (!path) return NOT_FOUND_POSTER;
  return `${TMDB_CONFIG.IMAGE_BASE_URL}/${size}${path}`;
};

export const buildImageUser = (
  path?: string | null,
  size: string = IMAGE_SIZES.PROFILE.MEDIUM,
): string => {
  if (!path) return NOT_FOUND_USER;
  return `${TMDB_CONFIG.IMAGE_BASE_URL}/${size}${path}`;
};

/**
 * Helper function to build API URLs with query parameters
 */
export const buildApiUrl = (
  endpoint: string,
  params?: Record<string, string | number | boolean | undefined>,
): string => {
  const url = new URL(endpoint, TMDB_CONFIG.BASE_URL);

  // Always add API key
  url.searchParams.set('api_key', TMDB_CONFIG.API_KEY);

  // Add additional parameters
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, String(value));
      }
    });
  }

  return url.toString();
};
