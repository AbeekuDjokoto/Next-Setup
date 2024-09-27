import { AreaIcon, BathIcon, BedIcon, ParkingIcon } from '@/public/assets/icons';
import { Property } from '@/types/blog';
import { getBasicAmenities } from '@/utils';

import Image from 'next/image';

export const PropertyListing = ({
  name,
  location,
  images,
  slug,
  price,
  currency,
  property_amenities,
  leasing,
}: Property) => {
  return (
    <div className="border rounded-3xl p-3 mb-5">
      <a
        className="block md:grid grid-cols-3 gap-3"
        href={`https://ownkey.com/property/${slug}`}
        target="_blank">
        <div className="block md:hidden">
          <Image
            src={images[0]}
            alt="Logo"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: '12rem', objectFit: 'cover' }}
            className="rounded-3xl"
          />
        </div>
        <div className="col-span-1 hidden md:block">
          <Image
            src={images[0]}
            alt="Logo"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '12rem', height: '9rem', objectFit: 'cover' }}
            className="rounded-3xl"
          />
        </div>

        <div className="col-span-2">
          <div className="border-b pb-3 mt-7">
            <div className="flex justify-between gap-5 w-full">
              <h3 className="font-semibold text-[14px] text-[#1B1B1B] w-[70%]">{name}</h3>
              <p className="text-[0.8rem] w-[30%] text-[#D62151]">{leasing}</p>
            </div>
            <p className="text-[12px] text-[#52525B]">
              {location.city}, {location.country}
            </p>
            <div className="text-sm mt-3 flex gap-2">
              <div className="flex gap-4 items-center">
                {getBasicAmenities(property_amenities)['bedrooms'] ? (
                  <div className="flex items-center gap-2">
                    <BedIcon className="w-5 h-5" />{' '}
                    {getBasicAmenities(property_amenities)['bedrooms'] ?? '-'}
                  </div>
                ) : null}
                {getBasicAmenities(property_amenities)['land size'] ? (
                  <div className="flex items-center gap-2">
                    <AreaIcon className="w-5 h-5" />{' '}
                    {getBasicAmenities(property_amenities)['land size'] ?? '-'}
                  </div>
                ) : null}
                {getBasicAmenities(property_amenities)['bathrooms'] ? (
                  <div className="flex items-center gap-2">
                    <BathIcon className="w-5 h-5" />{' '}
                    {getBasicAmenities(property_amenities)['bathrooms'] ?? '-'}
                  </div>
                ) : null}
                {getBasicAmenities(property_amenities)['parking'] ? (
                  <div className="flex items-center gap-2">
                    <ParkingIcon className="w-5 h-5" />{' '}
                    {getBasicAmenities(property_amenities)['parking'] ?? '-'}
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <p className="text-end font-bold text-xl mt-5">
            {currency}
            {currency === 'USD' ? '$' : '₵'} {price}
          </p>
        </div>
      </a>
    </div>
  );
};
