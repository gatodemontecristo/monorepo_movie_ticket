import { TMDBError } from '../types/tmdb';

/**
 * Custom error class for TMDB API errors
 */
export class TMDBApiError extends Error {
  constructor(
    public statusCode: number,
    public statusMessage: string,
    public success: boolean = false,
  ) {
    super(statusMessage);
    this.name = 'TMDBApiError';
  }
}

/**
 * HTTP Client for TMDB API
 * Handles requests, responses, and error handling
 */
export class HttpClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  /**
   * Generic request method
   */
  protected async request<T>(
    url: string,
    options: RequestInit = {},
  ): Promise<T> {
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();

      // Check if the response is an error
      if (!response.ok) {
        const error = data as TMDBError;
        throw new TMDBApiError(
          error.status_code || response.status,
          error.status_message || response.statusText,
          error.success || false,
        );
      }

      return data;
    } catch (error) {
      // Re-throw TMDB API errors
      if (error instanceof TMDBApiError) {
        throw error;
      }

      // Handle network and other errors
      if (error instanceof TypeError) {
        throw new TMDBApiError(
          0,
          'Network error: Unable to connect to TMDB API',
        );
      }

      // Generic error handling
      throw new TMDBApiError(500, 'An unexpected error occurred');
    }
  }

  /**
   * GET request
   */
  async get<T>(url: string, options?: RequestInit): Promise<T> {
    return this.request<T>(url, { ...options, method: 'GET' });
  }

  /**
   * POST request
   */
  async post<T>(
    url: string,
    body?: unknown,
    options?: RequestInit,
  ): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  /**
   * PUT request
   */
  async put<T>(url: string, body?: unknown, options?: RequestInit): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  /**
   * DELETE request
   */
  async delete<T>(url: string, options?: RequestInit): Promise<T> {
    return this.request<T>(url, { ...options, method: 'DELETE' });
  }
}

// Export singleton instance
export const httpClient = new HttpClient('');
