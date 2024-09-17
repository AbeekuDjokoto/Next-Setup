import { cn } from '@/lib/utils';

interface Tab {
  id: number;
  label: string;
  value: string;
  isActive: boolean;
}
interface Props {
  tabs: Tab[];
  // eslint-disable-next-line no-unused-vars
  setActiveTab: (id: number) => void;
  active: string | undefined;
  className?: string;
}

function TabsUnderline({ tabs, setActiveTab, active, className }: Props) {
  return (
    <div
      className={cn(
        'flex gap-8 py-[8.7px] border-b-[1px] border-gray-200 max-w-max-content',
        className,
      )}>
      {tabs?.map((tab) => {
        return (
          <button
            onClick={() => setActiveTab(tab.id)}
            key={tab.value}
            className={cn('text-lg', {
              'tab-line text-pink font-semibold': tab.value === active,
            })}>
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

export { TabsUnderline };
