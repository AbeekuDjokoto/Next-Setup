'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import {
  Button,
  Input,
  buttonVariants,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Icons,
} from '@/components/shared';
import { PERMISSIONS } from '@/utils';
import { cn } from '@/lib/utils';
interface Props {
  // eslint-disable-next-line no-unused-vars
  permissions: any[];
  onHandleSubmit: (...args: any) => any;
  isLoading: boolean;
  selectedAdmin?: any;
  edit?: boolean;
}

type ObjType = {
  firstName: z.ZodString;
  lastName: z.ZodString;
  email: z.ZodString;
  password: z.ZodString;
  permission: z.ZodString;
};

let obj: ObjType = {
  firstName: z
    .string()
    .min(2, {
      message: 'Name must be at least 2 characters.',
    })
    .max(30, {
      message: 'Name must not be longer than 30 characters.',
    }),
  lastName: z
    .string()
    .min(2, {
      message: 'Name must be at least 2 characters.',
    })
    .max(30, {
      message: 'Name must not be longer than 30 characters.',
    }),
  email: z.string().email('Provide a valid email address'),
  password: z.string(),
  permission: z.string({ required_error: 'Provide permission' }),
};

function InviteAdminForm({ permissions, isLoading, onHandleSubmit, selectedAdmin, edit }: Props) {
  const accountFormSchema = z.object(obj);
  type AccountFormValues = z.infer<typeof accountFormSchema>;

  const defaultValues: Partial<AccountFormValues> = {
    email: selectedAdmin?.email,
    firstName: selectedAdmin?.name?.split(' ')[0],
    lastName: selectedAdmin?.name?.split(' ')[1],
    password: '',
    permission: PERMISSIONS[0],
  };

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  });

  function onSubmit(data: AccountFormValues) {
    if (edit) {
      onHandleSubmit({ permissions: [data.permission] });
      return;
    }
    onHandleSubmit({ ...data, permissions: [data.permission] });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input placeholder="First name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input placeholder="Last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {!edit && (
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="permission"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Permission</FormLabel>
              <div className="relative w-full">
                <FormControl>
                  <select
                    className={cn(
                      buttonVariants({ variant: 'outline' }),
                      'w-full appearance-none bg-transparent font-normal',
                    )}
                    {...field}>
                    {permissions?.map((permission) => {
                      return (
                        <option key={permission} value={permission}>
                          {permission}
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

        <div className="flex justify-end">
          <Button disabled={isLoading} variant={'default'} type="submit" className="w-full mt-12">
            {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}

export { InviteAdminForm };
