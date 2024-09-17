import { cn } from '@/lib/utils';
import { GridIcon, ListIcon } from '@/public/assets/icons';

interface Props {
  viewType: string;
  setViewType: any;
}

function ViewType({ viewType, setViewType }: Props) {
  return (
    <div className={cn('border rounded-lg overflow-hidden flex w-[100px] min-w-[100px]')}>
      <div
        onClick={() => setViewType('list')}
        className={cn('p-3.5 grow cursor-pointer', {
          'bg-blue-900 text-white': viewType === 'list',
        })}>
        <ListIcon />
      </div>
      <div
        onClick={() => setViewType('grid')}
        className={cn('p-3.5 grow cursor-pointer', {
          'bg-blue-900 text-white': viewType === 'grid',
        })}>
        <GridIcon />
      </div>
    </div>
  );
}

export { ViewType };
