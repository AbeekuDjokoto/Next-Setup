'use client';
import './sidebar.scss';

import React from 'react';

import { cn } from '@/lib/utils';
import Chevron from '@/public/assets/icons/chevron.svg';
import OwnkeyLogo from '@/public/assets/icons/full-logo-outline.svg';
import LogoutIcon from '@/public/assets/icons/right-from-bracket-solid.svg';
import {
  CLIENT_DASHBOARD_LINKS,
  ROUTES,
  logout,
  ADMIN_DASHBOARD_LINKS,
  HOST_DASHBOARD_LINKS,
} from '@/utils';

import Link from 'next/link';
import { Modal, Button } from '@/components/shared';
import { useModal } from '@/hooks/shared';
import { useAuthStore } from '@/stores';
import { Recycle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { SideBarButton } from './SidebarButton';

interface Link {
  pathLink: string;
  label: string;
  icon: React.ReactElement;
}

type Props = {
  isMenuOpen: boolean;
  toggleSideBar: () => void;
  md: boolean;
  type: string;
};

export function SideBar({ isMenuOpen, toggleSideBar, md, type }: Props) {
  const { showModal, contentType, closeModal, openModal } = useModal();
  const { type: userType, reset } = useAuthStore();
  const router = useRouter();
  return (
    <>
      <div
        className={cn(
          'py-4 px-6 flex flex-col h-full bg-blue-900 overflow-y-auto noscroll-indicator transition-all duration-300 ease-in z-20 max-w-max-content',
          'max-md:left-[-100%] max-md:fixed',
          { 'max-md:left-0': isMenuOpen },
          { 'bg-white border-r': type === 'client' },
        )}>
        <OwnkeyLogo
          onClick={() => {
            if (type === 'admin') {
              reset();
            }
            router.push(ROUTES.HOME);
          }}
          className={cn('w-[90px] h-[90px] text-white', { 'text-black': type === 'client' })}
        />

        <div className="grow flex flex-col justify-between">
          <section className={cn('max-h-[600px] overflow-y-auto noscroll-indicator')}>
            {type === 'admin' && (
              <>
                <ItemList
                  links={ADMIN_DASHBOARD_LINKS.dashboard}
                  toggleSideBar={toggleSideBar}
                  md={md}
                />

                <ItemList
                  links={ADMIN_DASHBOARD_LINKS.admin}
                  toggleSideBar={toggleSideBar}
                  md={md}
                />

                <ItemList
                  links={ADMIN_DASHBOARD_LINKS.message}
                  toggleSideBar={toggleSideBar}
                  md={md}
                />
                <ItemList
                  links={ADMIN_DASHBOARD_LINKS.promotion}
                  toggleSideBar={toggleSideBar}
                  md={md}
                />
                <ItemList
                  links={ADMIN_DASHBOARD_LINKS.subscription}
                  toggleSideBar={toggleSideBar}
                  md={md}
                />

                <ItemList
                  links={ADMIN_DASHBOARD_LINKS.customer}
                  toggleSideBar={toggleSideBar}
                  md={md}
                />

                <>
                  <HeaderList label="HOST" toggleOpen={toggleOpen} />
                  <ItemList
                    links={ADMIN_DASHBOARD_LINKS.host}
                    toggleSideBar={toggleSideBar}
                    md={md}
                  />
                </>

                <>
                  <HeaderList label="PROPERTIES" toggleOpen={toggleOpen} />
                  <ItemList
                    links={ADMIN_DASHBOARD_LINKS.propery}
                    toggleSideBar={toggleSideBar}
                    md={md}
                  />
                </>
              </>
            )}
            {type === 'host' && (
              <ItemList links={HOST_DASHBOARD_LINKS} toggleSideBar={toggleSideBar} md={md} />
            )}
            {type === 'client' && (
              <ItemList
                links={CLIENT_DASHBOARD_LINKS}
                toggleSideBar={toggleSideBar}
                md={md}
                type={type}
              />
            )}
          </section>
          <section className=" flex flex-col gap-6">
            {type === 'host' && (
              <>
                {/* <UpgradePremium /> */}
                {/* {md && (
                  <div className="px-2">
                    <UserNav user={user} className="text-white" />
                  </div>
                )} */}
              </>
            )}
            {userType === 'HOST' && (
              <Link
                href={
                  type === 'client'
                    ? ROUTES.USER.HOST.DASHBOARD.HOME
                    : ROUTES.USER.CLIENT.DASHBOARD.PROFILE
                }
                className={cn(
                  'flex items-center text-white gap-3 rounded-lg cursor-pointer p-3 hover:bg-blue-500',
                  { 'text-black hover:bg-black hover:text-white': type === 'client' },
                )}>
                <Recycle />
                Switch to {type === 'client' ? 'Host' : 'Client'}
              </Link>
            )}
            <button
              onClick={() => openModal('show-logout-modal')}
              className={cn(
                'flex items-center text-white gap-3 rounded-lg cursor-pointer p-3 hover:bg-blue-500',
                { 'text-black hover:bg-black hover:text-white': type === 'client' },
              )}>
              <LogoutIcon />
              Logout
            </button>
          </section>
        </div>
      </div>
      <Modal show={showModal} hideModal={closeModal}>
        {contentType === 'show-logout-modal' && (
          <div className="w-full max-w-[400px] bg-white p-6 rounded-lg grid gap-4">
            <h1 className="text-xl font-semibold">Are you sure you want to logout</h1>

            <div className="flex justify-between items-center gap-4">
              <Button variant={'outline'} onClick={closeModal} className="grow">
                Cancel
              </Button>
              <Button variant={'destructive'} onClick={() => logout(userType)} className="grow">
                Logout
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}

function toggleOpen(e: any) {
  let label = e.target.closest('.group-label');
  label.classList.toggle('open');
}

function HeaderList({ label, toggleOpen }: { label: string; toggleOpen: any }) {
  return (
    <div
      onClick={toggleOpen}
      className={cn('flex justify-between items-center px-3 py-1.5 text-white', 'group-label')}>
      {label}
      <Chevron className="text-white open" />
    </div>
  );
}
// eslint-disable-next-line no-unused-vars
function ItemList({
  links,
  toggleSideBar,
  type,
  md,
}: {
  links: Link[];
  // eslint-disable-next-line no-unused-vars
  toggleSideBar: (...args: any) => any;
  md: boolean;
  type?: string;
}) {
  return (
    <div className="flex flex-col nav-group__list">
      {links.map((item) => (
        <SideBarButton
          key={item.label}
          {...item}
          toggleSideBar={toggleSideBar}
          md={md}
          type={type}
        />
      ))}
    </div>
  );
}
