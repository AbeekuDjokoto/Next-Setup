import React from 'react';
import { createPortal } from 'react-dom';

import { CheckCircle, Info, X, XCircle } from '@phosphor-icons/react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { nanoid } from 'nanoid';

import { ToastContextProvider } from '@/context/toast-context';
import { cn } from '@/libs/cn';
import { ToastNotificationType } from '@/types';

export function ToastProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [notificationList, setNotificationList] = React.useState<
    {
      message: string;
      type: ToastNotificationType;
      id: string;
      ended?: boolean;
      nodeRef?: React.RefObject<HTMLDivElement>;
    }[]
  >([
    // { message: 'This is a success toast', type: 'success', id: nanoid() },
    // { message: 'This is an error toast', type: 'error', id: nanoid() },
    // { message: 'This is an info toast', type: 'info', id: nanoid() },
  ]);

  function removeNotification(id: string) {
    setNotificationList((list) => list.filter((item) => item.id !== id));
  }

  const addMessage = React.useCallback(
    (message: string, type: ToastNotificationType) => {
      const id = nanoid();
      setNotificationList((list) => [...list, { message, type, id, nodeRef: React.createRef() }]);

      setTimeout(() => removeNotification(id), 4000);
    },
    [setNotificationList],
  );

  const variantStyles: Record<ToastNotificationType, string> = {
    success: 'bg-success-500 text-white',
    error: 'bg-error-500 text-white',
    info: 'bg-blue-500 text-white',
  };

  const variantIcons: Record<ToastNotificationType, React.ElementType> = {
    success: CheckCircle,
    error: XCircle,
    info: Info,
  };
  return (
    <>
      <ToastContextProvider addMessage={addMessage}>{children}</ToastContextProvider>
      {createPortal(
        <ul className="fixed right-5 top-5 z-[1000] grid w-[340px] gap-3">
          <LayoutGroup>
            <AnimatePresence>
              {notificationList
                .filter((item) => !item.ended)
                .map(({ id, message, type }, index) => {
                  const Icon = variantIcons[type];
                  return (
                    <motion.li
                      layout
                      initial={{ x: '150%' }}
                      animate={{ x: 0 }}
                      exit={{
                        opacity: 0,
                        transition: { duration: 0.2 },
                      }}
                      transition={{
                        delay: index * 0.05,
                        stiffness: 150,
                        damping: 14,
                        type: 'spring',
                      }}
                      className={cn(
                        'grid grid-cols-[max-content_1fr_max-content] items-center gap-2',
                        'rounded-[10px] p-4 py-[13px] shadow',
                        variantStyles[type],
                      )}
                      key={id}>
                      <Icon size={24} />
                      <span>{message}</span>
                      <button
                        onClick={() => removeNotification(id)}
                        data-testid="close-toast"
                        type="button">
                        <X size={20} />
                      </button>
                    </motion.li>
                  );
                })}
            </AnimatePresence>
          </LayoutGroup>
        </ul>,
        document.body,
      )}
    </>
  );
}
