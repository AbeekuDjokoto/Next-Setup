import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/shared';
import Dots from '@/public/assets/icons/three-dots-vertical.svg';

export function ActionDowndown({
  dropdownActions,
  action,
  id,
  obj,
}: {
  dropdownActions: any;
  action: any;
  id: any;
  obj?: any;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <div>
          <span className="sr-only">Actions</span>
          <Dots />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(dropdownActions).map(([key]) => {
          return (
            <DropdownMenuItem
              key={key}
              onSelect={() => action({ action: key, id, obj })}
              className="capitalize">
              {key}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
