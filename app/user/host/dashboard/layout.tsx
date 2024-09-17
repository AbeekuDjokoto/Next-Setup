'use client';
import React from 'react';

import { HostLayout } from '@/layouts';

interface Props {
  children: React.ReactNode;
}

function RootLayoutDashboard({ children }: Props) {
  return <HostLayout>{children}</HostLayout>;
}

export default RootLayoutDashboard;
