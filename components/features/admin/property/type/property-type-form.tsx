'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import {
  Button,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Label,
  buttonVariants,
  Icons,
} from '@/components/shared';
import { cn } from '@/lib/utils';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  isLoading: boolean;
  onHandleSubmit: any;
  selectedType?: any;
}

const MAIN_TYPES = [
  { label: 'RESIDENTIAL', value: 'RESIDENTIAL' },
  { label: 'COMMERCIAL', value: 'COMMERCIAL' },
  { label: 'LAND', value: 'LAND' },
];

export function PropertyTypeForm({ className, ...props }: Props) {
  const { isLoading, onHandleSubmit } = props;

  const typeSchema = yup.object({
    name: yup.string().required('Type is required'),
    main_type: yup.string().required('Main Type is required'),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<{ name: string; main_type: string }>({
    resolver: yupResolver(typeSchema),
    mode: 'onBlur',
    defaultValues: {
      name: props?.selectedType?.name || '',
      main_type: props?.selectedType?.main_type ?? '',
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

        <Controller
          control={control}
          name="main_type"
          defaultValue={props?.selectedType?.main_type ?? MAIN_TYPES[0]}
          render={({ field }) => (
            <div>
              <label>Main Type</label>
              <div className="relative w-full">
                <select
                  className={cn(
                    buttonVariants({ variant: 'outline' }),
                    'w-full appearance-none bg-transparent font-normal',
                  )}
                  {...field}>
                  {[{ label: 'Select Main Type', value: '' }, ...MAIN_TYPES]?.map((meta) => {
                    return (
                      <option key={meta.value} value={meta.value}>
                        {meta.label}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          )}
        />

        <Button disabled={isLoading} variant={'default'}>
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Submit
        </Button>
      </form>
    </div>
  );
}
