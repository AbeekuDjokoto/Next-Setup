'use client';

import { Input, Label, Textarea } from '@/components/shared';
import React from 'react';
import { Controller } from 'react-hook-form';

interface Props {
  control: any;
  property: any;
}

export function Lease({ control, property }: Props) {
  return (
    <div className="grid gap-6">
      <div className="max-w-2xl">
        <Controller
          name="leaseDuration"
          control={control}
          defaultValue={property['leaseDuration']}
          render={({ field }) => (
            <div className="grid gap-1">
              <Label className="text-lg font-medium" htmlFor="leaseDuration">
                Rent Duration
              </Label>
              <div className="flex gap-2 items-center">
                <Input id={'leaseDuration'} placeholder="Rent Duration" type="number" {...field} />
                <p className="w-max">months</p>
              </div>
            </div>
          )}
        />
      </div>

      <div className="grid gap-1 max-w-2xl">
        <Controller
          render={({ field }) => (
            <div className="grid gap-1 max-w-2xl">
              <Label className="text-lg font-medium" htmlFor="leaseTermDescription">
                What should renters know about the rent terms?
              </Label>
              <Textarea
                id="leaseTermDescription"
                placeholder="Example: Freshly painted home with new appliances and carpeting. Easy walking to public transit and a great neighborhood"
                rows={8}
                {...field}
              />
              <p>Share details that can be deal breakers, or deal makers, for renters.</p>
            </div>
          )}
          name="leaseTermDescription"
          control={control}
          defaultValue={property['leaseTermDescription']}
        />
      </div>
    </div>
  );
}
