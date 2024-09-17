'use client';

import React from 'react';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Icons,
  Textarea,
} from '@/components/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

interface Props {
  closeModal: any;
  isLoading?: boolean;
  onHandleSubmit: (action: 'ACCEPTED' | 'REJECTED', reason?: string) => void;
}

const rejectPropertyFormSchema = z.object({
  reason: z.string({ required_error: 'Please reason' }),
});

type RejectPropertyFormValues = z.infer<typeof rejectPropertyFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<RejectPropertyFormValues> = {};

export function DeletePromptReason({ closeModal, onHandleSubmit, isLoading }: Props) {
  const form = useForm<RejectPropertyFormValues>({
    resolver: zodResolver(rejectPropertyFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  function onSubmit(data: RejectPropertyFormValues) {
    onHandleSubmit('REJECTED', data.reason);
    closeModal();
  }
  return (
    <div className="grid gap-6 p-6 bg-white rounded-md w-[380px] md:w-[550px]">
      <div className="grid gap-2">
        <h2 className="text-xl font-bold">Are you sure?</h2>
        <p className="text-gray-500">This action will delete this resource</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
          <FormField
            control={form.control}
            name="reason"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-sm">Reason</FormLabel>
                <FormControl>
                  <Textarea placeholder="write your reason" {...field} rows={4} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end items-center gap-2">
            <Button type="button" onClick={closeModal} variant={'outline'}>
              Cancel
            </Button>
            <Button type="submit" variant={'destructive'}>
              {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
