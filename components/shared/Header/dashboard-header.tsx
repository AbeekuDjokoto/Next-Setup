'use client';
import { cn } from '@/lib/utils';
import MenuIcon from '@/public/assets/icons/bars-solid.svg';
import CloseIcon from '@/public/assets/icons/xmark-solid.svg';
import { useAuthStore } from '@/stores';
import { formatDate, getGreeting } from '@/utils';

import { DashboardUserAccount } from './dashboard-user-account';
import { Bell } from 'lucide-react';
import { DoubleCheck } from '@/public/assets/icons';
import { useUserNotification } from '@/hooks/user';
import { INotification } from '@/types';
import React from 'react';
import { Icons } from '../Icons';
import { Spinner } from '../Loaders';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/shared';

interface Props {
  toggleSideBar: () => void;
  isMenuOpen: boolean;
  isHost?: boolean;
  admin?: any;
}

function DashboardHeader({ toggleSideBar, isMenuOpen, isHost, admin }: Props) {
  const { user, type } = useAuthStore();
  const { notifications, isLoading } = useUserNotification();

  const unReadNotifications = React.useMemo(() => {
    return notifications.filter((item) => item.read === false);
  }, [notifications]);

  return (
    <div
      className={cn('w-full flex justify-between items-center px-6 py-3 border-b', {
        'justify-end': !isHost,
      })}>
      {isHost && (
        <h3 className="text-lg">
          {getGreeting()}, <strong>{user?.firstname}</strong>
        </h3>
      )}

      <div className="flex gap-6 items-center justify-self-end">
        <div className="flex items-center gap-2">
          <div className={cn({ hidden: type === 'ADMIN' })}>
            <Popover>
              <PopoverTrigger asChild>
                <div className="relative bg-white-200 h-10 w-10 border-[0.4px] p-2 grid place-items-center rounded-full">
                  <div
                    className={cn(
                      'w-3 h-3 bg-red-500 absolute top-0 right-0 rounded-full animate-pulse',
                      { hidden: unReadNotifications.length === 0 },
                    )}></div>
                  <Bell />
                </div>
              </PopoverTrigger>
              <PopoverContent>
                <NotificationList notifications={unReadNotifications} isLoading={isLoading} />{' '}
              </PopoverContent>
            </Popover>
          </div>
          <div className="max-sm:hidden">
            <DashboardUserAccount user={admin ?? user} type={type} />
          </div>
          <div className="md:hidden">
            {isMenuOpen ? (
              <CloseIcon onClick={toggleSideBar} className="w-[25px] h-[25px]" />
            ) : (
              <MenuIcon onClick={toggleSideBar} className="w-[25px] h-[25px]" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export { DashboardHeader };

function NotificationList({
  notifications,
  isLoading,
}: {
  notifications: INotification[];
  isLoading: boolean;
}) {
  const { onReadNotification, isLoadingUpdateNotification } = useUserNotification();
  return (
    <div className="w-full h-[300px] overflow-y-auto flex flex-col justify-between noscroll-indicator">
      {isLoading ? (
        <div className="h-full w-full grid place-items-center">
          <Spinner />
        </div>
      ) : (
        <>
          {notifications.length === 0 ? (
            <div className="justify-self-center self-center">You have no unread notifications</div>
          ) : (
            <>
              {/* <div className="overflow-y-auto grow flex flex-col gap-1 bg-red-500"> */}
              {notifications.map((item) => {
                return (
                  <div key={item.id} className="flex flex-col gap-2 border p-2 rounded">
                    <div className="flex justify-between gap-4 items-center">
                      <div>
                        <h4 className="font-semibold text-xs">{item.title}</h4>
                        <p className="text-sm one-line">{item?.body}</p>
                      </div>

                      {!item.read ? (
                        <div className="w-3 h-3 bg-green-300 rounded-full"></div>
                      ) : null}
                    </div>

                    <div className="flex justify-between text-[10px]">
                      <button
                        className="outline-none ring-0 focus:outline-none flex items-center gap-1 justify-self-end shrink-0 text-blue-600 text-xs"
                        onClick={() => onReadNotification(item.id)}>
                        {isLoadingUpdateNotification ? (
                          <Icons.spinner className="mr-2 h-3 w-3 animate-spin" />
                        ) : (
                          <DoubleCheck />
                        )}
                        Mark as read
                      </button>
                      <p>{formatDate(item.created_at)}</p>
                    </div>
                  </div>
                );
              })}
              {/* </div> */}
            </>
          )}
        </>
      )}
    </div>
  );
}
