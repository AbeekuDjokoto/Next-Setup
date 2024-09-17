'use client';

import {
  HostCard,
  HostSkeletonCard,
  ImageSlider,
  PropertyInfoDetails,
  PropertyLocationCard,
  RentSellCard,
} from '@/components/shared';
import { useSingleHost } from '@/hooks/user';
import { sortImagesInOrder } from '@/utils';

import Skeleton from 'react-loading-skeleton';

function SingleProperty({ property }: { property: any }) {
  const { host, isLoading } = useSingleHost(property?.host);
  const propertyImages = sortImagesInOrder(property?.images);

  return (
    <div className="py-5">
      <div className="container grid md:grid-cols-[320px,auto] gap-6 relative">
        <div className="flex flex-col gap-4">
          {isLoading ? (
            <Skeleton className="h-[75px] min-w-[320px]" />
          ) : (
            <RentSellCard
              type={property?.leasing}
              price={property?.price}
              currency={property?.currency ?? 'GHC'}
            />
          )}
          <div className="flex flex-col gap-4 max-sm:hidden">
            {isLoading ? (
              <HostSkeletonCard />
            ) : (
              <div>
                <p className="text-blue-950 font-bold mb-2">Listing Agent</p>
                <HostCard host={host} type="client" />
              </div>
            )}
            {isLoading ? (
              <Skeleton className="h-[360px]" />
            ) : (
              <PropertyLocationCard
                location={property?.location}
                isHidden={property?.hideAddress ?? true}
              />
            )}
          </div>
        </div>

        <div className="flex flex-col gap-10">
          {isLoading ? (
            <Skeleton className="h-[600px]" />
          ) : (
            <ImageSlider images={(propertyImages as string[]) || []} />
          )}
          {isLoading ? (
            <>
              <div className="w-24">
                <Skeleton className="w-full h-8" />
              </div>
              <Skeleton className="w-14 h-8" />
              <Skeleton className="w-14 h-8" />
            </>
          ) : (
            <PropertyInfoDetails property={property} type={property?.leasing} />
          )}
        </div>

        <div className="flex flex-col gap-4 sm:hidden">
          {isLoading ? (
            <Skeleton className="h-[360px]" />
          ) : (
            <PropertyLocationCard
              location={property?.location}
              isHidden={property?.hideAddress ?? true}
            />
          )}
          {isLoading ? (
            <Skeleton className="h-[380px] w-[320px]" />
          ) : (
            <div>
              <p className="text-blue-950 font-bold mb-2">Listing Agent</p>
              <HostCard host={host} type="client" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SingleProperty;
