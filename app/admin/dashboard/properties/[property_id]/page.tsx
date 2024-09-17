'use client';

import React from 'react';

import {
  HostCard,
  ImageSlider,
  PropertyInfoDetails,
  PropertyLocationCard,
  RentSellCard,
} from '@/components/shared';
import { cn } from '@/lib/utils';
import { useAllProperties, useGetSingleHost, useGetSingleProperty } from '@/hooks/admin';
import { useParams } from 'next/navigation';
import { useModal } from '@/hooks/shared';
import { Modal, Icons, DeletePromptReason, Button } from '@/components/shared';
import Skeleton from 'react-loading-skeleton';
import { sortImagesInOrder } from '@/utils';

function PropertyDetail() {
  const { onVerifyProperty, isLoadingVerifyProperty } = useAllProperties();
  const { contentType, closeModal, openModal, showModal } = useModal();
  const params = useParams();
  const { property_id } = params;
  const { property, isLoading } = useGetSingleProperty(property_id);
  const { host } = useGetSingleHost(property?.host.id);
  const propertyImages = sortImagesInOrder(property?.images ?? []);

  function onHandlePropertyVerification(status: 'ACCEPTED' | 'REJECTED', reason?: string) {
    onVerifyProperty({ property: property_id, status, reason });
  }
  return (
    <>
      <div className="grid gap-6">
        <div
          className={cn(
            'flex justify-between items-center p-6 border rounded-md sticky top-0 bg-white',
            {
              'bg-green-50 border border-green-200': property?.status?.toLowerCase() === 'accepted',
            },
            { 'bg-red-50 border border-red-200': property?.status?.toLowerCase() === 'rejected' },
          )}>
          <h1 className="text-2xl font-bold">Property Details</h1>

          {property?.status?.toLowerCase() === 'pending' && (
            <div className="flex justify-between items-center gap-4">
              <Button
                size={'sm'}
                onClick={() => openModal('reject-property')}
                variant="destructive">
                Deny
              </Button>
              <Button
                size={'sm'}
                variant="outline"
                onClick={() => onHandlePropertyVerification('ACCEPTED')}>
                {isLoadingVerifyProperty && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                Approve
              </Button>
            </div>
          )}

          <div
            className={cn(
              'p-1 red flex items-center gap-2 rounded-3xl',
              {
                hidden: property?.status?.toLowerCase() === 'pending',
              },
              { 'bg-green-100': property?.status?.toLowerCase() === 'accepted' },
              { 'bg-red-100': property?.status?.toLowerCase() === 'rejected' },
            )}>
            <div
              className={cn(
                'px-3 py-1 rounded-3xl text-white text-sm',
                { 'bg-green-600': property?.status?.toLowerCase() === 'accepted' },
                { 'bg-red-500': property?.status?.toLowerCase() === 'rejected' },
              )}>
              {property?.status?.toLowerCase() === 'accepted' ? 'Approved' : 'declined'}
            </div>
            <p
              className={cn(
                'text-xs pr-5',
                { 'text-green-600': property?.status?.toLowerCase() === 'accepted' },
                { 'text-red-500': property?.status?.toLowerCase() === 'rejected' },
              )}>
              {property?.status?.toLowerCase() === 'accepted'
                ? 'This Property has been approved'
                : 'This Property has been declined'}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-[max-content,auto] gap-6">
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
            {isLoading ? (
              <Skeleton className="h-[380px] w-[320px]" />
            ) : (
              <HostCard className="w-[320px]" host={host ?? property?.host} />
            )}
            {isLoading ? (
              <Skeleton className="h-[360px]" />
            ) : (
              <PropertyLocationCard location={property?.location} />
            )}
          </div>

          <div className="flex flex-col gap-10">
            {isLoading ? (
              <Skeleton className="h-[600px]" />
            ) : (
              <ImageSlider images={propertyImages as string[]} />
            )}
            {isLoading ? (
              <>
                <Skeleton className="w-14 h-8" />
                <Skeleton className="w-14 h-8" />
                <Skeleton className="w-14 h-8" />
              </>
            ) : (
              <PropertyInfoDetails property={property} type={property?.leasing} />
            )}
          </div>
        </div>
      </div>

      <Modal show={showModal} hideModal={closeModal}>
        {contentType === 'reject-property' && (
          <DeletePromptReason
            closeModal={closeModal}
            onHandleSubmit={onHandlePropertyVerification}
            isLoading={isLoadingVerifyProperty}
          />
        )}
      </Modal>
    </>
  );
}

export default PropertyDetail;
