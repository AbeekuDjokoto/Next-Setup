'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { buttonVariants } from '@/components/shared';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/utils';
import OwnkeyLogo from '@/public/assets/icons/full-logo-outline.svg';

interface Props {
  children: React.ReactNode;
  type: string;
}

function AuthLayout({ children, type }: Props) {
  const pathname = usePathname();

  return (
    <div className="w-screen h-screen flex">
      <div className="login-bg hidden lg:grid h-screen grow bg-primary place-items-center 2xl:w-3/5 relative">
        {type === 'host' && <div className="absolute inset-0 join-ownkey-host-bg"></div>}
        {type === 'client' && <div className="absolute inset-0 join-ownkey-client-bg"></div>}
      </div>
      <div className="w-[585px] max-lg:grow 2xl:w-2/5 pt-24 pb-24 relative overflow-y-auto noscroll-indicator">
        <div className="w-full absolute flex flex-row-reverse justify-between items-center top-0 left-0 right-0">
          {(pathname === ROUTES.USER.HOST.AUTH.LOGIN ||
            pathname === ROUTES.USER.CLIENT.AUTH.LOGIN) &&
          !pathname.startsWith(ROUTES.USER.HOST.AUTH.REGISTER_HOST) ? (
            <Link
              href={
                type === 'client'
                  ? ROUTES.USER.CLIENT.AUTH.CREATE_ACCOUNT
                  : ROUTES.USER.HOST.AUTH.CREATE_ACCOUNT
              }
              className={cn(buttonVariants({ variant: 'ghost' }))}>
              Register
            </Link>
          ) : (
            <>
              <Link
                href={
                  type === 'client' ? ROUTES.USER.CLIENT.AUTH.LOGIN : ROUTES.USER.HOST.AUTH.LOGIN
                }
                className={cn(buttonVariants({ variant: 'ghost' }))}>
                Login
              </Link>
            </>
          )}

          <Link href={ROUTES.HOME}>
            <OwnkeyLogo className={cn('w-[90px] h-[90px] text-blue-900')} />
          </Link>
        </div>

        {children}
      </div>
    </div>
  );
}

export { AuthLayout };
