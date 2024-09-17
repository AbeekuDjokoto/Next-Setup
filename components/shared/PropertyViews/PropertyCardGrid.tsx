'use client';
import { cn } from '@/lib/utils';

import { PropertyCard } from '..';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/utils';
import { PropertyType } from '@/types';

interface Props {
  properties: PropertyType[];
  classNames?: string;
}

function PropertyCardGrid({ properties, classNames = '' }: Props) {
  const router = useRouter();
  return (
    <div className={cn('flex gap-4 flex-wrap max-sm:justify-center', classNames)}>
      {properties.map((property) => {
        return (
          <PropertyCard
            size="large"
            key={property.slug}
            propertyData={property}
            handleClick={() => {
              router.push(`${ROUTES.PROPERTY_DETAILS}/${property.slug}`);
            }}
          />
        );
      })}
    </div>
  );
}

export { PropertyCardGrid };
