import { cn } from '@/lib/utils';
import React from 'react';

interface PropertyLabelProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const PropertyLabel = React.forwardRef<HTMLButtonElement, PropertyLabelProps>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      {...props}
      className={cn(
        'py-2 px-4 bg-white max-w-max-content rounded flex items-center gap-2 border border-blue-900 text-sm',
        className,
      )}></button>
  ),
);
