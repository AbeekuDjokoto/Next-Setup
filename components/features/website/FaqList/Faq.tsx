'use client';
import { Expandable } from '@/components/shared';
import { XIcon, PlusIcon } from 'lucide-react';
import React from 'react';

type Props = {
  id: number;
  question: string;
  answer: string;
};

export function Faq({ id, question, answer }: Props) {
  const [openAccordionId, setOpenAccordionId] = React.useState<number | null>(null);

  const toggleAccordion = (id: number) => {
    if (openAccordionId === id) {
      setOpenAccordionId(null);
    } else {
      setOpenAccordionId(id);
    }
  };
  return (
    <div role="button" onClick={() => toggleAccordion(id)} className="w-full">
      <div className="w-full flex gap-2.5 py-4 justify-between overflow-y-auto noscroll-indicator self-stretch cursor-pointer, border-b border-t">
        <div className="flex gap-4 items-center">
          <div className="shrink-0 w-8 h-8 bg-pink text-white text-xs flex justify-center items-center rounded-full">
            {id}
          </div>
          <h3 className="text-md font-semibold leading-[150%]">{question}</h3>
        </div>
        {openAccordionId === id ? <XIcon /> : <PlusIcon />}
      </div>

      <Expandable expand={openAccordionId === id}>
        <p className="text-sm leading-[50px] font-normal">{answer}</p>
      </Expandable>
    </div>
  );
}
