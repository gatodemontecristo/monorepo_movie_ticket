'use client';

import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  GENRES_EXPIRY_TIME,
  GENRES_STORAGE_KEY,
  REFETCH_INTERVAL_TANSTACK,
  STALE_TIME_TANSTACK,
} from '@/constants';

const saveGenresToStorage = (data: unknown) => {
  try {
    const storageData = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(GENRES_STORAGE_KEY, JSON.stringify(storageData));
  } catch {
    // Silently fail if localStorage is not available
  }
};

const loadGenresFromStorage = () => {
  try {
    const stored = localStorage.getItem(GENRES_STORAGE_KEY);
    if (!stored) return null;

    const { data, timestamp } = JSON.parse(stored);
    const isExpired = Date.now() - timestamp > GENRES_EXPIRY_TIME;

    if (isExpired) {
      localStorage.removeItem(GENRES_STORAGE_KEY);
      return null;
    }

    return data;
  } catch {
    // Silently fail and remove corrupted data
    localStorage.removeItem(GENRES_STORAGE_KEY);
    return null;
  }
};

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: STALE_TIME_TANSTACK, // Los datos son "fresh" por 30 minutos
      gcTime: REFETCH_INTERVAL_TANSTACK, // Los datos se mantienen en cache por 45 minutos
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        // No reintentar en errores 4xx (client errors)
        if (error instanceof Error && error.message.includes('4')) {
          return false;
        }
        return failureCount < 3;
      },
    },
    mutations: {
      retry: false, // No reintentar mutaciones por defecto
    },
  },
});

// Configurar listener para persistir géneros automáticamente
// eslint-disable-next-line @typescript-eslint/no-explicit-any
queryClient.getQueryCache().subscribe((event: any) => {
  if (event.type === 'updated') {
    const { queryKey, state } = event.query;

    // Verificar si es el query de géneros: ['genres', 'movies']
    if (queryKey[0] === 'genres' && queryKey[1] === 'movies' && state.data) {
      saveGenresToStorage(state.data);
    }
  }
});

interface QueryProviderProps {
  children: React.ReactNode;
}

export default function QueryProvider({ children }: QueryProviderProps) {
  useEffect(() => {
    // Restaurar géneros desde localStorage al inicializar
    const storedGenres = loadGenresFromStorage();
    if (storedGenres) {
      queryClient.setQueryData(['genres', 'movies'], storedGenres);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Solo mostrar DevTools en desarrollo */}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition='bottom-right'
        />
      )}
    </QueryClientProvider>
  );
}
