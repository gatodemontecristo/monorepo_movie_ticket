'use client';

import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Funciones para manejar localStorage de géneros
const GENRES_STORAGE_KEY = 'tmdb-genres';
const GENRES_EXPIRY_TIME = 24 * 60 * 60 * 1000; // 24 horas

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
      // Stale time: datos se consideran frescos por 5 minutos
      staleTime: 1000 * 60 * 5,
      // Cache time: datos se mantienen en cache por 10 minutos
      gcTime: 1000 * 60 * 10,
      // Retry automático en caso de error
      retry: 3,
      // Refetch cuando la ventana se enfoca
      refetchOnWindowFocus: false,
      // Refetch cuando se reconecta a internet
      refetchOnReconnect: true,
    },
    mutations: {
      // Retry para mutations (POST, PUT, DELETE)
      retry: 1,
    },
  },
});

// Configurar listener para persistir géneros automáticamente
queryClient.getQueryCache().subscribe(event => {
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
