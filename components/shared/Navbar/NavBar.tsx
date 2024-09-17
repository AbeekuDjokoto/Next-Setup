'use client';

import Link from 'next/link';
import React from 'react';

import { UserAccount } from '@/components/features/website';
import { usePropertyTypes } from '@/hooks/admin';
import { useWindowTracker } from '@/hooks/shared';
import { cn } from '@/lib/utils';
import { HorizontalLogo } from '@/public/assets/icons';
import { useAuthStore } from '@/stores';
import { ROUTES } from '@/utils';
import { MenuIcon, XIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { MobileNav } from './MobileNav';
// import { ModeToggle } from '@/components/features/blog/ModeToggle';

function NavBar() {
  const { isAuthenticated, type } = useAuthStore();
  const pathname = usePathname();
  const { propertyTypes } = usePropertyTypes(20);
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

  const navData = [
    {
      id: 'FOR_SALE',
      label: 'Buy',
      path: '#',
      content: propertyTypes,
    },
    {
      id: 'FOR_RENT',
      label: 'Rent',
      path: '#',
      content: propertyTypes,
    },
  ];
  return (
    <>
      <MobileNav isMenuOpen={isMenuOpen} navData={navData} toggleSidebar={toggleSideBar} />
      <div
        className={cn('z-20 sticky top-0 shadow', {
          hidden: pathname.startsWith('/user') || pathname.startsWith('/admin'),
        })}>
        <div className="container bg-white justify-between flex items-center">
          <div className="flex gap-3 items-center max-sm:hidden">
            {navData?.map((item) => (
              <NavLinkContent
                key={item.id}
                label={item.label}
                content={item.content}
                listing={item.id}
              />
            ))}
            <Link
              href={ROUTES.FIND_HOST}
              className="font-medium hover:bg-pink hover:text-white px-4 py-2 rounded">
              Find Agent
            </Link>
          </div>

          <Link href={ROUTES.HOME}>
            {/* <VerticalLogo className="w-[150px] h-[50px] md:w-[200px] md:h-[75px]" /> */}
            <HorizontalLogo className="w-[150px] h-[50px] md:w-[200px] md:h-[75px]" />
          </Link>

          <div className="flex items-center gap-4 max-sm:hidden">
            {/* <ModeToggle /> */}
            {!pathname.startsWith('/user') ? (
              <>
                <Link
                  href={
                    isAuthenticated && type === 'HOST'
                      ? ROUTES.USER.HOST.DASHBOARD.PROPERTIES
                      : ROUTES.USER.HOST.AUTH.LOGIN
                  }
                  className="font-medium text-pink">
                  Start a listing
                </Link>

                <UserAccount />
              </>
            ) : (
              <Link href={ROUTES.HOME}>Go to Ownkey</Link>
            )}
          </div>

          <div className="md:hidden">
            {isMenuOpen ? (
              <XIcon onClick={toggleSideBar} />
            ) : (
              <>
                <MenuIcon onClick={toggleSideBar} />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

type NavLinkContentProps = {
  label: string;
  listing: string;
  content: any[];
};

function NavLinkContent({ label, content, listing }: NavLinkContentProps) {
  return (
    <span className="hover:bg-pink hover:text-white rounded group font-medium relative px-4 py-2">
      {label}
      <div
        className={cn(
          'p-2 w-[180px] absolute left-0 top-[39px] bg-white shadow rounded hidden flex-col gap-2 group-hover:flex max-h-64 overflow-y-auto noscroll-indicator',
        )}>
        {content?.map((item, index) => (
          <Link
            key={index}
            href={`${ROUTES.SEARCH_PAGE}?listing=${listing}&property_type=${item.slug}`}
            className="font-normal text-sm text-black p-2 hover:text-blue-600 hover:bg-blue-50 rounded">
            {item.name} {`${listing === 'FOR_SALE' ? 'for sale' : 'for rent'}`}
          </Link>
        ))}
      </div>
    </span>
  );
}

export { NavBar };
