import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const statusVariants = cva(
  'inline-flex items-center justify-center rounded-md text-xs font-medium border capitalize',
  {
    variants: {
      variant: {
        default: 'bg-gray-100 text-gray-700 border-gray-500',
        destructive: 'bg-red-100 text-red-500 border-red-500',
        success: 'text-green-500 bg-green-100 border-green-500',
        progress: 'bg-yellow-100 text-yellow-500 border-yellow-500',
        active: 'bg-blue-100 text-white border-blue-500',
      },
      size: {
        default: 'px-3 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusVariants> {
  asChild?: boolean;
}

const StatusTag = React.forwardRef<HTMLDivElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }) => {
    const Comp = asChild ? Slot : 'div';
    return <Comp className={cn(statusVariants({ variant, size, className }))} {...props} />;
  },
);
StatusTag.displayName = 'StatusTag';

export { StatusTag };
