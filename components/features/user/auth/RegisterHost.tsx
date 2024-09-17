'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as z from 'zod';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Icons,
  Button,
  Input,
  Label,
  RadioGroup,
  RadioGroupItem,
  Textarea,
} from '@/components/shared';

import { useRegisterHost } from '@/hooks/user';

interface Item {
  label: string;
  value: string;
  desc: string;
}

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  hostTypes: Item[];
}

const registerHostFormSchema = z.object({
  type: z.string({
    required_error: 'Please select a host type',
  }),
});

type RegisterHostFormValues = z.infer<typeof registerHostFormSchema>;
export function RegisterHostForm({ hostTypes }: Props) {
  const form = useForm<RegisterHostFormValues>({
    resolver: zodResolver(registerHostFormSchema),
  });
  const { isLoading, registerHost } = useRegisterHost();

  const onSubmit: SubmitHandler<RegisterHostFormValues> = (data) => {
    registerHost(data);
  };

  return (
    <div className="w-full max-w-md px-6 m-auto">
      <div className="">
        <h1 className="text-2xl font-semibold ">Tell us about yourself</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
          {/* <FormField
            control={form.control}
            name="work"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input label="Work" placeholder="Your occupation" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}

          {/* <Controller
            name={'phone'}
            control={form.control}
            render={({ field: { onChange, value } }) => {
              return (
                <PhoneInput
                  handleChange={(val: string) => onChange(val)}
                  label={'Phone Number'}
                  selectedVal={value}
                  error={form?.formState?.errors?.phone?.message}
                  isRequired
                />
              );
            }}
          /> */}
          {/* <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input label="Address" placeholder="Your address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          {/* <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input label={`Company (if any)`} placeholder="company name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="font-medium">
                  Host Type <span className="text-red-500">*</span>
                </FormLabel>
                <FormDescription>What best describes why you are here today?</FormDescription>
                <FormMessage />
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex gap-2 flex-wrap">
                  {hostTypes?.map((type) => {
                    return (
                      <div key={type?.value} className="relative group">
                        <RadioGroupItem
                          value={type.value}
                          id={type.value}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={type.value}
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover w-[150px] py-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-blue-500 [&:has([data-state=checked])]:border-primary">
                          {type.label}
                        </Label>

                        <div className="p-4 hidden absolute bottom-[50px] text-sm text-gray-500 rounded-lg shadow-lg left-0 right-0 bg-white place-items-center group-hover:grid">
                          {type.desc}
                        </div>
                      </div>
                    );
                  })}
                </RadioGroup>
              </FormItem>
            )}
          />
          {/* 
          <>
            {form?.watch('type')?.startsWith('realtor') && (
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Experience</FormLabel>
                      <FormControl>
                        <Input placeholder="Experience" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid gap-2">
                  <Label>Commission</Label>
                  <div className="grid gap-4 lg:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="rate.rent"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Rent Rate" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="rate.sale"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Sale Rate" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            )}
          </> */}

          {/* <FormField
            control={form.control}
            name="about"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium">
                  Bio <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea placeholder="A short Bio" {...field} rows={5} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}

          <Button type="submit" disabled={isLoading} variant={"pink"}>
            {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
