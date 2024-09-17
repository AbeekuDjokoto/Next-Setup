'use client';
import { ROUTES } from '@/utils';
import Link from 'next/link';
import React from 'react';

interface Props extends React.BaseHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  label: string;
  description: string;
  isAdmin?: boolean;
  type: 'client' | 'host' | 'admin';
}

function AuthFormWrapper({ children, isAdmin, ...props }: Props) {
  const { label, description, type } = props;
  return (
    <div className="grid w-full h-full place-items-center">
      <div className="grid gap-8 w-full max-w-md px-6">
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold tracking-tight">{label}</h1>
          <p className="text-sm">{description}</p>
        </div>
        {children}
        <>
          {isAdmin ? null : (
            <>
              <p className="px-8 text-center text-xs text-gray-700">
                By clicking continue, you agree to our{' '}
                <Link
                  href={type === 'client' ? ROUTES.TERMS_AND_CONDITIONS : ROUTES.TERMS_OF_SERVICE}
                  className="underline underline-offset-4 hover:text-pink text-gray-700">
                  Terms of Service{' '}
                </Link>
                and{' '}
                <Link
                  href={ROUTES.PRIVACY_POLICY}
                  className="underline underline-offset-4 hover:text-pink text-gray-700">
                  Privacy Policy
                </Link>
              </p>
              <div className="text-xs text-center text-gray-700">
                <span>Do you have any Questions? Go through our </span>
                <Link
                  href={type === 'client' ? ROUTES.FAQ.CLIENT : ROUTES.FAQ.HOST}
                  className="hover:text-pink underline text-gray-700">
                  FAQS
                </Link>
              </div>
            </>
          )}
        </>
      </div>
    </div>
  );
}

export { AuthFormWrapper };
