import React from 'react';

import { db } from '@/config/firebase';
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  where,
  onSnapshot,
} from 'firebase/firestore';
import { useAuthStore } from '@/stores';
import { useUser } from '@/hooks/user';

interface MessengerContextType {
  sendMessage: ({ text, userId }: { text: string; userId: number }) => Promise<void>;
  initialChat(
    userId: number,
    recepientId: number,
    recepient: {
      id: number;
      firstname: string;
      lastname: string;
      profileImage?: string;
    },
  ): Promise<void>;
  messages: any[];
  conversations: any[];
  conversationId: string;
  setConversationId: React.Dispatch<React.SetStateAction<string>>;
}

type Conversation = {
  partiesId: any[];
  parties: number[];
};

const MessengerContext = React.createContext<MessengerContextType | null>(null);

export function MessengerProvider({ children }: { children: React.ReactNode }) {
  useUser();
  const { user } = useAuthStore();
  const [conversations, setConversations] = React.useState<Conversation[]>([]);
  const [search, setSearch] = React.useState('');
  const [messages, setMessages] = React.useState<any[]>([]);
  const [conversationId, setConversationId] = React.useState('');

  React.useEffect(() => {
    const queryConversations = query(collection(db, 'conversations'));
    const unsubscribe = onSnapshot(queryConversations, (snapshot) => {
      let conversations: any = [];
      snapshot.forEach((doc) => {
        conversations.push({ ...doc.data(), id: doc.id });
      });
      setConversations(conversations);
    });

    return () => unsubscribe();
  }, []);

  React.useEffect(() => {
    const queryMessages = query(
      collection(db, 'messages'),
      where('conversationId', '==', conversationId),
      orderBy('createdAt'),
    );
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages: any = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });

    return () => unsubscribe();
  }, [conversationId]);

  const createChatRoom = async (
    parties: { id?: number; firstname?: string; lastname?: string }[],
    partiesId: any[],
  ) => {
    try {
      await addDoc(collection(db, 'conversations'), {
        parties,
        partiesId,
      });
    } catch (error) {
      console.error('Error creating chat room: ', error);
      return null;
    }
  };

  async function initialChat(
    userId: number,
    recepientId: number,
    recepient: { id: number; firstname: string; lastname: string },
  ) {
    let exist = false;
    for (let item of conversations) {
      if (item.partiesId.includes(userId) && item.partiesId.includes(recepientId)) {
        console.log('chat room already exists');
        exist = true;
        return;
      }
    }
    if (!exist) {
      console.log('creating chat room');
      await createChatRoom(
        [{ id: user?.id, firstname: user?.firstname, lastname: user?.lastname }, recepient],
        [user?.id, recepient.id],
      );
    }
  }

  const sendMessage = async ({ text, userId }: { text: string; userId: number }) => {
    try {
      await addDoc(collection(db, 'messages'), {
        conversationId,
        text,
        createdAt: serverTimestamp(),
        userId,
      });
    } catch (error) {
      console.error('Error sending Message try again');
    }
  };

  const value = {
    sendMessage,
    initialChat,
    messages,
    conversationId,
    conversations: conversations.filter((conversation) =>
      isUserConversation(conversation, user?.id),
    ),
    setConversationId,
  };

  return <MessengerContext.Provider value={value}>{children}</MessengerContext.Provider>;
}

export const useMessenger = () => {
  const context = React.useContext(MessengerContext);
  if (!context) throw Error('useMessenger must be used in within MessengerProvider');
  return context;
};

function isUserConversation(conversation: any, userId?: number) {
  if (!conversation || !userId) return false;
  return conversation.partiesId.includes(userId);
}

function userConversations(conversations: any, userId?: number) {
  const arr: any[] = [];
  if (!conversations || userId) return arr;

  for (let convo of conversations) {
    if (isUserConversation(convo, userId)) {
      arr.push(convo);
    }
  }
  return arr;
}
