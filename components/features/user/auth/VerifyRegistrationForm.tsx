'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import * as React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Button, Input, Icons } from '@/components/shared';
import { cn } from '@/lib/utils';
import { Verify } from '@/types';
import { useParams } from 'next/navigation';
import { useRegisterUser, useVerifyUser } from '@/hooks/user';
import { ResendOTP } from './ResendOTP';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  type: string;
}
const verifySchema = yup.object({
  code: yup.string().required('Code is required'),
});

export function VerifyRegistrationForm({ className, type }: Props) {
  const params = useParams();
  const { verification_id } = params;
  const { verifyUser, isLoading } = useVerifyUser(type);
  const { resendOTP } = useRegisterUser(type);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Verify>({ resolver: yupResolver(verifySchema), mode: 'onBlur' });

  const onSubmit: SubmitHandler<Verify> = (data) => {
    const verify = {
      ...data,
      verification_id,
    };

    verifyUser(verify);
  };

  return (
    <div className={cn('grid gap-6', className)}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <Input
            id="code"
            label="Verify"
            placeholder="code"
            type="text"
            {...register('code')}
            isRequired
            error={errors?.code?.message}
            disabled={isLoading}
          />

          <ResendOTP resendFn={resendOTP} resendBtnText="Resend" />

          <Button disabled={isLoading} variant={'pink'}>
            {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
