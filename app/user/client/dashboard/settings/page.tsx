'use client';

import { ManageAccount, ManageNotifications } from '@/components/features/user';
import { TabsUnderline } from '@/components/shared';
import { useTabs } from '@/hooks/shared';

function Settings() {
  const { tabs, setActiveTab, active } = useTabs(
    [
      { label: 'Notifications', value: 'notifications' },
      { label: 'Account', value: 'account' },
    ],
    'notifications',
  );

  return (
    <div>
      <TabsUnderline tabs={tabs} setActiveTab={setActiveTab} active={active} />

      {active === 'account' && <ManageAccount />}
      {active === 'notifications' && <ManageNotifications />}
    </div>
  );
}

export default Settings;
