import { cn } from '@/lib/utils';

import { ChatHeader } from './ChatHeader';
import { ChatMain } from './ChatMain';
import { ChatSendMessage } from './ChatSendMessage';
import { useAuthStore } from '@/stores';
import React from 'react';

interface Props {
  className: string;
  conversationId: string;
  conversation: { id: string; parties: any[] };
  toggleShowChat: () => void;
  type: 'CLIENT' | 'HOST';
  sendMessage: (...args: any) => any;
  messages: any[];
}

function Chat({
  className,
  toggleShowChat,
  type,
  sendMessage,
  messages,
  conversation,
  conversationId,
}: Props) {
  const { user } = useAuthStore();
  const dummy = React.useRef<HTMLDivElement | null>(null);
  function getUser(conversation: { parties: any[] }) {
    return conversation?.parties?.find((item: any) => item.id != user?.id);
  }

  async function handleOnEnter(text: string) {
    if (text.trim().length === 0) return;
    await sendMessage({ text, conversationId: '', userId: user?.id });
    dummy.current?.scrollIntoView({ behavior: 'smooth' });
  }
  return (
    <div className={cn('flex flex-col justify-between sm:border-l sm:border-gray-200', className)}>
      {conversationId ? (
        <>
          <ChatHeader toggleShowChat={toggleShowChat} user={getUser(conversation)} />
          <ChatMain type={type} messages={messages} />
          <ChatSendMessage handleOnEnter={handleOnEnter} />
        </>
      ) : (
        <div className="h-full grid place-items-center font-semibold">Select a conversation</div>
      )}

      <div ref={dummy}></div>
    </div>
  );
}

export { Chat };
