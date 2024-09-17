'use client';

import React from 'react';

import Skeleton from 'react-loading-skeleton';

import {
  HostCard,
  ImageSlider,
  PropertyInfoDetails,
  RentSellCard,
  PropertyLocationCard,
} from '@/components/shared';

import { useParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useSingleHost } from '@/hooks/user';
import { useGetSingleHostProperty } from '@/hooks/user';
import { sortImagesInOrder } from '@/utils';

function PropertyDetail() {
  const params = useParams();
  const { property_id } = params;
  const { property, isLoading } = useGetSingleHostProperty(property_id);
  const { host, refetch, isSingleHostLoading } = useSingleHost(property?.host.host_user_name);
  const propertyImages = sortImagesInOrder(property?.images ?? []);

  React.useEffect(() => {
    if (property?.host.host_user_name) {
      refetch();
    }
  }, [property]);

  return (
    <div className="grid gap-6">
      {property?.status === 'rejected' && (
        <div
          className={cn(
            'flex justify-between items-center p-6 rounded-md sticky top-0 bg-red-50 border border-red-200',
          )}>
          <div>
            <h1 className="text-lg font-bold">Reason</h1>
            <p>{property?.rejectReason}</p>
          </div>

          <div className={cn('p-1 red flex items-center gap-2 rounded-3xl bg-red-100')}>
            <div className={cn('px-3 py-1 rounded-3xl text-white text-sm bg-red-500')}>
              Rejected
            </div>
            <p className={cn('text-xs pr-5 text-red-500')}>This Property has been rejected</p>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-[320px,auto] gap-6 relative">
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
          {isLoading || isSingleHostLoading ? (
            <Skeleton className="h-[380px] w-[320px]" />
          ) : (
            <div>
              <p className="text-blue-950 font-bold">Listing Agent</p>
              <HostCard className="w-[320px]" host={host} />
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

        <div className="flex flex-col gap-10">
          {isLoading ? (
            <Skeleton className="h-[600px]" />
          ) : (
            <ImageSlider images={(propertyImages as string[]) || []} />
          )}
          <PropertyInfoDetails property={property} type={property?.leasing} />
        </div>
      </div>
    </div>
  );
}

export default PropertyDetail;
