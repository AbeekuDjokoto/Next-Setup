import { useAuthStore } from '@/stores';
import { cn } from '@/lib/utils';
import { formatDateAndTime } from '@/utils';
import React from 'react';

type Props = {
  type: 'CLIENT' | 'HOST';
  messages: {
    createdAt: any;
    userId: number;
    text: string;
    conversationId: string;
    id: string;
  }[];
};
function ChatMain({ type, messages }: Props) {
  const { user } = useAuthStore();

  return (
    <div className="overflow-y-auto grow py-2 md:p-4 space-y-2 noscroll-indicator">
      {messages.map((message) => {
        const createdAt = new Date(message?.createdAt?.seconds * 1000);
        return (
          <div
            key={message.id}
            className={cn('flex', { 'justify-end': message.userId === user?.id })}>
            <div
              className={cn(
                'p-2 bg-gray-100 text-black rounded-lg rounded-bl-none max-w-[250px] lg:max-w-[350px]',
                {
                  'bg-blue-800 text-white rounded-lg rounded-br-none': message.userId === user?.id,
                  'bg-gray-600': type === 'CLIENT' && message.userId === user?.id,
                },
              )}>
              {decodeHtmlEntities(message.text)}

              <p
                className={cn('text-[10px] text-gray-400 text-right', {
                  'text-white': message.userId === user?.id,
                })}>
                {message &&
                  message.createdAt &&
                  message.createdAt.seconds &&
                  formatDateAndTime(createdAt.toString())}
              </p>
            </div>
          </div>
        );
      })}

      {messages.length === 0 ? (
        <div className="h-full grid place-items-center">
          <div>No Messages yet, start messaging</div>
        </div>
      ) : null}
    </div>
  );
}

export { ChatMain };

function decodeHtmlEntities(str: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(str, 'text/html');
  return doc.documentElement.textContent;
}

function urlify(text: string | null) {
  if (!text) return '';
  var urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, function (url) {
    return '<a href="' + url + '">' + url + '</a>';
  });
}
