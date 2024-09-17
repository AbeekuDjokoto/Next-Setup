import { Button, Popover, PopoverContent, PopoverTrigger } from '@/components/shared';
import { Chevron } from '@/public/assets/icons';

import { cn } from '@/lib/utils';
import { FilterType } from '@/types';

type PopoverProps = {
  setSearch: (...args: any) => void;
  label: string;
  search: string;
  type: string;
  content: any;
  filter?: FilterType;
  setFilter?: (...args: any) => void;
};
export function MainPopoverSearch({
  setSearch,
  search,
  type,
  filter,
  setFilter,
  label,
  ...data
}: PopoverProps) {
  return (
    <Popover onOpenChange={() => setSearch(type)}>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn('flex gap-4 items-center w-max', {
            'border border-gray-400 bg-gray-100': search === type,
          })}>
          {label} <Chevron className={cn({ 'rotate-180': search === type })} />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          'mt-[25px] w-[300px] max-h-[300px] flex flex-col rounded-3xl border shadow-md bg-white p-3 overflow-y-auto noscroll-indicator',
          { '': type === 'amenity' },
        )}>
        <data.content type={type} filter={filter} setFilter={setFilter} />
      </PopoverContent>
    </Popover>
  );
}
