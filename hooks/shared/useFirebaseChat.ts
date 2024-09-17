import { db } from '@/config/firebase';
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  query,
  orderBy,
  where,
  onSnapshot,
} from 'firebase/firestore';
import React from 'react';
// import { useToastify } from '.';

export function useFirebaseChat(conversationId?: string | string[]) {
  //   const { successToast, errorToast } = useToastify();
  const [conversations, setConversations] = React.useState<any[]>([]);
  const [messages, setMessages] = React.useState<any[]>([]);

  async function getConversations() {
    const querySnapshot = await getDocs(collection(db, 'conversations'));

    let messages: any[] = [];
    querySnapshot.forEach((doc) => {
      let obj = { id: doc.id, ...doc.data() };
      messages.push(obj);
    });

    setConversations(messages);
  }

  React.useEffect(() => {
    getConversations();
  }, []);

  React.useEffect(() => {
    const queryMessages = query(
      collection(db, 'messages'),
      where('conversationId', '==', conversationId),
      orderBy('createdAt'),
    );
    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages: any = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });

    return () => unsuscribe();
  }, [conversationId]);

  const createChatRoom = async (
    user: { id: number; firstname: string; lastname: string },
    parties: number[],
  ) => {
    try {
      await addDoc(collection(db, 'conversations'), {
        user,
        parties,
      });
    } catch (error) {
      console.error('Error creating chat room: ', error);
      return null;
    }
  };

  function initialChat(userId: number, recepientId: number) {
    for (let item of conversations) {
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

  return { createChatRoom, conversations, sendMessage, messages };
}
