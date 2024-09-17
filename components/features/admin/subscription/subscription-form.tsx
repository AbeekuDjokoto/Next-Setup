'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import * as z from 'zod';
import { cn } from '@/lib/utils';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Button,
  Input,
  Textarea,
  Icons,
} from '@/components/shared';

const subscriptionFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'name must be at least 2 characters.',
    })
    .max(30, {
      message: 'name must not be longer than 30 characters.',
    }),
  price: z.string({ required_error: 'Please enter price' }),
  listing: z.string({ required_error: 'Please enter number of listing' }),
  desc: z.string().max(160).min(4),
  benefits: z
    .array(
      z.object({
        value: z.string(),
      }),
    )
    .optional(),
});

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  isLoading: boolean;
  onHandleSubmit: any;
}

type SubscriptionFormValues = z.infer<typeof subscriptionFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<SubscriptionFormValues> = {};

export function SubscriptionForm({ isLoading, onHandleSubmit }: Props) {
  const form = useForm<SubscriptionFormValues>({
    resolver: zodResolver(subscriptionFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  const { fields, append } = useFieldArray({
    name: 'benefits',
    control: form.control,
  });

  function onSubmit(data: SubscriptionFormValues) {
    let benefits = getValueString(data.benefits);
    onHandleSubmit({ ...data, benefits, price: Number(data.price), listing: Number(data.listing) });
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
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input placeholder="price" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="listing"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Listings</FormLabel>
              <FormControl>
                <Input placeholder="listing" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="desc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit subscription"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`benefits.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && 'sr-only')}>Benefits</FormLabel>
                  <FormDescription className={cn(index !== 0 && 'sr-only')}>
                    Add benefits for opting into subscription
                  </FormDescription>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => append({ value: '' })}>
            Add Benefit
          </Button>
        </div>
        <Button disabled={isLoading} variant={'default'} className="w-full">
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Submit
        </Button>
      </form>
    </Form>
  );
}

function getValueString(data: any) {
  let arr = [];
  for (let item of data) {
    arr.push(item.value);
  }
  return arr;
}
