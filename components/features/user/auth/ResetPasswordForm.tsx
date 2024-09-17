'use client';

import React from 'react';
import * as yup from 'yup';
import { useParams } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button, Input, Icons } from '@/components/shared';
import { cn } from '@/lib/utils';
import { ResetPasswordInputs } from '@/types';
import { useResetPassword } from '@/hooks/user';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  type: string;
}

const resetPasswordSchema = yup.object({
  password: yup.string().required('Provide a new password'),
  code: yup.string().required('Reset code is required'),
});

export function ResetPasswordForm({ className, type }: Props) {
  const params = useParams();
  const { reset_id } = params;
  const { resetPassword, isLoading } = useResetPassword(type);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInputs>({ resolver: yupResolver(resetPasswordSchema), mode: 'onBlur' });

  const onSubmit: SubmitHandler<ResetPasswordInputs> = (data) => {
    delete data.confirmPassword;
    data.key = reset_id;
    resetPassword(data);
  };

  return (
    <div className={cn('grid gap-6', className)}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <Input
            id="new-password"
            label="Reset Code"
            placeholder="Reset Code"
            type="text"
            {...register('code', { required: true })}
            isRequired
            error={errors?.code?.message}
            disabled={isLoading}
          />

          <Input
            id="new-password"
            label="New Password"
            placeholder="new password"
            type="password"
            {...register('password', { required: true })}
            disabled={isLoading}
            error={errors?.password?.message}
            isRequired
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
