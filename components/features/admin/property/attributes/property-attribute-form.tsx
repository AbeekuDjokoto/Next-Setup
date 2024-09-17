'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Button, Input, Label, Icons } from '@/components/shared';
import { cn } from '@/lib/utils';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  isLoading: boolean;
  onHandleSubmit: any;
  selectedType?: any;
}

export function PropertyAttributeForm({ className, ...props }: Props) {
  const { isLoading, onHandleSubmit } = props;

  const listingTypeSchema = yup.object({
    name: yup.string().required('Name is required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ name: string }>({
    resolver: yupResolver(listingTypeSchema),
    mode: 'onBlur',
    defaultValues: {
      name: props?.selectedType?.name || '',
    },
  });

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={handleSubmit(onHandleSubmit)} className="grid gap-4">
        <div className="grid gap-2">
          <Label className="" htmlFor="name">
            Name
          </Label>
          <Input
            id="name"
            placeholder="name"
            type="text"
            {...register('name', { required: 'Please enter name' })}
            disabled={isLoading}
          />
          {errors.name ? <span className="text-red-500 text-xs">{errors.name.message}</span> : null}
        </div>

        <Button disabled={isLoading} variant={'default'}>
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Submit
        </Button>
      </form>
    </div>
  );
}
