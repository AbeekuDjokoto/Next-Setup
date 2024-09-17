'use client';
import { useSlider } from '@/hooks/shared';
import { cn } from '@/lib/utils';
import { explorePropertyData } from '@/mocks';
import { Chevron } from '@/public/assets/icons';
import { ROUTES } from '@/utils';
import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

export function ExploreHomes() {
  const router = useRouter();
  const propertyBoard = React.useRef<HTMLDivElement>(null);
  const next = React.useRef<HTMLDivElement>(null);
  const prev = React.useRef<HTMLDivElement>(null);

  const { moveLeft, moveRight } = useSlider(explorePropertyData, 325, propertyBoard, prev, next);
  return (
    <div className="grid gap-6">
      <div className="max-w-xl m-auto grid gap-2">
        <h2 className="font-bold text-2xl md:text-4xl text-center">
          Discover the Best Homes in <span className="text-pink">Accra</span>
        </h2>
        <p className="text-base text-center">
          Start exploring a diverse range of properties, Including apartments and family houses, all
          nestled in welcoming neighbourhoods.
        </p>
      </div>
      <div className={cn('relative w-full')}>
        <div
          role="button"
          onClick={moveLeft}
          ref={prev}
          className={cn(
            'absolute max-sm:hidden z-10 left-[-25px] top-1/2 transform -translate-y-1/2 h-12 w-12 bg-white border border-dark rounded-full flex items-center justify-center cursor-pointer',
          )}>
          <Chevron className="-rotate-90" />
        </div>

        <div
          ref={propertyBoard}
          className={cn(
            'property-slider flex gap-2 overflow-auto transition-all ease-in duration-500 noscroll-indicator',
          )}>
          {explorePropertyData?.map((property) => {
            return (
              <div
                key={property.id}
                className="w-[250px] h-[370px] md:w-[325px] md:h-[470px] shrink-0 rounded-lg border overflow-hidden relative ">
                <img
                  src={property.src}
                  alt={property.location}
                  className="w-full h-full object-cover hover:scale-125 duration-150 transition-all"
                />
                <div className="absolute top-4 left-4">
                  <p className="text-2xl text-white font-semibold text-shadow">
                    {property.location}
                  </p>
                </div>

                <button
                  onClick={() => router.push(`${ROUTES.SEARCH_PAGE}?location=${property.location}`)}
                  className="bg-white opacity-75 text-black py-2 px-4 rounded absolute bottom-4 left-4 font-medium hover:opacity-100 flex items-center gap-1">
                  View Homes <ChevronRight />
                </button>
              </div>
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
