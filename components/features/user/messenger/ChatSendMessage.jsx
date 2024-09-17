'use client';
import React from 'react';
import InputEmoji from 'react-input-emoji';
import { AttachImage } from './AttachImage';
import { SendHorizonalIcon } from 'lucide-react';

function ChatSendMessage({ handleOnEnter }) {
  const [text, setText] = React.useState('');

  return (
    <div className="max-w-full">
      <div className="flex gap-1 items-center">
        <InputEmoji
          value={text}
          onChange={setText}
          cleanOnEnter
          shouldReturn
          onEnter={handleOnEnter}
          placeholder="Type a message"
        />
        <AttachImage />
        {text.length > 0 ? (
          <button className="w-max" onClick={() => handleOnEnter(text)}>
            <SendHorizonalIcon className="text-gray-500" />
          </button>
        ) : null}
      </div>
    </div>
  );
}

export { ChatSendMessage };
