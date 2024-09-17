'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import React from 'react';
import { MessengerProvider } from '@/context';

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <MessengerProvider>
        <DndProvider backend={HTML5Backend}>{children}</DndProvider>
      </MessengerProvider>
    </QueryClientProvider>
  );
}
