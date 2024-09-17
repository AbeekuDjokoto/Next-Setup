'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { CustomDropdown } from '../MiniatureSearch/CustomDropdown';
import { PriceDropdown } from '../MiniatureSearch/PriceDropdown';
import { AmenityDropdown } from '../MiniatureSearch/AmenityDropdown';

import { MainPopoverSearch } from './MainPopoverSearch';
import { FilterType } from '@/types';
import { Button } from '@/components/shared';
import { LocationFilter } from '../LocationFilter/LocationFilter';

type Props = {
  search: string;
  setSearch: (...args: any) => void;
  filter: FilterType;
  setFilter: (...args: any) => void;
  resetFilter: () => void;
};

/*
 * TODO: change labels based on screen size
 * listing -> listing type, property -> property type, reset -> reset filters
 */

const searchFeatures = [
  { type: 'listing', label: 'Listing', content: CustomDropdown },
  { type: 'type', label: 'Property', content: CustomDropdown },
  { type: 'price', label: 'Budget', content: PriceDropdown },
  { type: 'amenity', label: 'Amenities', content: AmenityDropdown },
];

export function SearchFilter({ filter, search, setFilter, setSearch, resetFilter }: Props) {
  return (
    <>
      <div className={cn('flex gap-4')}>
        {searchFeatures.map((item) => {
          return (
            <MainPopoverSearch
              label={item.label}
              key={item.type}
              type={item.type}
              content={item.content}
              search={search}
              filter={filter}
              setFilter={setFilter}
              setSearch={setSearch}
            />
          );
        })}

        <div className="border border-gray-300 rounded-md flex items-center px-3 w-[300px]">
          <LocationFilter
            setFilter={setFilter}
            comboboxClassName="mt-5"
            inputClassName="w-full"
            placeholder="Location, street"
          />
        </div>

        <Button onClick={resetFilter} className="!bg-pink">
          Reset
        </Button>
      </div>
    </>
  );
}
