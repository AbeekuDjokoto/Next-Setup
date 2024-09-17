'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';

import { Button, Input, Label, Textarea, Icons } from '@/components/shared';
import { cn } from '@/lib/utils';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  isLoading: boolean;
  onHandleSubmit: any;
  selectType?: any;
}

const hostTypeSchema = z.object({
  name: z.string().min(1, 'Host Type is required'),
  desc: z.string(),
});
type HostTypeValues = z.infer<typeof hostTypeSchema>;

export function HostTypeForm({ className, ...props }: Props) {
  const { isLoading, onHandleSubmit } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HostTypeValues>({
    resolver: zodResolver(hostTypeSchema),
    mode: 'onBlur',
    defaultValues: {
      name: props?.selectType?.name,
      desc: props?.selectType?.desc,
    },
  });

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={handleSubmit(onHandleSubmit)} className="grid gap-4">
        <div className="grid gap-2">
          <Label className="" htmlFor="hostType">
            Type
          </Label>
          <Input
            id="hostType"
            placeholder="type"
            type="text"
            {...register('name')}
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
            {...register('desc')}
            disabled={isLoading}
          />
        </div>

        <Button disabled={isLoading} variant={'default'}>
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Submit
        </Button>
      </form>
    </div>
  );
}
