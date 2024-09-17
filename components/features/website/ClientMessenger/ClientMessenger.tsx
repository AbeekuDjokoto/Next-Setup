'use client';

import React, { useState } from 'react';

import { cn } from '@/lib/utils';
import { Chat, Conversation } from '@/components/features/user';
import { XIcon } from 'lucide-react';
import { Tooltip } from 'flowbite-react';
import { useMessenger } from '@/context';

type Props = {
  closeModal: () => void;
};
export function ClientMessenger({ closeModal }: Props) {
  // const router = useRouter();
  const { conversations, sendMessage, messages, setConversationId, conversationId } =
    useMessenger();

  const [showChat, setShowChat] = useState(false);
  function toggleShowChat() {
    setShowChat((prev) => !prev);
  }

  return (
    <div className="bg-white p-4 relative h-[65.5vh] max-sm:h-[80vh] overflow-hidden grid grid-rows-1 sm:grid-cols-[max-content,auto] w-full md:w-[720px] lg:w-[860px]">
      <Conversation
        showChat={showChat}
        toggleShowChat={toggleShowChat}
        type="HOST"
        conversations={conversations}
        conversationId={conversationId}
        setConversationId={setConversationId}
      />
      <Chat
        className={cn({ 'max-sm:hidden': !showChat }, { flex: showChat })}
        toggleShowChat={toggleShowChat}
        type="HOST"
        sendMessage={sendMessage}
        conversation={conversations.find((item) => item.id === conversationId)}
        messages={messages}
        conversationId={conversationId}
      />
      <div className="flex gap-4 items-center absolute top-4 right-4">
        <Tooltip content="Close">
          <button onClick={closeModal}>
            <XIcon className="w-5 h-5" />
          </button>
        </Tooltip>
      </div>
    </div>
  );
}
