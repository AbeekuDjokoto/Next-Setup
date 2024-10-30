import React from 'react';

import { cn } from '@/libs';
import { IconNames } from '@/types';
import { toKebabCase } from '@/utils/helpers';

type Props = React.ComponentProps<'svg'> & Readonly<{ className?: string; name: IconNames }>;
type IconModules = Record<string, { default: React.FC }>;

const modules = import.meta.glob('@/assets/icons/*.svg', {
  eager: true,
}) as IconModules;

export function Icon({ className, name, ...otherProps }: Props) {
  const Icon = React.useMemo(
    () => modules[`/src/assets/icons/${toKebabCase(name)}.svg`]?.default,
    [name],
  );

  return (
    <span className={cn(className)} data-testid={`icon-${name}`}>
      {Icon ? <Icon {...otherProps} /> : null}
    </span>
  );
}
