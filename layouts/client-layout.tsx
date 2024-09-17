'use client';
import React from 'react';

import { DashboardHeader, SideBar } from '@/components/shared';
import { useUser } from '@/hooks/user';
import { useWindowTracker } from '@/hooks/shared';

interface Props {
  children: React.ReactNode;
}
function ClientLayout({ children }: Props) {
  useUser();

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
        <SideBar isMenuOpen={isMenuOpen} toggleSideBar={toggleSideBar} md={md} type="client" />
      </div>
      <div className="w-full h-screen overflow-y-auto relative noscroll-indicator">
        <DashboardHeader isHost toggleSideBar={toggleSideBar} isMenuOpen={isMenuOpen} />

        <div className="p-3">{children}</div>
      </div>
    </div>
  );
}

export { ClientLayout };
