import { Outlet } from 'react-router';

import { Footer, Navbar } from '@/components';

export function WebsiteLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
