'use client';
import React from 'react';
import Link from 'next/link';

import { Chevron } from '@/public/assets/icons/index';
import { useSlider } from '@/hooks/shared';
import { ROUTES, getPropertyCardSize } from '@/utils';
import { cn } from '@/lib/utils';
import { PropertyCard, Button } from '@/components/shared';
import { useRouter } from 'next/navigation';

type Props = {
  title: string;
  products: any[];
  cardSize: string;
  link: string;
};

export function PromotedProperty({ title, products, cardSize, link }: Props) {
  const productBoard = React.useRef<HTMLDivElement>(null);
  const next = React.useRef<HTMLDivElement>(null);
  const prev = React.useRef<HTMLDivElement>(null);
  const router = useRouter();

  const { moveLeft, moveRight } = useSlider(
    products,
    getPropertyCardSize(cardSize),
    productBoard,
    prev,
    next,
  );

  return (
    <div className="w-full max-w-[1400px] flex flex-col md:flex-row gap-6 items-center bg-blue-950 p-6 xl:p-[60px] xl:py-[100px] rounded-xl">
      <div className="grid gap-5 text-white">
        <h2 className="text-xl font-medium">Latest and Greatest Luxury Apartments.</h2>
        <p>Check out the latest product launches and get inspired by the homes of tomorrow.</p>

        <Link href={`#`}>
          <Button className="rounded-full w-[150px] bg-pink hover:bg-pink-700">Show More</Button>
        </Link>
      </div>

      <div className={cn('relative md:grow')}>
        <div
          role="button"
          onClick={moveLeft}
          ref={prev}
          className="absolute max-sm:hidden z-10 left-[-25px] top-1/2 transform -translate-y-1/2 h-12 w-12 bg-white border border-dark rounded-full flex items-center justify-center cursor-pointer ">
          <Chevron className="-rotate-90" />
        </div>

        <div
          ref={productBoard}
          className={cn(
            'flex gap-2 max-md:max-w-[80vw] luxury-property-slider overflow-auto transition-all ease-in duration-500 noscroll-indicator',
          )}>
          {products?.map((property) => {
            return (
              <PropertyCard
                key={property?.id}
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
          className="absolute max-sm:hidden z-10 right-[-25px] top-1/2 transform -translate-y-1/2 h-12 w-12 bg-white border border-dark rounded-full flex items-center justify-center cursor-pointer">
          <Chevron className="rotate-90" />
        </div>
      </div>
    </div>
  );
}
