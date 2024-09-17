'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import * as React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Button, Input, Label, Icons } from '@/components/shared';
import { cn } from '@/lib/utils';
import { Verify } from '@/types';
import { useParams, useSearchParams } from 'next/navigation';
import { useLoginUser, useVerifyOTP } from '@/hooks/user';
import { ResendOTP } from './ResendOTP';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  type: string;
  closeModal?: () => void;
  to?: string;
}
const verifySchema = yup.object({
  code: yup.string().required('Code is required'),
});

export function OTPVerificationForm({ className, type, closeModal, to }: Props) {
  const params = useParams();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const { verification_id } = params;
  const { verifyOTP, isLoading } = useVerifyOTP(type, to, closeModal);
  const { resendOTP } = useLoginUser(type, to);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Verify>({ resolver: yupResolver(verifySchema), mode: 'onBlur' });

  const onSubmit: SubmitHandler<Verify> = (data) => {
    const verify = {
      ...data,
      verification_id: verification_id ?? code,
    };

    verifyOTP(verify);
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
