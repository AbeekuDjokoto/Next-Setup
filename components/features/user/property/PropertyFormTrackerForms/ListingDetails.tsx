'use client';

import { useListingTypes, usePropertyAttributes } from '@/hooks/admin';
import { MultiSelect } from 'react-multi-select-component';

import { Input, Label } from '@/components/shared';
import { cn } from '@/lib/utils';
import { PropertyType } from '@/types';
import React from 'react';
import { Controller } from 'react-hook-form';
import { useToastify } from '@/hooks';

const listingDetailsData: any = {
  FOR_RENT: [
    {
      slug: 'price',
      name: 'Monthly Rent',
      meta: 'number',
      desc: 'How much is the monthly rent?',
    },
    {
      slug: 'securityDeposit',
      name: 'Down Payment',
      meta: 'number',
      desc: 'How much is the security deposit(Down payment)?',
    },
    {
      slug: 'availableDate',
      name: 'Date available',
      meta: 'date',
      desc: 'When is the property available to rent?',
    },
  ],
  FOR_SALE: [
    {
      slug: 'price',
      name: 'Price',
      meta: 'number',
      desc: 'What is the price of the Property?',
    },
    {
      slug: 'availableDate',
      name: 'Date Available',
      meta: 'date',
      desc: 'When is the property available for purchase?',
    },
  ],
  SHORT_STAY: [
    {
      slug: 'price',
      name: 'Price',
      meta: 'number',
      desc: 'What is the price of the Property?',
    },
    {
      slug: 'availableDate',
      name: 'Date Available',
      meta: 'date',
      desc: 'When is the property available for purchase?',
    },
  ],
};

interface ListingType {
  slug: string;
  name: string;
}

interface Props {
  register: any;
  leasing: string;
  property: PropertyType | any;
  control: any;
  attributes: any[];
  setAttributes: React.Dispatch<React.SetStateAction<{ label: string; value: string }[]>>;
}

function ListingDetails({
  register,
  leasing,
  property,
  control,
  attributes,
  setAttributes,
}: Props) {
  const { data: listingTypes } = useListingTypes();
  const { data: propertyAttributes } = usePropertyAttributes(500);

  const minDate = new Date().toISOString().split('T')[0];

  const { errorToast } = useToastify();

  function getAttributesOptions(data: { slug: string; name: string }[]) {
    let arr: { label: string; value: string }[] = [];
    if (!data) {
      return arr;
    }
    for (let item of data) {
      arr.push({ label: item.name, value: item.slug });
    }

    return arr;
  }

  function handleSetAttributes(selected: { label: string; value: string }[]) {
    if (selected.length > 5) {
      errorToast('You can select only up to 5 attributes / tags');
    } else {
      setAttributes(selected);
    }
  }

  return (
    <div className="grid gap-6 max-w-2xl">
      <Controller
        control={control}
        defaultValue={property?.listing?.slug}
        name="listing"
        render={({ field }) => (
          <div>
            <Label className="text-lg font-medium">Listing Type</Label>
            <div className="relative w-60">
              <select className={cn('w-full h-10 rounded border border-gray-200')} {...field}>
                {[{ slug: '', name: 'Select Option...' }, ...listingTypes]?.map(
                  (type: { slug: string; name: string }) => {
                    return (
                      <option key={type.slug} value={type.slug}>
                        {type.name}
                      </option>
                    );
                  },
                )}
              </select>
            </div>
          </div>
        )}
      />

      <div>
        <div className="mb-4">
          <Label className="text-lg font-medium">Property Attributes / Tags</Label>
          <p>Select the property Attributes that are associated to this property.</p>
        </div>

        <MultiSelect
          options={getAttributesOptions(propertyAttributes)}
          value={attributes}
          onChange={handleSetAttributes}
          labelledBy="Select"
        />
      </div>

      <Controller
        name="currency"
        control={control}
        defaultValue={property.currency}
        render={({ field }) => (
          <div className="grid gap-4">
            <Label className="text-lg font-medium">Select Currency</Label>
            <div className="grid gap-2">
              <div className="flex gap-2 items-center">
                <input type="radio" id="gh" value="GHC" {...register('currency')} />
                <Label htmlFor="gh">Ghana Cedis</Label>
              </div>
              <div className="flex gap-2 items-center">
                <input type="radio" id="us" value="USD" {...register('currency')} />
                <Label htmlFor="us">US Dollars</Label>
              </div>
            </div>
          </div>
        )}
      />

      {listingDetailsData[leasing.split(' ').join('_')]?.map(
        (data: { name: string; slug: string; meta: string; desc: string }) => {
          const { slug, name, meta, desc } = data;
          return (
            <Controller
              render={({ field }) => (
                <div className="grid gap-1">
                  <Label className="text-lg font-medium">{name}</Label>
                  <p>{desc}</p>
                  <Input
                    id={slug}
                    placeholder={name}
                    type={meta}
                    {...register(slug, { required: `${name} is required`, onblur })}
                    min={meta === 'date' && minDate}
                  />
                </div>
              )}
              name={slug}
              defaultValue={() => {
                if (slug === 'availableDate') {
                  let date = new Date().toISOString();
                  if (property['availableDate'] === '0001-01-01T00:00:00Z') {
                    date = date.split('T')[0];
                  } else {
                    date = property[slug].split('T')[0];
                  }
                  return date;
                } else {
                  return property[slug];
                }
              }}
              control={control}
            />
          );
        },
      )}
    </div>
  );
}

export { ListingDetails };
