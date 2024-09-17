'use client';
import React from 'react';

import { DashboardHeader, SideBar } from '@/components/shared';
import { useWindowTracker } from '@/hooks/shared';
import { redirect } from '@/utils';
import { useAdmin } from '@/hooks/user';

interface Props {
  children: React.ReactNode;
}
function AdminLayout({ children }: Props) {
  React.useEffect(() => {
    redirect('ADMIN');
  }, []);

  const [isMenuOpen, setIsMenuOpen] = React.useState(true);
  const { md } = useWindowTracker();
  const { data } = useAdmin();

  function toggleSideBar() {
    setIsMenuOpen((prev) => !prev);
  }

  React.useEffect(() => {
    if (md) {
      setIsMenuOpen(false);
    }
  }, [md]);

  return (
    <div className="grid h-full grid-rows-1 grid-cols-[max-content,auto]">
      <div className="h-screen">
        <SideBar isMenuOpen={isMenuOpen} toggleSideBar={toggleSideBar} md={md} type="admin" />
      </div>
      <div className="w-full h-screen overflow-y-auto noscroll-indicator relative">
        <DashboardHeader toggleSideBar={toggleSideBar} isMenuOpen={isMenuOpen} admin={data} />

        <div className="px-6 py-3">{children}</div>
      </div>
    </div>
  );
}

export { AdminLayout };
