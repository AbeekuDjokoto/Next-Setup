'use client';
import {
  Button,
  Checkbox,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
  Icons,
} from '@/components/shared';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const announcementFormSchema = z.object({
  title: z.string().min(2, {
    message: 'Title must be at least 2 characters.',
  }),
  body: z.string({ required_error: 'Please provide body' }),
  // users: z.array(z.string()).optional(),
});

type AnnouncementFormValues = z.infer<typeof announcementFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<AnnouncementFormValues> = {
  // users: [],
};

interface Props {
  closeModal: (...args: any) => void;
  isLoading: boolean;
  userId: string | string[];
  onHandleSubmit: (...args: any) => void;
  isMain?: boolean;
}

export function AnnouncementForm({ closeModal, isLoading, userId, onHandleSubmit, isMain }: Props) {
  const [share, setShare] = React.useState('');
  const items = [
    { label: 'Users', id: 'USERS' },
    { label: 'Hosts', id: 'HOSTS' },
    { label: 'Free Subscription', id: 'FREE' },
    { label: 'Pro Subscription', id: 'PRO' },
    { label: 'Executive Subscription', id: 'EXECUTIVE' },
  ];
  const form = useForm<AnnouncementFormValues>({
    resolver: zodResolver(announcementFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  function onHandleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setShare(e.target.value);
  }

  function onSubmit(data: AnnouncementFormValues) {
    let sendObj = { ...data, user: Number(userId) };
    onHandleSubmit(sendObj);
  }
  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-sm">Title</FormLabel>
                <FormControl>
                  <Input placeholder="title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-sm">Body</FormLabel>
                <FormControl>
                  <Textarea placeholder="content" {...field} rows={8} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <>
            {isMain && (
              <div className="grid gap-8">
                <select
                  name="share"
                  id="share"
                  onChange={onHandleChange}
                  className="px-2 py-4 w-max bg-gray-100 rounded">
                  <option value="everyone">Share with Everyone</option>
                  <option value="specific-users">Share with Specific Users</option>
                </select>

                {/* {share === 'specific-users' && (
                  <div className="grid gap-4">
                    <FormField
                      control={form.control}
                      name="users"
                      render={() => (
                        <FormItem>
                          <div className="mb-4">
                            <FormLabel className="font-semibold text-sm">
                              Select specific users
                            </FormLabel>
                            <FormDescription className="text-xs text-gray-500">
                              Select the users you want to send notifications to.
                            </FormDescription>
                          </div>
                          {items.map((item) => (
                            <FormField
                              key={item.id}
                              control={form.control}
                              name="users"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={item.id}
                                    className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, item.id])
                                            : field.onChange(
                                                field.value?.filter((value) => value !== item.id),
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">{item.label}</FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )} */}
              </div>
            )}
          </>

          <div className="flex justify-end items-center gap-2">
            <Button onClick={closeModal} type="button" variant="outline">
              Cancel
            </Button>
            <Button disabled={isLoading} variant={'default'}>
              {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
