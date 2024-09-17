'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronDown } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Button,
  buttonVariants,
  Icons,
  Input,
} from '@/components/shared';
import { cn } from '@/lib/utils';
import { AMENITY_META } from '@/utils';

const amenityFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(30, {
      message: 'Username must not be longer than 30 characters.',
    }),
  type: z.string(),
  meta: z.string().max(160).optional(),
});

type AmenityFormValues = z.infer<typeof amenityFormSchema>;
interface Props {
  amenity?: any;
  amenityTypes: any[];
  onHandleSubmit: any;
  isLoading: boolean;
}

export function AmenityForm({ amenity = {}, amenityTypes, onHandleSubmit, isLoading }: Props) {
  // This can come from your database or API.
  const defaultValues: Partial<AmenityFormValues> = {
    ...amenity,
  };
  const form = useForm<AmenityFormValues>({
    resolver: zodResolver(amenityFormSchema),
    defaultValues,
    mode: 'onSubmit',
  });

  function onSubmit(data: AmenityFormValues) {
    onHandleSubmit(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="name" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="meta"
          defaultValue="TEXT"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meta</FormLabel>
              <div className="relative w-full">
                <FormControl>
                  <select
                    className={cn(
                      buttonVariants({ variant: 'outline' }),
                      'w-full appearance-none bg-transparent font-normal',
                    )}
                    {...field}>
                    {AMENITY_META?.map((meta: string) => {
                      return (
                        <option key={meta} value={meta}>
                          {meta}
                        </option>
                      );
                    })}
                  </select>
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          defaultValue={amenityTypes && amenityTypes.length > 0 && amenityTypes[0].value}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amenity type</FormLabel>
              <div className="relative w-full">
                <FormControl>
                  <select
                    className={cn(
                      buttonVariants({ variant: 'outline' }),
                      'w-full appearance-none bg-transparent font-normal focus:outline-none',
                    )}
                    {...field}>
                    {amenityTypes?.map((type: { label: string; value: string }) => {
                      return (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      );
                    })}
                  </select>
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isLoading} variant={'default'} type="submit" className="w-full mt-12">
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Submit
        </Button>
      </form>
    </Form>
  );
}
