import React from 'react';

import { ToastNotificationType } from '@/types';

type ToastContextValue = {
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
};
export const ToastContext = React.createContext<ToastContextValue>({} as ToastContextValue);

export function ToastContextProvider({
  children,
  addMessage,
}: React.PropsWithChildren<{
  addMessage: (message: string, type: ToastNotificationType) => void;
}>) {
  const success = React.useCallback(
    (message: string) => addMessage(message, 'success'),
    [addMessage],
  );

  const error = React.useCallback((message: string) => addMessage(message, 'error'), [addMessage]);

  const info = React.useCallback((message: string) => addMessage(message, 'info'), [addMessage]);

  const value = React.useMemo(() => {
    return { success, error, info };
  }, [success, error, info]);

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}
