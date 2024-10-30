import React from 'react';

import { cn } from '@/libs';

import { Icon } from '../Icon';

export function Accordion({
  title,
  content,
  key,
  index,
}: {
  title: string;
  content: string;
  key: number;
  index: number;
}) {
  const [isActive, setIsActive] = React.useState(false);
  return (
    <div className="accordion" key={key}>
      <div className="accordion-item">
        <div
          className="flex items-center gap-4 border-y border-y-[var(--border-color)] py-4 justify-between cursor-pointer"
          onClick={() => setIsActive(!isActive)}>
          <div className="flex items-center gap-4">
            <div
              className={cn(
                'w-8 h-8 text-center flex items-center justify-center font-bold text-white rounded-full',
                isActive ? 'bg-[var(--red)]' : 'bg-[#C0C2C9]',
              )}>
              {index + 1}
            </div>
            <h2 className="text-base font-bold text-[var(--text-color)]">{title}</h2>
          </div>

          <div>{isActive ? <Icon name="CloseIcon" /> : <Icon name="AddIcon" />}</div>
        </div>
        {isActive && (
          <div className="py-4 text-[var(--text-color)] text-base">
            <p>{content}</p>
          </div>
        )}
      </div>
    </div>
  );
}
