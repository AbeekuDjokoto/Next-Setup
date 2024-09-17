'use client';

import { Button, Icons, Input, PhoneInput } from '@/components/shared';
import { useRegisterUser } from '@/hooks/user';
import { cn } from '@/lib/utils';
import { RegisterCredentials } from '@/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import * as React from 'react';
import * as yup from 'yup';

interface SignUpFormProps extends React.HTMLAttributes<HTMLDivElement> {
  type: string;
}

const signUpSchema = yup.object({
  firstname: yup.string().required('First Name is required'),
  lastname: yup.string().required('Last Name is required'),
  email: yup.string().email('Provide a valid email').required('Email is required'),
  // password: yup.string().required('Password is required'),
  phone: yup.string(),
});

export function SignUpForm({ className, type }: SignUpFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterCredentials>({ resolver: yupResolver(signUpSchema), mode: 'onBlur' });

  const { registerUser, isLoading } = useRegisterUser(type);

  const onSubmit: SubmitHandler<RegisterCredentials> = (data) => {
    registerUser(data);
  };

  return (
    <div className={cn('grid gap-6', className)}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <Input
            label="First Name"
            id="firstName"
            type="text"
            placeholder="First Name"
            {...register('firstname', { required: true })}
            disabled={isLoading}
            error={errors?.firstname?.message}
            isRequired
          />

          <Input
            label="Last Name"
            id="lastName"
            type="text"
            placeholder="Last Name"
            {...register('lastname')}
            disabled={isLoading}
            error={errors?.lastname?.message}
            isRequired
          />

          <Input
            id="email"
            label="Email"
            placeholder="email"
            type="email"
            {...register('email')}
            disabled={isLoading}
            error={errors?.email?.message}
            isRequired
          />

          <Controller
            name={'phone'}
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <PhoneInput
                  handleChange={(val: string) => onChange(val)}
                  label={'Phone Number'}
                  selectedVal={value}
                  error={errors?.phone?.message}
                  isRequired
                />
              );
            }}
          />

          <Button disabled={isLoading} variant={'pink'}>
            {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Create Account
          </Button>
        </div>
      </form>
      {/* <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div> */}
      {/* <div className="flex gap-2 justify-center">
        <Link href={`${CONFIG.NEXT_PUBLIC_API_BASE_URL}/v1/auth/google`}>
          <Button variant="outline" type="button" disabled={isLoading}>
            <Icons.google className="mr-2 h-4 w-4" />
            Google
          </Button>
        </Link>
        <Button variant="outline" type="button" disabled={isLoading}>
          <Icons.apple className="mr-2 h-4 w-4" />
          Apple
        </Button>
      </div> */}
    </div>
  );
}
