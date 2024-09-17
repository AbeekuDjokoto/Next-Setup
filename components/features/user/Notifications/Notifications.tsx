'use client';

import { CubicLoader } from '@/components/shared/Loaders';
import { useUserNotification } from '@/hooks/user';

export function Notifications() {
  const { notifications, isLoading } = useUserNotification();

  return (
    <div className="grid py-6">
      <div className="w-full flex flex-col gap-4 max-w-4xl shadow rounded-xl min-h-[500px] p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Notifications</h1>
          {/* <button className="hover:underline">Mark all as read</button> */}
        </div>

        {isLoading ? (
          <div className="h-full grid place-items-center">
            <CubicLoader />
          </div>
        ) : (
          <div className="h-full grow">
            {notifications.length === 0 ? (
              <div className="w-full h-full grid place-items-center">
                <div className="text-center">
                  <h4 className="font-semibold text-lg">No Notification</h4>
                  <p className="text-gray-500">You don't have notification</p>
                </div>
              </div>
            ) : (
              <div className="grid gap-4 overflow-y-auto noscroll-indicator">
                {notifications?.map((notification) => (
                  <div key={notification.id} className="border rounded-md p-2 shadow grid gap-2">
                    <h1 className="font-semibold">{notification.title}</h1>
                    <p className="text-xs text-gray-500">{notification.body}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
