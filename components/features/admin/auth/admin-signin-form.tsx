'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Button, Input, Label, Icons } from '@/components/shared';
import { cn } from '@/lib/utils';
interface SignInFormProps extends React.HTMLAttributes<HTMLDivElement> {
  isLoading: boolean;
  onHandleSubmit: any;
}

export function AdminSignInForm({ className, ...props }: SignInFormProps) {
  const { isLoading, onHandleSubmit } = props;

  const signinSchema = yup.object({
    email: yup.string().email('Provide a valid email').required('Email is required'),
    password: yup.string().required('Password is required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string; password: string }>({
    resolver: yupResolver(signinSchema),
    mode: 'onBlur',
  });

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={handleSubmit(onHandleSubmit)}>
        <div className="grid gap-4">
          <Input
            id="email"
            label="Email or Phone"
            placeholder="email"
            type="email"
            {...register('email', { required: true })}
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            disabled={isLoading}
            error={errors.email?.message}
          />

          <Input
            id="password"
            label="Password"
            placeholder="password"
            type="password"
            {...register('password', { required: true })}
            autoCapitalize="none"
            autoCorrect="off"
            disabled={isLoading}
            error={errors.password?.message}
          />

          <Button disabled={isLoading}>
            {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Sign In
          </Button>
        </div>
      </form>
    </div>
  );
}
