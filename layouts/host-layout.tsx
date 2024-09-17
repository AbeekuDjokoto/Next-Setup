'use client';
import React from 'react';

import { DashboardHeader, SideBar } from '@/components/shared';
import { useUser } from '@/hooks/user';
import { useWindowTracker } from '@/hooks/shared';
import { redirect } from '@/utils';

interface Props {
  children: React.ReactNode;
}
function HostLayout({ children }: Props) {
  useUser();
  React.useEffect(() => {
    redirect('HOST');
  }, []);

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { md } = useWindowTracker();

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
        <SideBar isMenuOpen={isMenuOpen} toggleSideBar={toggleSideBar} md={md} type="host" />
      </div>
      <div className="w-full h-screen overflow-y-auto relative noscroll-indicator">
        <DashboardHeader isHost toggleSideBar={toggleSideBar} isMenuOpen={isMenuOpen} />

        <div className="px-6 py-3">{children}</div>
      </div>
    </div>
  );
}

export { HostLayout };
