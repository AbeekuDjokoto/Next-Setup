'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import * as React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Button, Input, Icons } from '@/components/shared';
import { cn } from '@/lib/utils';
import { useForgotPassword } from '@/hooks/user';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  type: string;
}

export function ForgotPasswordForm({ className, type }: Props) {
  const forgotPasswordSchema = yup.object({
    email: yup.string().email('Provide a valid email').required('Email is required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>({ resolver: yupResolver(forgotPasswordSchema), mode: 'onBlur' });

  const { forgotPassword, isLoading } = useForgotPassword(type);

  const onSubmit: SubmitHandler<{ email: string }> = (data) => {
    forgotPassword(data.email);
  };
  return (
    <div className={cn('grid gap-6', className)}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <Input
            id="Enter your email"
            label="Email"
            placeholder="email"
            type="email"
            {...register('email')}
            isRequired
            disabled={isLoading}
            error={errors?.email?.message}
          />

          <Button disabled={isLoading}>
            {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
