'use client';

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Icons,
} from '@/components/shared';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import CloseIcon from '@/public/assets/icons/circle-xmark-solid.svg';

type Props = {
  closeModal: () => void;
  onChangeStatus: (...args: any) => void;
  isLoading: boolean;
};

const statusOptions = [
  { label: 'Sold', value: 'SOLD' },
  { label: 'Available', value: 'AVAILABLE' },
  { label: 'Taken', value: 'TAKEN' },
];

const schema = z.object({
  status: z.string({ required_error: 'Provide status' }).min(1, 'Status is required'),
});

type Schema = z.infer<typeof schema>;

export function ChangePropertyStatusForm({ closeModal, onChangeStatus, isLoading }: Props) {
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: { status: '' },
    mode: 'onChange',
  });

  const onSubmit = (data: Schema) => {
    onChangeStatus({ status: data.status });
  };
  return (
    <div className="bg-white p-4 min-w-[350px] max-w-[500px] w-full">
      <div className="flex flex-col gap-2 items-center w-full mb-6">
        <CloseIcon onClick={closeModal} className="cursor-pointer w-[20px] h-[20px] self-end" />
        <h2 className="text-2xl font-bold">Change status of property</h2>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Choose Status</FormLabel>
                <FormControl>
                  <select className={cn('w-full h-10 rounded border border-gray-200')} {...field}>
                    {[{ value: '', label: 'Select Option...' }, ...statusOptions]?.map(
                      (type: { label: string; value: string }) => {
                        return (
                          <option key={type.label} value={type.value}>
                            {type.label}
                          </option>
                        );
                      },
                    )}
                  </select>
                </FormControl>
                {/* <FormDescription className="max-w-md">
                  You won't be able to edit the property name once you create the listing.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-between gap-3 mt-8">
            <Button onClick={closeModal} variant="outline" className="grow">
              Cancel
            </Button>
            <Button className="grow">
              {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
