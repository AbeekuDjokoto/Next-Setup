import { Popover, PopoverContent, PopoverTrigger } from '@/components/shared';

import { cn } from '@/lib/utils';
import { FilterType } from '@/types';

type PopoverProps = {
  children: React.ReactNode;
  setSearch: (...args: any) => void;
  type: string;
  content: any;
  filter?: FilterType;
  setFilter?: (...args: any) => void;
};
export function PopoverSearch({
  children,
  setSearch,
  type,
  filter,
  setFilter,
  ...data
}: PopoverProps) {
  return (
    <Popover onOpenChange={() => setSearch(type)}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        className={cn(
          'mt-[25px] w-[300px] max-h-[300px] flex flex-col rounded-lg border shadow-md bg-white p-3 overflow-y-auto noscroll-indicator',
          { '': type === 'amenity' },
        )}>
        <data.content type={type} filter={filter} setFilter={setFilter} />
      </PopoverContent>
    </Popover>
  );
}
