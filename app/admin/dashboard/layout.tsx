import React from 'react';

import { AdminLayout } from '@/layouts';
function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}

export default AdminRootLayout;
