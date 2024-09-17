'use client';

import React, { useState } from 'react';

import { Chat, Conversation } from '@/components/features/user';
import { useWindowTracker } from '@/hooks/shared';
import { cn } from '@/lib/utils';
import { useMessenger } from '@/context';

function Message() {
  const { conversations, sendMessage, setConversationId, messages, conversationId } =
    useMessenger();

  const { sm } = useWindowTracker();
  const [showChat, setShowChat] = useState(false);
  function toggleShowChat() {
    setShowChat((prev) => !prev);
  }

  return (
    <div className="h-[87.5vh] overflow-hidden grid grid-rows-1 sm:grid-cols-[max-content,auto]">
      <Conversation
        showChat={showChat}
        toggleShowChat={toggleShowChat}
        type="CLIENT"
        conversations={conversations}
        setConversationId={setConversationId}
        conversationId={conversationId}
      />
      <Chat
        className={cn({ 'max-sm:hidden': !showChat }, { flex: showChat })}
        toggleShowChat={toggleShowChat}
        conversation={conversations.find((item) => item.id === conversationId)}
        type="CLIENT"
        sendMessage={sendMessage}
        messages={messages}
        conversationId={conversationId}
      />
    </div>
  );
}

export default Message;
