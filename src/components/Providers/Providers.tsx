import React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ToastProvider } from '../ToastProvider';

const client = new QueryClient();

export function Providers({ children }: React.PropsWithChildren) {
  return (
    <QueryClientProvider client={client}>
      <ToastProvider>{children}</ToastProvider>
    </QueryClientProvider>
  );
}
