'use client';

import { CubicLoader } from '@/components/shared/Loaders';
import { Input, Label, Textarea } from '@/components/shared';
import React from 'react';
import { Controller } from 'react-hook-form';

interface Props {
  register: any;
  defaultAmenityValues: any;
  defaultAmenities: any;
  isLoading: boolean;
  control: any;
  desc: string;
}

export function PropertyInfo({
  defaultAmenities,
  isLoading,
  control,
  desc,
  defaultAmenityValues,
}: Props) {
  return (
    <div className="grid gap-6">
      <div className="grid gap-2">
        <h2 className="text-2xl font-semibold">Let's start creating your listing</h2>
        <p className="text-gray-500">Add or review details about your property's size.</p>
      </div>
      {isLoading ? (
        <div className="grid place-items-center h-[300px]">
          <CubicLoader />
        </div>
      ) : (
        <div className="grid gap-8">
          <div className="max-w-2xl grid gap-4">
            {defaultAmenities?.map((amenity: { slug: string; name: string; meta: string }) => {
              return (
                <Controller
                  key={amenity.slug}
                  render={({ field }) => (
                    <div className="grid gap-1">
                      <Label className="text-lg font-medium">{amenity?.name}</Label>
                      <Input
                        id={amenity?.slug}
                        placeholder={amenity?.name}
                        type={amenity?.meta}
                        {...field}
                      />
                    </div>
                  )}
                  name={`${amenity?.slug}~amenity`}
                  control={control}
                  defaultValue={defaultAmenityValues[`${amenity?.slug}~amenity`]}
                />
              );
            })}
          </div>
          <Controller
            render={({ field }) => (
              <div className="grid gap-1 max-w-2xl">
                <Label className="text-lg font-medium">Property Description</Label>
                <Textarea id="desc" placeholder="Description" rows={8} {...field} />
              </div>
            )}
            name="desc"
            control={control}
            defaultValue={desc}
          />
        </div>
      )}
    </div>
  );
}
