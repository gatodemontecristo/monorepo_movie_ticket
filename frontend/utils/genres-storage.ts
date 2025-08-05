/**
 * Utilidades para manejar la persistencia de géneros en localStorage
 */

const GENRES_STORAGE_KEY = 'tmdb-genres';

/**
 * Verifica si los géneros están guardados en localStorage
 */
export const hasStoredGenres = (): boolean => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(GENRES_STORAGE_KEY) !== null;
};

/**
 * Obtiene los géneros guardados en localStorage
 */
export const getStoredGenres = () => {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem(GENRES_STORAGE_KEY);
    if (!stored) return null;

    const { data, timestamp } = JSON.parse(stored);
    const isExpired = Date.now() - timestamp > 24 * 60 * 60 * 1000; // 24 horas

    if (isExpired) {
      localStorage.removeItem(GENRES_STORAGE_KEY);
      return null;
    }

    return data;
  } catch {
    localStorage.removeItem(GENRES_STORAGE_KEY);
    return null;
  }
};

/**
 * Limpia los géneros guardados en localStorage
 */
export const clearStoredGenres = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(GENRES_STORAGE_KEY);
};

/**
 * Obtiene información sobre el estado de la persistencia de géneros
 */
export const getGenresStorageInfo = () => {
  if (typeof window === 'undefined') {
    return { hasStored: false, isExpired: false, timestamp: null };
  }

  try {
    const stored = localStorage.getItem(GENRES_STORAGE_KEY);
    if (!stored) {
      return { hasStored: false, isExpired: false, timestamp: null };
    }

    const { timestamp } = JSON.parse(stored);
    const isExpired = Date.now() - timestamp > 24 * 60 * 60 * 1000;

    return {
      hasStored: true,
      isExpired,
      timestamp: new Date(timestamp),
      expiresAt: new Date(timestamp + 24 * 60 * 60 * 1000),
    };
  } catch {
    return { hasStored: false, isExpired: true, timestamp: null };
  }
};
