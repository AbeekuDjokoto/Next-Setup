'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Accordion,
  Button,
  Checkbox,
  Icons,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/shared';

import CloseIcon from '@/public/assets/icons/circle-xmark-solid.svg';
import React from 'react';

interface Props {
  closeModal: (...any: any) => any;
  defaultAmenities: { slug: string; name: string; meta: string }[];
  isLoading: boolean;
  selectType?: any;
  amenityList: any;
  onAddAmenityToType: any;
}

const addAmenityFormSchema = z.object({
  data: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one item.',
  }),
});

type AddAmenityFormValues = z.infer<typeof addAmenityFormSchema>;

function getAmenities(arr: { slug: string; name: string; meta: string }[]) {
  let outArr: string[] = [];
  if (!arr) return outArr;
  for (let item of arr) {
    if (item) {
      outArr.push(item.slug);
    }
  }
  return outArr;
}

export function AddAmenityToType({
  isLoading,
  closeModal,
  selectType,
  amenityList,
  onAddAmenityToType,
  defaultAmenities,
}: Props) {
  const defaultValues: Partial<AddAmenityFormValues> = {
    data: [...getAmenities(defaultAmenities)],
  };
  const form = useForm<AddAmenityFormValues>({
    resolver: zodResolver(addAmenityFormSchema),
    defaultValues,
  });

  function onSubmit(data: AddAmenityFormValues) {
    onAddAmenityToType(data);
  }

  React.useEffect(() => {
    if (defaultAmenities.length > 0) {
      form.reset({
        data: [...getAmenities(defaultAmenities)],
      });
    }
  }, [defaultAmenities.length]);

  return (
    <div className="grid gap-8 bg-white rounded-md w-[750px] max-w-[90%] max-h-[75vh] p-6 overflow-y-auto noscroll-indicator">
      <div className="flex justify-between items-center ">
        <h2 className="font-medium text-2xl">
          Assign Default Amenities To Type <strong className="font-bold">{selectType?.name}</strong>
        </h2>
        <CloseIcon onClick={closeModal} className="cursor-pointer w-[20px] h-[20px]" />
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="data"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-lg font-bold">Amenities</FormLabel>
                  <FormDescription>
                    Select the Amenities you want to add to{' '}
                    <strong className="text-black">{selectType?.name} </strong>
                    Property Type.
                  </FormDescription>
                </div>
                <>
                  {Array.from(groupAmenities(amenityList)).map(([category, items]) => (
                    <Accordion key={category} id={category} title={category} plus>
                      <div className="grid gap-4 sm:grid-cols-2">
                        {items.map((item: { slug: string; name: string }) => (
                          <FormField
                            key={item.slug}
                            control={form.control}
                            name="data"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={item.slug}
                                  className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item.slug)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, item.slug])
                                          : field.onChange(
                                              field.value?.filter((value) => value !== item.slug),
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">{item.name}</FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>
                    </Accordion>
                  ))}
                </>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={isLoading}>
            {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Update Property Type
          </Button>
        </form>
      </Form>
    </div>
  );
}

function groupAmenities(amenities: any) {
  const obj = new Map();
  for (let item of amenities) {
    if (obj.has(item?.type?.desc)) {
      obj.set(item?.type?.desc, [...obj.get(item?.type?.desc), item]);
    } else {
      obj.set(item?.type?.desc, [item]);
    }
  }

  return obj;
}
