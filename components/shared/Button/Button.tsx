import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-blue-900 text-white hover:bg-blue-800',
        destructive: 'bg-red-500 text-white hover:bg-red-600',
        pink: 'bg-pink text-white hover:bg-pink',
        outline: 'border border-[#CDD3D3] bg-white hover:bg-gray-100',
        ghost: 'hover:bg-transparent hover:text-black',
        link: 'text-black hover:underline',
        white: 'bg-white text-red-500',
      },
      size: {
        default: 'h-12 px-4 py-2 rounded-md',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-14 rounded-md px-4 py-2',
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
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
