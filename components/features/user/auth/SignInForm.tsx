'use client';
import { SubmitHandler, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import React from 'react';
import * as yup from 'yup';

import { Button, Input, Icons } from '@/components/shared';
import { cn } from '@/lib/utils';
import { useLoginUser } from '@/hooks/user';
import { ROUTES } from '@/utils';
interface SignInFormProps extends React.HTMLAttributes<HTMLDivElement> {
  type: string;
  to?: string;
  openModal?: () => void;
}

type SigninSchemaType = {
  field: string;
};
export function SignInForm({ className, type, to, openModal }: SignInFormProps) {
  const signinSchema = yup.object({
    field: yup.string().required('Field is required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninSchemaType>({ resolver: yupResolver(signinSchema), mode: 'onBlur' });

  const { login, isLoading } = useLoginUser(type, to, openModal);

  const onSubmit: SubmitHandler<SigninSchemaType> = (data) => {
    if (validateEmail(data.field)) {
      login({ email: data.field });
    } else {
      login({ phone: data.field });
    }
  };

  return (
    <div className={cn('grid gap-6', className)}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <Input
            id="field"
            label="Email or Phone"
            placeholder="Email or Phone"
            type="text"
            {...register('field', { required: true })}
            disabled={isLoading}
            isRequired
            error={errors?.field?.message}
          />

          <div className="grid">
            <Button disabled={isLoading} variant={"pink"}>
              {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
              Send Verification Code
            </Button>
            {type === 'client' ? (
              <div className="flex items-center gap-1 mt-2 text-sm">
                <p>New to Ownkey?</p>
                <Link
                  href={ROUTES.USER.CLIENT.AUTH.CREATE_ACCOUNT}
                  className="underline hover:text-pink">
                  Get Started
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </form>
      {/* <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <div className="flex gap-2 justify-center">
        <Button variant="outline" type="button" disabled={isLoading}>
          <Icons.google className="mr-2 h-4 w-4" />
          Google
        </Button>
        <Button variant="outline" type="button" disabled={isLoading}>
          <Icons.apple className="mr-2 h-4 w-4" />
          Apple
        </Button>
      </div> */}
    </div>
  );
}

function validateEmail(email: string) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
