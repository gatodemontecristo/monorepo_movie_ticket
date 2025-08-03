import { HttpClient } from './http-client';
import { TMDB_CONFIG } from '../config/tmdb';

/**
 * Cliente HTTP específico para TMDB API
 * Incluye automáticamente los headers necesarios para TMDB
 */
class TMDBHttpClient extends HttpClient {
  constructor() {
    super(TMDB_CONFIG.BASE_URL);
  }

  /**
   * Override del método request para añadir headers específicos de TMDB
   */
  protected async request<T>(
    url: string,
    options: RequestInit = {},
  ): Promise<T> {
    const tmdbOptions: RequestInit = {
      ...options,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TMDB_CONFIG.API_KEY}`,
        ...options.headers,
      },
    };

    return super.request<T>(url, tmdbOptions);
  }
}

// Export singleton instance
export const tmdbHttpClient = new TMDBHttpClient();
