'use client';
import React from 'react';

import { ClientLayout } from '@/layouts';

interface Props {
  children: React.ReactNode;
}

function RootLayoutDashboard({ children }: Props) {
  return <ClientLayout>{children}</ClientLayout>;
}

export default RootLayoutDashboard;
