'use client';
import { ItemQuantity } from '@/components/shared';
import { useAmenity } from '@/hooks/admin';
import { useAmenityQuantity } from '@/hooks/shared';
import { FilterType } from '@/types';

type Props = {
  type: string;
  filter: FilterType;
  setFilter: React.Dispatch<React.SetStateAction<FilterType>>;
};

export function AmenityDropdown({ type, filter, setFilter }: Props) {
  // {"slug": "washing-machine-2057020119", "value": 5}

  const { data } = useAmenity();
  const basicAmenities = getBasicAmenities(data);

  console.log({ basicAmenities, filter });

  const {
    decreaseQuantity: descreaseRoom,
    increaseQuantity: increaseRoom,
    quantity: quantityRoom,
  } = useAmenityQuantity();

  const {
    decreaseQuantity: descreaseBath,
    increaseQuantity: increaseBath,
    quantity: quantityBath,
  } = useAmenityQuantity();
  const {
    decreaseQuantity: descreaseParking,
    increaseQuantity: increaseParking,
    quantity: quantityParking,
  } = useAmenityQuantity();

  return (
    <div className="p-3">
      <div className="flex justify-between items-center pb-4">
        <p className="font-medium">Beds</p>
        <ItemQuantity
          decreaseQuantity={() => {
            descreaseRoom();
            setFilter((prev: any) => {
              return {
                ...prev,
                amenity: { slug: basicAmenities['Bedrooms']?.slug, value: quantityRoom },
              };
            });
          }}
          increaseQuantity={() => {
            increaseRoom();
            setFilter((prev: any) => {
              return {
                ...prev,
                amenity: { slug: basicAmenities['Bedrooms']?.slug, value: quantityRoom },
              };
            });
          }}
          quantity={quantityRoom}
        />
      </div>
      <div className="flex justify-between items-center border-t py-4">
        <p className="font-medium">Baths</p>
        <ItemQuantity
          decreaseQuantity={() => {
            descreaseBath();
            setFilter((prev: any) => {
              return {
                ...prev,
                amenity: { slug: basicAmenities['Bathrooms']?.slug, value: quantityBath },
              };
            });
          }}
          increaseQuantity={() => {
            increaseBath();
            setFilter((prev: any) => {
              return {
                ...prev,
                amenity: { slug: basicAmenities['Bathrooms']?.slug, value: quantityBath },
              };
            });
          }}
          quantity={quantityBath}
        />
      </div>
      <div className="flex justify-between items-center border-t py-4">
        <p className="font-medium">Parking</p>
        <ItemQuantity
          decreaseQuantity={() => {
            descreaseParking();
            setFilter((prev: any) => {
              return {
                ...prev,
                amenity: { slug: basicAmenities['Parking']?.slug, value: quantityParking },
              };
            });
          }}
          increaseQuantity={() => {
            increaseParking();
            setFilter((prev: any) => {
              return {
                ...prev,
                amenity: { slug: basicAmenities['Parking']?.slug, value: quantityParking },
              };
            });
          }}
          quantity={quantityParking}
        />
      </div>
    </div>
  );
}

interface Amenity {
  slug: string;
  type: any;
  name: string;
  meta: string;
  icon_url?: string;
}

export function getBasicAmenities(amenities?: Amenity[]) {
  let obj: { [key: string]: any } = { Bedrooms: null, Bathrooms: null, Parking: null };
  if (!amenities) {
    return obj;
  }
  let attr = ['Bedrooms', 'Bathrooms', 'Parking'];
  for (let item of amenities) {
    let key = item.name;
    if (attr.includes(key)) {
      obj[key] = item;
    }
  }

  return obj;
}
