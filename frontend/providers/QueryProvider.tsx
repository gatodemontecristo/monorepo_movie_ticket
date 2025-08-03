'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

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

interface QueryProviderProps {
  children: React.ReactNode;
}

export default function QueryProvider({ children }: QueryProviderProps) {
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
