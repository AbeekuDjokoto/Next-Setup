import React from 'react';

interface DebouncedStateOptions<T> {
  initialValue: T;
  debounceTime?: number;
  onChange: (value: T) => void;
}

export function useDebounced<T>({
  initialValue,
  debounceTime = 500,
  onChange,
}: DebouncedStateOptions<T>) {
  const timeoutRef = React.useRef<any>(null);
  const [value, setValue] = React.useState<T>(initialValue);

  const updateOutside = React.useCallback(
    (newValue: T) => {
      clearTimeout(timeoutRef.current!);
      timeoutRef.current = setTimeout(() => {
        onChange(newValue);
      }, debounceTime);
    },
    [debounceTime, onChange],
  );

  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const newValue = event.target.value as T;
    setValue(newValue);
    updateOutside(newValue);
  }

  return {
    value,
    onChangeHandler,
  };
}
