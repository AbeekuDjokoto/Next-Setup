'use client';
import React from 'react';

import { Chevron } from '@/public/assets/icons/index';
import { useSlider } from '@/hooks/shared';
import { ROUTES, getPropertyCardSize } from '@/utils';
import { cn } from '@/lib/utils';
import { PropertyCard } from '@/components/shared';
import { useRouter } from 'next/navigation';
import { PropertyType } from '@/types';
import Link from 'next/link';

type Props = {
  title: string;
  properties: PropertyType[];
  cardSize: string;
  link: string;
};

export function PropertyListCategory({ title, properties, cardSize, link }: Props) {
  const propertyBoard = React.useRef<HTMLDivElement>(null);
  const next = React.useRef<HTMLDivElement>(null);
  const prev = React.useRef<HTMLDivElement>(null);
  const router = useRouter();

  const { moveLeft, moveRight } = useSlider(
    properties,
    getPropertyCardSize(cardSize),
    propertyBoard,
    prev,
    next,
  );

  return (
    <div className={cn('grid gap-4', { hidden: properties.length === 0 })}>
      <div className="flex gap-4 justify-between items-center">
        <h2 className="text-xl font-bold">{title}</h2>
        <Link href={link}>All</Link>
      </div>

      <div className={cn('relative w-full')}>
        <div
          role="button"
          onClick={moveLeft}
          ref={prev}
          className={cn(
            'absolute max-sm:hidden z-10 left-[-25px] top-1/2 transform -translate-y-1/2 h-12 w-12 bg-white border border-dark rounded-full flex items-center justify-center cursor-pointer',
            'max-sm:hidden',
          )}>
          <Chevron className="-rotate-90" />
        </div>

        <div
          ref={propertyBoard}
          className={cn(
            'property-slider flex gap-2 overflow-auto transition-all ease-in duration-500 noscroll-indicator',
            'max-sm:flex-col',
          )}>
          {properties?.map((property) => {
            return (
              <PropertyCard
                key={property?.slug}
                propertyData={property}
                size={cardSize}
                handleClick={() => {
                  router.push(`${ROUTES.PROPERTY_DETAILS}/${property.slug}`);
                }}
              />
            );
          })}
        </div>
        <div
          role="button"
          onClick={moveRight}
          ref={next}
          className={cn(
            'absolute max-sm:hidden z-10 right-[-25px] top-1/2 transform -translate-y-1/2 h-12 w-12 bg-white border border-dark rounded-full flex items-center justify-center cursor-pointer',
            'max-sm:hidden',
          )}>
          <Chevron className="rotate-90" />
        </div>
      </div>
    </div>
  );
}
