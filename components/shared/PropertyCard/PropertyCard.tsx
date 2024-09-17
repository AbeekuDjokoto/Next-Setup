'use client';

import React from 'react';

import { AuthFormWrapper, OTPVerificationForm, SignInForm } from '@/components/features/user';
import { Modal } from '@/components/shared';
import { useWishlist } from '@/hooks/shared';
import { useWishlistProperty } from '@/hooks/user';
import { cn } from '@/lib/utils';
import {
  AreaIcon,
  BathIcon,
  BedIcon,
  HandshakeIcon,
  LocationIcon,
  ParkingIcon,
} from '@/public/assets/icons';
import { PropertyType } from '@/types';
import { formatCurrency, formatDateString, getBasicAmenities } from '@/utils';
import { Heart } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface PropertyCardProps extends React.HTMLAttributes<HTMLDivElement> {
  size: string;
  propertyData: PropertyType;
  handleClick: (...args: any) => void;
}

function getWishlistSlugs(wishlist: any[]) {
  const arr: string[] = [];
  if (!wishlist) return arr;
  for (let item of wishlist) {
    arr.push(item?.property?.slug);
  }
  return arr;
}

function getWishlistId(wishlist: any[], slug: string) {
  const item = wishlist?.find((item) => item?.property?.slug === slug);
  return item.id;
}

function PropertyCard({ propertyData, size, handleClick }: PropertyCardProps) {
  const pathname = usePathname();
  const {
    addItemToWishlist,
    removeItemFromWishlist,
    closeModal,
    contentType,
    showModal,
    openModal,
  } = useWishlist();
  const { wishlist } = useWishlistProperty();

  const images = propertyData?.images ?? [];
  const displayImage = images.find((image: string) => image?.includes('0-image')) ?? images[0];

  return (
    <>
      <div
        onClick={handleClick}
        className={cn(
          'bg-white rounded-lg grid overflow-hidden shadow cursor-pointer relative shrink-0 border max-sm:w-full',
          { 'w-[220px]': size === 'small' },
          { 'w-[240px]': size === 'medium' },
          { 'w-[270px]': size === 'large' },
        )}>
        <div
          className={cn(
            'p-2 max-sm:h-[300px]',
            { 'h[160px]': size === 'small' },
            { 'h-[180px]': size === 'medium' },
            { 'h-[210px]': size === 'large' },
          )}>
          <img
            src={(propertyData && propertyData.images && displayImage) || ''}
            alt={propertyData.name}
            className="object-cover w-full h-full rounded-lg"
          />
          <div className=" flex gap-1 items-center absolute top-4 left-4">
            {propertyData?.leasing ? (
              <div className="bg-white rounded text-black py-0.5 px-1.5 border-2 border-gray-100 text-xs font-medium">
                {propertyData?.leasing === 'FOR RENT' ? 'RENT' : 'SALE'}
              </div>
            ) : null}

            <div className="flex gap-2 items-center bg-white rounded text-black py-0.5 px-1.5 border-2 border-gray-100 text-sm font-medium">
              <p className="font-medium text-xs">{formatDateString(propertyData?.updated_at)}</p>
            </div>
          </div>
          <Heart
            onClick={(e) => {
              e.stopPropagation();
              if (getWishlistSlugs(wishlist).includes(propertyData?.slug)) {
                removeItemFromWishlist(getWishlistId(wishlist, propertyData.slug));
              } else {
                addItemToWishlist(propertyData?.slug);
              }
            }}
            className={cn('absolute top-4 right-4 fill-[#00000037] text-white', {
              'fill-red-500': getWishlistSlugs(wishlist).includes(propertyData?.slug),
            })}
          />
        </div>

        <div className="grid gap-3 px-4 py-2">
          <div>
            <p className="text-md uppercase two-lines font-medium text-sm">{propertyData?.name}</p>
            <div className="flex gap-1 items-center">
              <LocationIcon className="w-3 h-3 text-gray-700" />

              <p className="text-xs">
                {propertyData?.location.city}, {propertyData?.location.country}
              </p>
            </div>
            <div className="flex gap-2">
              {propertyData?.negotiable && (
                <div className="flex gap-1 items-center">
                  <HandshakeIcon className="w-3 h-3 text-gray-700" />
                  <p className="text-xs">Negotiable</p>
                </div>
              )}

              {(propertyData?.status === 'sold' || propertyData?.status === 'taken') && (
                <div className="flex gap-1 items-center">
                  <p className="text-xs">{propertyData?.status}</p>
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-4 items-center">
            {getBasicAmenities(propertyData?.property_amenities)['bedrooms'] ? (
              <div className="flex items-center gap-2">
                <BedIcon className="w-5 h-5" />{' '}
                {getBasicAmenities(propertyData.property_amenities)['bedrooms'] ?? '-'}
              </div>
            ) : null}
            {getBasicAmenities(propertyData?.property_amenities)['land size'] ? (
              <div className="flex items-center gap-2">
                <AreaIcon className="w-5 h-5" />{' '}
                {getBasicAmenities(propertyData?.property_amenities)['land size'] ?? '-'}
              </div>
            ) : null}
            {getBasicAmenities(propertyData?.property_amenities)['bathrooms'] ? (
              <div className="flex items-center gap-2">
                <BathIcon className="w-5 h-5" />{' '}
                {getBasicAmenities(propertyData?.property_amenities)['bathrooms'] ?? '-'}
              </div>
            ) : null}
            {getBasicAmenities(propertyData?.property_amenities)['parking'] ? (
              <div className="flex items-center gap-2">
                <ParkingIcon className="w-5 h-5" />{' '}
                {getBasicAmenities(propertyData?.property_amenities)['parking'] ?? '-'}
              </div>
            ) : null}
          </div>

          <div className="flex gap-2 items-center justify-between">
            <p className="text-lg font-bold text-gray-700">
              {formatCurrency(propertyData?.price, 0, propertyData?.currency ?? 'GHS')}
              {propertyData?.leasing === 'FOR RENT' ? '/mo' : null}
            </p>
          </div>
        </div>
      </div>
      <Modal show={showModal} hideModal={closeModal}>
        {contentType === 'sign-in' && (
          <div className="w-[90%] m-auto bg-white py-6 rounded-lg">
            <AuthFormWrapper
              type="client"
              label="Sign In"
              description="Enter your email and password below to sign in">
              <SignInForm type="client" to={pathname} openModal={() => openModal('verify-code')} />
            </AuthFormWrapper>
          </div>
        )}
        {contentType === 'verify-code' && (
          <div className="w-[90%] m-auto bg-white py-6 rounded-lg">
            <AuthFormWrapper
              type="client"
              label="Sign In"
              description="Enter your email and password below to sign in">
              <OTPVerificationForm type="client" closeModal={closeModal} to={pathname} />
            </AuthFormWrapper>
          </div>
        )}
      </Modal>
    </>
  );
}

export { PropertyCard };
