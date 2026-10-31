'use client';

import * as Toast from '@radix-ui/react-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, type ReactNode } from 'react';
import { Toaster } from '@/components/ui/Toaster';

export function AppProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { staleTime: 30_000, refetchOnWindowFocus: false } },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Toast.Provider swipeDirection="right" label="알림">
        {children}
        <Toaster />
      </Toast.Provider>
    </QueryClientProvider>
  );
}
