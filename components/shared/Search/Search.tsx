import { useDebounced } from '@/hooks/shared';
import { cn } from '@/lib/utils';
import { SearchIcon } from 'lucide-react';

interface Props {
  value: string;
  onChange: (value: string) => void;
  debounceTime?: number;
  inputClassName?: string;
}
type InputProps = React.ComponentProps<'input'>;
type SearchInputProps = Readonly<Omit<InputProps, 'onChange'> & Props>;

export function Search({
  placeholder = 'Search...',
  value,
  onChange,
  debounceTime = 400,
  inputClassName,
  className,
  ...rest
}: SearchInputProps) {
  const { value: innerValue, onChangeHandler } = useDebounced<string>({
    initialValue: value,
    onChange,
    debounceTime,
  });

  return (
    <div
      className={cn(
        'bg-white rounded-md px-2 py-1 flex items-center gap-2 group border border-[#ECEDEE] focus-within:border-blue-900 w-full',
        className,
      )}>
      <SearchIcon className="text-gray-400" />
      <input
        type="text"
        value={innerValue}
        onChange={onChangeHandler}
        placeholder={placeholder}
        className={cn('w-full h-full border-none focus:outline-none outline-none', inputClassName)}
        {...rest}
      />
    </div>
  );
}
