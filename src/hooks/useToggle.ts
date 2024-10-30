import React from 'react';

type DefaultReturn = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
};

function capitalizeString<T extends string>(str: T) {
  return (str.charAt(0).toUpperCase() + str.slice(1)) as Capitalize<T>;
}

type ToggleNameReturnValueKeys<TName extends string> =
  | `is${Capitalize<TName>}Open`
  | `on${Capitalize<TName>}Open`
  | `on${Capitalize<TName>}Close`
  | `on${Capitalize<TName>}Toggle`;

type ReturnWithToggleName<TName extends string> = {
  [key in ToggleNameReturnValueKeys<TName>]: key extends `is${Capitalize<TName>}Open`
    ? DefaultReturn['isOpen']
    : key extends `on${Capitalize<TName>}Open`
      ? DefaultReturn['onOpen']
      : key extends `on${Capitalize<TName>}Close`
        ? DefaultReturn['onClose']
        : key extends `on${Capitalize<TName>}Toggle`
          ? DefaultReturn['onToggle']
          : never;
};

/**
 * This hook provides grouped functionality for toggling a state
 * @param toggleName - CamelCased/PascalCased name of the toggle
 */
export function useToggle<TName extends string>(_toggleName: TName): ReturnWithToggleName<TName>;
export function useToggle(): DefaultReturn;
export function useToggle<TName extends string | undefined>(
  toggleName?: TName,
  { defaultIsOpen } = { defaultIsOpen: false },
): any {
  const [isOpen, setIsOpen] = React.useState(defaultIsOpen);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const onToggle = (open?: boolean) => setIsOpen(open ?? !isOpen);

  if (!toggleName)
    return {
      isOpen,
      onOpen,
      onClose,
      onToggle,
    } as any;

  return {
    [`is${capitalizeString(toggleName)}Open`]: isOpen,
    [`on${capitalizeString(toggleName)}Open`]: onOpen,
    [`on${capitalizeString(toggleName)}Close`]: onClose,
    [`on${capitalizeString(toggleName)}Toggle`]: onToggle,
  } as any;
}
