'use client';
import React from 'react';

import { Search } from '@/components/shared';
import { cn } from '@/lib/utils';

function ConversationHeader({ type }: { type: 'CLIENT' | 'HOST' }) {
  const [value, setValue] = React.useState('');
  function onHandleChange(search: string) {
    setValue(search);
  }
  return (
    <div
      className={cn('grid gap-4 bg-blue-800 p-4 sticky top-0 z-10 rounded-md', {
        'bg-black': type === 'CLIENT',
      })}>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl text-white font-semibold">Chats</h1>
        {/* <div className=" bg-white text-blue-900 grid place-items-center text-center rounded px-2">
          12
        </div> */}
      </div>

      <Search placeholder="search" value={value} onChange={onHandleChange} />
    </div>
  );
}

export default ConversationHeader;
