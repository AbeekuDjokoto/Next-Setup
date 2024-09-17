'use client';

import React from 'react';

import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';
import { ErrorText } from '../ErrorText';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  label?: string;
  error?: string;
  isRequired?: boolean;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ id, label, error, type = 'text', className, isRequired, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    return (
      <div className={cn('grid gap-1', className)}>
        {label ? (
          <label className={cn(`text-sm font-medium`)} htmlFor={id}>
            {label}
            {isRequired && <span className="text-red-500"> *</span>}
          </label>
        ) : null}
        <div
          className={cn(
            'w-full px-2 py-1 flex justify-between items-center gap-4 border rounded--md',
            {
              'border-red-600': error,
            },
          )}>
          <input
            id={id}
            type={showPassword ? 'text' : type}
            className={cn('border-none outline-none focus:outline-none grow', {
              'cursor-not-allowed text-gray-500': props.disabled,
            })}
            {...props}
            ref={ref}
            onFocus={(e) =>
              e.target.addEventListener(
                'wheel',
                function (e) {
                  e.preventDefault();
                },
                { passive: false },
              )
            }
          />
          {type === 'password' && (
            <button
              className="text-gray-500"
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? <Eye /> : <EyeOff />}
            </button>
          )}
        </div>
        <ErrorText error={error ?? ''} />
      </div>
    );
  },
);
