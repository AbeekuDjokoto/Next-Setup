import { useAuthStore } from '@/stores';

import SingleConversation from './SingleConversation';

interface Props {
  toggleShowChat: () => void;
  conversations: { id: string; parties: any }[];
  conversationId: string;
  setConversationId: React.Dispatch<React.SetStateAction<string>>;
}

function ConversationList({
  toggleShowChat,
  conversations,
  setConversationId,
  conversationId,
}: Props) {
  const { user } = useAuthStore();

  function getUser(conversation: { parties: any[] }) {
    return conversation.parties.find((item: any) => item.id != user?.id);
  }
  return (
    <div className="w-full py-4">
      {conversations.length === 0 ? (
        <div className="h-96 grid place-items-center px-14">
          <p className="font-semibold">You have no conversations yet.</p>
        </div>
      ) : null}
      {conversations?.map((conversation) => {
        return (
          <SingleConversation
            active={conversationId === conversation.id}
            key={conversation.id}
            id={conversation.id}
            user={getUser(conversation)}
            toggleShowChat={toggleShowChat}
            setConversationId={setConversationId}
          />
        );
      })}
    </div>
  );
}

export default ConversationList;
