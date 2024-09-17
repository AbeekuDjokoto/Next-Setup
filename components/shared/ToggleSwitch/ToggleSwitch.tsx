'use client';
import React from 'react';
import { Switch } from '@headlessui/react';

type Props = {
  enabled: boolean;
  setEnabled: (...args: any) => void;
};
export function ToggleSwitch({ enabled, setEnabled }: Props) {
  return (
    <div className="py-2">
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`${enabled ? 'bg-blue-900' : 'bg-gray-200'}
          relative inline-flex h-[25px] w-[48px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}>
        <span
          aria-hidden="true"
          className={`${enabled ? 'translate-x-[23px]' : 'translate-x-0'}
            pointer-events-none inline-block h-[21px] w-[21px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
    </div>
  );
}
