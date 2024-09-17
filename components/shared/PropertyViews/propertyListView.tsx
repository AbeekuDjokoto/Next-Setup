import React from 'react';
import Link from 'next/link';
import { formatCurrency, getBasicAmenities } from '@/utils';

import { AreaIcon, BathIcon, BedIcon, ParkingIcon } from '@/public/assets/icons';

type Props = {
  property: any;
};

export function ProductListView({ property }: Props) {
  return (
    <Link href={`/products/${property?.slug}`}>
      <div className="flex gap-4 max-w-[1000px] m-auto p-6 border-b">
        <div className="flex gap-8 items-center">
          <div
            className={`w-[100px] h-[100px] md:w-[150px] md:h-[150px] lg:w-[200px] lg:h-[200px]  shrink-0`}>
            <img
              src={property?.imageUrl || '/assets/images/house.jpeg'}
              alt={property?.businessName}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <p className="text-base font-semibold">{property?.name}</p>

            <p className="text-gray-500 text-sm">{property.description}</p>

            <div className="flex gap-4 items-center">
              {getBasicAmenities(property?.property_amenities)['bedrooms'] ? (
                <div className="flex items-center gap-2">
                  <BedIcon className="w-5 h-5" />{' '}
                  {getBasicAmenities(property.property_amenities)['bedrooms'] ?? '-'}
                </div>
              ) : null}
              {getBasicAmenities(property?.property_amenities)['land size'] ? (
                <div className="flex items-center gap-2">
                  <AreaIcon className="w-5 h-5" />{' '}
                  {getBasicAmenities(property?.property_amenities)['land size'] ?? '-'}
                </div>
              ) : null}
              {getBasicAmenities(property?.property_amenities)['bathrooms'] ? (
                <div className="flex items-center gap-2">
                  <BathIcon className="w-5 h-5" />{' '}
                  {getBasicAmenities(property?.property_amenities)['bathrooms'] ?? '-'}
                </div>
              ) : null}
              {getBasicAmenities(property?.property_amenities)['parking'] ? (
                <div className="flex items-center gap-2">
                  <ParkingIcon className="w-5 h-5" />{' '}
                  {getBasicAmenities(property?.property_amenities)['parking'] ?? '-'}
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="max-sm:hidden w-[100px] h-[100px] md:w-[150px] md:h-[150px] lg:w-[200px] lg:h-[200px] shrink-0 border-l grid place-items-center">
          <p className="text-base md:text-lg lg:text-2xl font-bold">
            {formatCurrency(25000, 2, 'GHC')}
          </p>
        </div>
      </div>
    </Link>
  );
}
