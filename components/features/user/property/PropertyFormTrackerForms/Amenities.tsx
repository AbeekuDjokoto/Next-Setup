'use client';

import { Amenity } from '@/types';
import { Controller } from 'react-hook-form';
import { Accordion, Label } from '@/components/shared';

interface Props {
  control: any;
  propertyAmenities?: any;
  register: any;
  allAmenities: any;
  defaultAmenities: Amenity[];
}

type PropertyAmenity = {
  // id: number;
  // created_at: string;
  // amenity: {
  //   slug: string;
  //   name: string;
  //   meta: string;
  // };
  // data: {
  //   value: any;
  // };
  meta: string;
  name: string;
  value: any;
  slug: string;
};

export function Amenities({
  propertyAmenities,
  register,
  allAmenities,
  defaultAmenities,
  control,
}: Props) {
  console.log('propAm', propertyAmenities);
  return (
    <div className="grid gap-4">
      <div>
        <h2 className="text-xl font-semibold">Which Amenities does your property have?</h2>
        <p className="text-gray-500">Share which amenities are available on your property</p>
      </div>

      <div className="grid gap-4">
        {Array.from(
          groupAmenities(
            mergeAmenities(
              getAmenitiesProperties(defaultAmenities, allAmenities),
              propertyAmenities,
            ),
          ),
        ).map(([category, items]) => (
          <Accordion key={category} id={category} title={category} plus>
            <div className="flex gap-4 flex-wrap">
              {items.map((item: any) => {
                const { slug, name, meta, value } = item;
                return (
                  <Controller
                    name={`${slug}~amenity`}
                    control={control}
                    defaultValue={value}
                    render={({}) => (
                      <div className="flex gap-2 items-center" key={slug}>
                        <input
                          id={slug}
                          placeholder={name}
                          type="checkbox"
                          {...register(`${slug}~amenity`)}
                        />
                        <Label htmlFor={slug} className="text-sm text-gray-500">
                          {name}
                        </Label>
                      </div>
                    )}
                  />
                );
              })}
            </div>
          </Accordion>
        ))}
      </div>
    </div>
  );
}

function getAmenitiesProperties(
  defaultAmenities: { slug: string; name: string }[],
  amenities: { slug: string; name: string }[] = [],
) {
  let defaultAmenitySlugs: string[] = [];
  let otherAmenities: any[] = [];
  if (!defaultAmenities || !amenities) return otherAmenities;

  for (let item of defaultAmenities) {
    defaultAmenitySlugs.push(item?.slug);
  }

  otherAmenities = amenities.filter((item) => !defaultAmenitySlugs.includes(item.slug));

  return otherAmenities;
}

function mergeAmenities(amenities: Amenity[], data: PropertyAmenity[]) {
  let mergedAmenities: any[] = [];

  // Create a map from data array for faster lookup
  const dataMap: { [key: string]: any } = {};
  for (const item of data) {
    dataMap[item.slug] = item.value;
  }

  // Merge amenities based on slugs
  for (const item of amenities) {
    const value = dataMap[item.slug];
    mergedAmenities.push({ ...item, value });
  }

  return mergedAmenities;
}

function groupAmenities(amenities: any) {
  const obj = new Map();
  for (let item of amenities) {
    if (obj.has(item?.type?.desc)) {
      obj.set(item?.type?.desc, [...obj.get(item?.type?.desc), item]);
    } else {
      obj.set(item?.type?.desc, [item]);
    }
  }

  return obj;
}
