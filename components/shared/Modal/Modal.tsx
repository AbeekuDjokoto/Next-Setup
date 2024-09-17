'use client';
import { Fragment } from 'react';

import { Dialog, Transition } from '@headlessui/react';
import { cn } from '@/lib/utils';

type ModalProps = {
  children: React.ReactNode;
  hideModal: () => void;
  show: boolean;
  className?: string;
  right?: boolean;
};

export function Modal({ children, show, className = '', right, hideModal }: ModalProps) {
  let modalPosition = 'fixed inset-0 overflow-y-auto noscroll-indicator';

  if (right) {
    modalPosition = 'fixed bottom-0 right-0 overflow-y-auto noscroll-indicator';
  }

  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={hideModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-[#021210B8]" />
        </Transition.Child>

        <div className={modalPosition}>
          <div className="flex min-h-full items-center justify-center text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95">
              <Dialog.Panel
                className={cn(
                  'bg-transparent flex justify-center w-max transform overflow-hidden rounded-lg text-left align-middle shadow-xl transition-all',
                  className,
                )}>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
