'use client';

import { Button } from '@/components/shared';
import React from 'react';
import { formatCurrency, formatDate } from '@/utils';

type Props = {
  features: any[];
  property: any;
  onHandleEdit?: (...args: any) => void;
};
export function ReviewPropertyInfo({ features, property, onHandleEdit }: Props) {
  return (
    <>
      <div className="w-full grid gap-4">
        {features.map((item) => {
          return (
            <>
              {property?.leasing === 'FOR_SALE' && item.key === 'securityDeposit' ? null : (
                <div className="w-full flex justify-between gap-8 md:gap-20" key={item.key}>
                  <div className="grid gap-2 justify-start items-start">
                    <h4 className="font-semibold">{item.label}</h4>
                    <p>
                      {item.key === 'price' && formatCurrency(item.value, 0, property.currency)}
                      {item.key === 'securityDeposit' &&
                        formatCurrency(item.value, 0, property.currency)}
                      {item.key === 'availableDate' && formatDate(item.value)}
                      {item.key === 'leaseDuration' && item.value}
                      {item.key === 'leaseDuration' && ' months'}
                      {item.key === 'hideAddress' && (item.value ? 'Yes' : 'No')}
                      {item.key === 'negotiable' && (item.value ? 'Yes' : 'No')}
                      {item.key === 'availability' && (item.value ? 'Yes' : 'No')}

                      {item.key !== 'hideAddress' &&
                        item.key !== 'availableDate' &&
                        item.key !== 'leaseDuration' &&
                        item.key !== 'securityDeposit' &&
                        item.key !== 'price' &&
                        item.key !== 'availability' &&
                        item.key !== 'negotiable' &&
                        item.value}
                    </p>
                  </div>

                  {onHandleEdit ? (
                    <Button type="button" variant={'ghost'} onClick={() => onHandleEdit(item)}>
                      Edit
                    </Button>
                  ) : null}
                </div>
              )}
            </>
          );
        })}
      </div>
    </>
  );
}
