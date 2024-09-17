'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Button, buttonVariants, Input, Label, Icons } from '@/components/shared';
import { cn } from '@/lib/utils';

interface Inputs {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
interface SignInFormProps extends React.HTMLAttributes<HTMLDivElement> {
  isLoading: boolean;
  onHandleSubmit: any;
}

function ChangePassword({ className, ...props }: SignInFormProps) {
  const { isLoading, onHandleSubmit } = props;

  const changePasswordSchema = yup.object({
    currentPassword: yup.string().required('Password is required'),
    newPassword: yup.string().required('New Password is required'),
    confirmPassword: yup.string().required('Confirm Password is required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(changePasswordSchema), mode: 'onBlur' });

  return (
    <div className={cn('grid gap-6 py-6 w-full max-w-lg', className)} {...props}>
      <h1 className="font-bold text-2xl">Change Password</h1>
      <form onSubmit={handleSubmit(onHandleSubmit)}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="currentPassword" className="font-medium">
              Current Password
            </Label>
            <Input
              id="currentPassword"
              type="password"
              {...register('currentPassword', { required: true })}
              disabled={isLoading}
            />
            {errors.currentPassword ? (
              <span className="text-red-500 text-[12px]">{errors.currentPassword.message}</span>
            ) : null}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="newPassword" className="font-medium">
              New Password
            </Label>
            <Input
              id="newPassword"
              placeholder="password"
              type="password"
              {...register('newPassword', { required: true })}
              disabled={isLoading}
            />
            {errors.newPassword ? (
              <span className="text-red-500 text-[12px]">{errors.newPassword?.message}</span>
            ) : null}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="currentPassword" className="font-medium">
              Confirm Password
            </Label>
            <Input
              id="currentPassword"
              type="password"
              {...register('currentPassword', { required: true })}
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
            />
            {errors.currentPassword ? (
              <span className="text-red-500 text-[12px]">{errors.currentPassword?.message}</span>
            ) : null}
          </div>

          <Button disabled={isLoading}>
            {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Change Password
          </Button>

          <Link href="/auth/password-reset" className={cn(buttonVariants({ variant: 'link' }), '')}>
            Forgot your password?
          </Link>
        </div>
      </form>
    </div>
  );
}

export { ChangePassword };
