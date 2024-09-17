'use client';
import CloseIcon from '@/public/assets/icons/circle-xmark-solid.svg';
import { RentIcon, SaleIcon } from '@/public/assets/icons';
import { useCreatePropertyStore } from '@/stores';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

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
  Label,
  RadioGroup,
  RadioGroupItem,
} from '@/components/shared';
import { cn } from '@/lib/utils';
import React from 'react';
import { useListingTypes } from '@/hooks/admin';
import { useForm } from 'react-hook-form';

interface Props {
  closeModal: () => void;
  openModal: (...args: any) => void;
  propertyTypes: any;
  setPropertyType: any;
}

const addPropertyFormSchema = z.object({
  propertyName: z
    .string({ required_error: 'Provide property name' })
    .min(1, 'Property name is required'),
  streetAddress: z
    .string({ required_error: 'Provide street address' })
    .min(1, 'Street address is required'),
  propertyType: z
    .string({ required_error: 'Provide property type' })
    .min(1, 'Property type is required'),
  leasing: z
    .string({
      required_error: 'Please select a listing',
    })
    .min(1, 'Listing is required'),
  unitNumber: z.string().optional(),
});

export function AddPropertyForm({ closeModal, openModal, propertyTypes, setPropertyType }: Props) {
  const { onAddProperty, leasing, listing, propertyType, unitNumber, propertyName, location } =
    useCreatePropertyStore();
  type AddPropertyFormValues = z.infer<typeof addPropertyFormSchema>;

  const defaultValues: Partial<AddPropertyFormValues> = React.useMemo(
    () => ({
      propertyName,
      leasing,
      propertyType,
      streetAddress: location?.street,
      unitNumber,
    }),
    [location],
  );

  const form = useForm<AddPropertyFormValues>({
    resolver: zodResolver(addPropertyFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  const LEASING_TYPES = [
    { id: 1, label: 'For Rent', value: 'FOR RENT', src: RentIcon },
    { id: 2, label: 'For Sale', value: 'FOR SALE', src: SaleIcon },
    { id: 3, label: 'Short Stays', value: 'SHORT STAY', src: SaleIcon },
  ];

  const { data: LISTING_TYPES } = useListingTypes();

  function onSubmit(data: AddPropertyFormValues) {
    setPropertyType({ slug: data.propertyType });
    onAddProperty(data);
    openModal('confirm-property-form');
  }

  // Callback version of watch.  It's your responsibility to unsubscribe when done.
  React.useEffect(() => {
    const subscription = form.watch((value) => onAddProperty(value));
    return () => subscription.unsubscribe();
  }, [form.watch]);

  return (
    <>
      <div className="bg-white rounded-md max-sm:w-[380px] sm:w-[550px] md:w-[650px] lg:w-[750px] max-h-[85vh] overflow-y-auto relative z-50 noscroll-indicator">
        <div className="flex justify-between items-center p-6 border border-b-gray-200 sticky top-0 bg-white">
          <h3 className="text-2xl font-bold">Property Manager</h3>
          <CloseIcon onClick={closeModal} className="cursor-pointer" />
        </div>

        <div className="grid gap-2 max-w-lg p-6">
          <h3 className="text-xl font-semibold">First, let's add your property</h3>
          <p className="">Once you add your property, you can list if for free on Ownkey.</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-8">
            <FormField
              control={form.control}
              name="leasing"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="font-semibold">Listing</FormLabel>
                  <FormMessage />
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex items-center max-w-md gap-4 pt-2">
                    {LEASING_TYPES?.map((type) => {
                      return (
                        <div key={type?.value}>
                          <RadioGroupItem
                            value={type.value}
                            id={type.value}
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor={type.value}
                            className="flex items-center gap-2 justify-between rounded-md border-2 border-muted bg-popover p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-blue-500 [&:has([data-state=checked])]:border-primary">
                            <type.src className="w-5 h-5" />
                            {type.label}
                          </Label>
                        </div>
                      );
                    })}
                  </RadioGroup>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="propertyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Property Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Property Name" {...field} />
                  </FormControl>
                  <FormDescription className="max-w-md">
                    You won't be able to edit the property name once you create the listing.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="streetAddress"
                defaultValue={location.street}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Street Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Address" {...field} disabled />
                    </FormControl>
                    <FormDescription className="max-w-md">
                      You won't be able to edit the street address once you create the listing.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="button" onClick={() => openModal('show-map')} className="w-max">
                Input street Address
              </Button>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="propertyType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Property Type</FormLabel>
                    <div className="relative w-full">
                      <FormControl className="h-12">
                        <select
                          className={cn('w-full h-10 rounded border border-gray-200')}
                          {...field}>
                          {[{ slug: '', name: 'Select Option...' }, ...propertyTypes]?.map(
                            (type: { slug: string; name: string }) => {
                              return (
                                <option key={type.slug} value={type.slug}>
                                  {type.name}
                                </option>
                              );
                            },
                          )}
                        </select>
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="unitNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Unit number(optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Number of units" type="number" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter apartment, suite, or unit number, if needed.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit" className="w-[150px]">
                Next
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
