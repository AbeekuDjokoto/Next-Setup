import { cn } from '@/lib/utils';

import ConversationHeader from './ConversationHeader';
import ConversationList from './ConversationList';

interface Props {
  showChat: boolean;
  conversationId: string;
  toggleShowChat: () => void;
  type: 'CLIENT' | 'HOST';
  conversations: any[];
  setConversationId: React.Dispatch<React.SetStateAction<string>>;
}

function Conversation({
  showChat,
  toggleShowChat,
  type,
  conversations,
  setConversationId,
  conversationId,
}: Props) {
  return (
    <div
      className={cn('min-w-[340px] w-full h-full overflow-y-auto relative noscroll-indicator', {
        'max-sm:hidden': showChat,
      })}>
      <ConversationHeader type={type} />
      <ConversationList
        toggleShowChat={toggleShowChat}
        conversations={conversations}
        conversationId={conversationId}
        setConversationId={setConversationId}
      />
    </div>
  );
}

export { Conversation };
