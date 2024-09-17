'use client';
import { Button, Modal, Popover, PopoverContent, PopoverTrigger } from '@/components/shared';

import { WhatsAppIcon, Phone, Envelope } from '@/public/assets/icons/index';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { InfoIcon } from 'lucide-react';
import { ROUTES } from '@/utils';
import { useAuthStore } from '@/stores';
import { useModal } from '@/hooks';

export function ContactOwnkey() {
  const pathname = usePathname();
  const { isAuthenticated, type } = useAuthStore();

  const { openModal, closeModal, contentType, showModal } = useModal();

  return (
    <>
      <div
        className={cn(
          'container w-full h-10 gap-6 border-b flex justify-end items-center text-[10px] sm:text-xs text-blue-950',
          {
            hidden: pathname.startsWith('/user') || pathname.startsWith('/admin'),
          },
        )}>
        <div className="flex gap-2 items-center">
          <Link
            href={
              isAuthenticated && type === 'HOST'
                ? ROUTES.USER.HOST.DASHBOARD.PROPERTIES
                : ROUTES.USER.HOST.AUTH.CREATE_ACCOUNT
            }
            className="hover:text-pink border-r border-black pr-2">
            Property Manager
          </Link>
          <Button
            className="flex gap-1 items-center hover:text-pink !bg-transparent !text-blue-950 !text-xs font-normal"
            onClick={() => openModal('help-line')}>
            Help <InfoIcon className="w-3 h-3" />
          </Button>
          <Modal show={showModal} hideModal={closeModal}>
            {contentType === 'help-line' && (
              <div className="bg-white p-6 rounded-lg">
                <div>
                  <h3 className="font-semibold text-2xl">Get in Touch with Us</h3>
                </div>
                <div className="mt-4 grid gap-3">
                  <Link
                    href={'https://wa.me/233200034608'}
                    target="_blank"
                    className="flex gap-2 items-center p-2 hover:text-blue-600 hover:bg-blue-50 rounded-full border border-gray-400">
                    <WhatsAppIcon className="w-4 h-4" />
                    <span className="text-lg">Chat on Whatsapp</span>
                  </Link>
                  <Link
                    href={'tel:+233200034608'}
                    className="flex gap-2 items-center p-2 hover:text-blue-600 hover:bg-blue-50 rounded-full border border-gray-400"
                    title="Help line">
                    <Phone className="w-4 h-4" />
                    <span className="text-lg">+233(0)20-003-4608</span>
                  </Link>
                  <Link
                    href={'mailto:contact@ownkey.com'}
                    className="flex gap-2 items-center p-2 hover:text-blue-600 hover:bg-blue-50 rounded-full border border-gray-400"
                    title="Help line">
                    <Envelope className="w-4 h-4" />
                    <span className="text-lg">contact@ownkey.com</span>
                  </Link>
                </div>
              </div>
            )}
          </Modal>
        </div>
      </div>
    </>
  );
}
