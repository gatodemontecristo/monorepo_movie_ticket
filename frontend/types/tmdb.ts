// Base types for TMDB API responses
export interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

// Movie related types
export interface Movie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  adult: boolean;
  genre_ids: number[];
  original_language: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
  video: boolean;
}

export interface MovieDetails extends Movie {
  budget: number;
  genres: Genre[];
  homepage: string;
  imdb_id: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

// Changes API specific types
export interface MovieChange {
  id: number;
  adult?: boolean;
}

export interface MovieChangesResponse {
  results: MovieChange[];
  page: number;
  total_pages: number;
  total_results: number;
}

// API Error types
export interface TMDBError {
  success: boolean;
  status_code: number;
  status_message: string;
}

// Search and filter types
export interface MovieFilters
  extends Record<string, string | number | boolean | undefined> {
  page?: number;
  language?: string;
  region?: string;
  sort_by?: string;
  include_adult?: boolean;
  include_video?: boolean;
  primary_release_year?: number;
  year?: number;
  with_genres?: string;
}

export interface SearchFilters
  extends Record<string, string | number | boolean | undefined> {
  query: string;
  page?: number;
  language?: string;
  region?: string;
  include_adult?: boolean;
  year?: number;
  primary_release_year?: number;
}
