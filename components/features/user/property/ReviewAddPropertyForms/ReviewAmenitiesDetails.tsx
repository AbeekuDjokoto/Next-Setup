'use client';

import { Button } from '@/components/shared';
import { cn } from '@/lib/utils';
import React from 'react';

type Props = {
  amenities: any[];
  noEdit?: boolean;
  onHandleEdit: (...args: any) => void;
};
export function ReviewAmenitiesDetails({ amenities, onHandleEdit, noEdit }: Props) {
  return (
    <div className={cn('grid gap-2 pb-6', { 'flex gap-2 flex-wrap': noEdit })}>
      {amenities?.map((item: any) => {
        return (
          <div
            className={cn('w-full flex justify-between gap-4 md:gap-20', {
              hidden: !item.value,
            })}
            key={item.amenity.slug}>
            <div className="grid gap-1 justify-start items-start">
              <h4 className="">{item.amenity?.name}</h4>
              <p>{item.value}</p>
            </div>
            {noEdit ? null : (
              <Button
                type="button"
                variant={'ghost'}
                onClick={() =>
                  onHandleEdit({
                    label: item.amenity.name,
                    value: item.data.value,
                    key: `${item.amenity?.slug}~amenity`,
                    type: item.amenity.meta,
                  })
                }>
                Edit
              </Button>
            )}
          </div>
        );
      })}
    </div>
  );
}
