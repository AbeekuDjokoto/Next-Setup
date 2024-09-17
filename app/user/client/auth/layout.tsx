import React from 'react';

import { AuthLayout } from '@/layouts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Login to Ownkey',
    default: 'Login to Ownkey | Access Your Real Estate Account in Accra',
  },
  description:
    'Log in to your Ownkey account to manage your property listings, view favorites, and connect with real estate agents in Accra.',
  metadataBase: new URL('https://ownkey.com/user/client/auth'),
};
interface Props {
  children: React.ReactNode;
}
function RootLayout({ children }: Props) {
  return <AuthLayout type="client">{children}</AuthLayout>;
}

export default RootLayout;
