import Image from 'next/image';
import { cn } from '@/lib/utils';
import { BedIcon, BathIcon, ParkingIcon, AreaIcon } from '@/public/assets/icons';
import {
  ROUTES,
  formatCurrency,
  formatDateString,
  getBasicAmenities,
  sortImagesInOrder,
} from '@/utils';
import { XCircle } from 'lucide-react';
import Link from 'next/link';
import { useWishlist } from '@/hooks/shared';
import { PropertyType } from '@/types';

type Props = Readonly<{
  property: PropertyType;
  className?: string;
  isWishlist?: boolean;
  wishlistId?: number;
}>;

function MyPropertyCard({ property, className, isWishlist, wishlistId }: Props) {
  const { removeItemFromWishlist } = useWishlist();
  return (
    <div className="relative max-sm:max-w-sm w-[420px]">
      <Link href={`${ROUTES.PROPERTY_DETAILS}/${property?.slug}`}>
        <div
          className={cn(
            'marker:w-full min-h-[150px] max-h-[200px] flex border rounded-lg shadow-sm overflow-hidden',
            className,
          )}>
          <div className="relative placeholder:w-[40%] p-2">
            <Image
              src={(property && property.images && sortImagesInOrder(property?.images)[0]) || ''}
              alt={property?.name}
              className="object-cover rounded-lg h-full"
              width={0.4 * 384}
              height={150}
            />

            {property?.leasing ? (
              <div className="absolute top-4 left-4 bg-white rounded text-black py-0.5 px-1.5 border-2 border-gray-100 text-sm font-medium">
                {property?.leasing === 'FOR RENT' ? 'RENT' : 'SALE'}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col gap-2 py-3 w-[60%]">
            <div>
              <p className="text-sm uppercase font-medium two-lines">{property?.name}</p>
              <p className="text-xs ">
                {property?.location?.city} {property?.location?.country}
              </p>
            </div>
            <div className="flex gap-4 items-center">
              {getBasicAmenities(property?.property_amenities)['bedrooms'] ? (
                <div className="flex items-center gap-2">
                  <BedIcon className="w-5 h-5" />{' '}
                  {getBasicAmenities(property?.property_amenities)['bedrooms'] ?? '-'}
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
            <div className="flex flex-col gap-1">
              <p className="text-md font-bold">
                {formatCurrency(property?.price, 0, property?.currency ?? 'GHC')}
                {property?.leasing === 'FOR RENT' ? '/mo' : null}
              </p>
              <p className="font-medium text-xs">{formatDateString(property?.updated_at)}</p>
            </div>
          </div>
        </div>
      </Link>
      {isWishlist && wishlistId && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            removeItemFromWishlist(wishlistId);
          }}
          className="absolute top-[-8px] right-[-8px] z-50 text-gray-900 hover:text-red-600"
          title="remove property">
          <XCircle />
        </button>
      )}
    </div>
  );
}

export { MyPropertyCard };
