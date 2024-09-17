'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Button, Input, Label, Textarea, Icons } from '@/components/shared';
import { cn } from '@/lib/utils';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  isLoading: boolean;
  onHandleSubmit: any;
  selectType?: any;
}

export function AmenityTypeForm({ className, ...props }: Props) {
  const { isLoading = false, onHandleSubmit } = props;

  const typeSchema = yup.object({
    name: yup.string().required('Type is required'),
    desc: yup.string().required('Description is required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ name: string; desc: string }>({
    resolver: yupResolver(typeSchema),
    mode: 'onBlur',
    defaultValues: {
      name: props?.selectType?.name || '',
      desc: props?.selectType?.desc || '',
    },
  });

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={handleSubmit(onHandleSubmit)} className="grid gap-6">
        <div className="grid gap-2">
          <Label className="" htmlFor="name">
            Name
          </Label>
          <Input
            id="name"
            placeholder="Name"
            type="text"
            {...register('name', { required: 'Please enter name' })}
            disabled={isLoading}
          />
          {errors.name ? <span className="text-red-500 text-xs">{errors.name.message}</span> : null}
        </div>
        <div className="grid gap-2">
          <Label className="" htmlFor="desc">
            Description
          </Label>
          <Textarea
            id="desc"
            placeholder="Description"
            rows={5}
            {...register('desc', { required: 'Please enter description' })}
            disabled={isLoading}
          />
          {errors.desc ? <span className="text-red-500 text-xs">{errors.desc.message}</span> : null}
        </div>

        <Button disabled={isLoading} variant={'default'}>
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Submit
        </Button>
      </form>
    </div>
  );
}
