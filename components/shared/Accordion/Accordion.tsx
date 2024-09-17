import { cn } from '@/lib/utils';
import classes from './expandable.module.scss';
import React, { ReactNode } from 'react';
import { ChevronDownIcon, ChevronUpIcon, MinusIcon, PlusIcon } from 'lucide-react';

interface Props {
  expand: boolean;
  children: ReactNode;
}

export const Expandable = ({ expand, children }: Props) => {
  return (
    <div className={cn([classes.content], { [classes.expanded]: expand })}>
      <div className={classes.expandable_inner}>{children}</div>
    </div>
  );
};

export function Accordion({
  children,
  id,
  title,
  plus = false,
}: {
  children: React.ReactNode;
  id: number;
  title: string;
  plus?: boolean;
}) {
  const [openAccordionId, setOpenAccordionId] = React.useState<number | null>(null);

  const toggleAccordion = (id: number) => {
    if (openAccordionId === id) {
      setOpenAccordionId(null);
    } else {
      setOpenAccordionId(id);
    }
  };
  return (
    <div>
      <div
        onClick={() => toggleAccordion(id)}
        className={cn(
          'flex items-center gap-3 justify-between p-3 cursor-pointer border rounded-md',
          {
            'bg-gray-100': openAccordionId === id,
          },
        )}>
        <div className="flex gap-3">
          {openAccordionId === id ? <ChevronUpIcon /> : <ChevronDownIcon />}
          <h3 className="text-base font-semibold !capitalize">{title}</h3>
        </div>
        {plus ? <div>{openAccordionId === id ? <MinusIcon /> : <PlusIcon />}</div> : null}
      </div>
      <Expandable expand={openAccordionId === id}>
        <div className="w-full p-6">{children}</div>
      </Expandable>
    </div>
  );
}
