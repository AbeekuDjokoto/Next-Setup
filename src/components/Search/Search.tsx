'use client';
import { useState } from 'react';

import { cn } from '@/libs';
import { FilterType } from '@/types';

import { AmenityDropdown } from '../AmenitiesDropdown';
import { CustomDropdown } from '../CustomDropdown';
import { Icon } from '../Icon';
import { LocationFilter } from '../LocationFilter';
import { PopoverSearch } from '../PopOverSearch';
import { PriceDropdown } from '../PriceDropdown';

type Props = {
  search: string;
  setSearch: (...args: any) => void;
  filter: FilterType;
  setFilter: React.Dispatch<React.SetStateAction<FilterType>>;
  onSearch: () => void;
};

interface PopOversProps extends Props {
  className?: string;
}

const searchFeatures = [
  { type: 'property type', content: CustomDropdown },
  { type: 'location', content: () => <></> },
  { type: 'price', content: PriceDropdown },
  { type: 'amenity', content: AmenityDropdown },
];

export const mockFilter = {
  property_type: 'apartment', // e.g., "apartment", "house", etc.
  location: 'New York, NY', // Sample location
  min_price: 1000, // Minimum price
  max_price: 3000, // Maximum price
  amenities: ['pool', 'gym'], // List of selected amenities
};

export function Search({ filter, search, setFilter, setSearch, onSearch }: Props) {
  const [openFilters, setOpenFilters] = useState(false);

  return (
    <>
      {/* This is for the smaller screens search component */}
      {!openFilters ? (
        <button
          className="sm:hidden flex items-center justify-between gap-2 rounded-full overflow-hidden pl-6 py-5 text-start"
          onClick={() => setOpenFilters(true)}>
          <div>
            <p className="font-bold">Search</p>
            <p className="text-xs">Find your next home here.</p>
          </div>
          <div className="rounded-full bg-pink w-max p-4 m-2">
            <Icon name="SearchIcon" className="text-white" />
          </div>
        </button>
      ) : null}
      {openFilters ? (
        <div className="h-max-content bg-white w-full sm:hidden">
          <PopOvers
            filter={filter}
            setFilter={setFilter}
            setSearch={setSearch}
            search={search}
            onSearch={onSearch}
            className="!gap-5"
          />
        </div>
      ) : null}

      <PopOvers
        filter={filter}
        setFilter={setFilter}
        setSearch={setSearch}
        search={search}
        onSearch={onSearch}
        className="!rounded-full border-[0.5px] border-[#E5E7EB] max-sm:hidden !flex-row py-4 "
      />
    </>
  );
}

function PopOvers({ filter, search, setFilter, setSearch, onSearch, className }: PopOversProps) {
  return (
    <div
      className={cn(
        'w-full flex flex-col justify-between bg-white',
        {
          '!max-sm:bg-gray-100': search !== '',
        },
        className,
      )}>
      {searchFeatures.map((item) => {
        if (item.type === 'property type') {
          return (
            <PopoverSearch
              key={item.type}
              type={item.type}
              content={item.content}
              filter={filter}
              setFilter={setFilter}
              setSearch={setSearch}>
              <div
                className={cn('px-6', {
                  'bg-white': search === 'property type',
                })}>
                <div className="flex flex-col gap-1">
                  <button className="flex gap-[14px] items-center justify-start text-xs font-semibold">
                    Property
                    <Icon name="ChevronDown" className={cn({ 'rotate-180': search === 'type' })} />
                  </button>
                  <p className="text-sm text-[#6B7280] capitalize">
                    {filter.property_type ? filter?.property_type.split('-')[0] : 'Select Type'}
                  </p>
                </div>
              </div>
            </PopoverSearch>
          );
        } else if (item.type === 'location') {
          return (
            <div
              onClick={() => setSearch('location')}
              className={cn('px-6', {
                'bg-white': search === 'location',
              })}>
              <div className="flex flex-col">
                <label htmlFor="location" className="font-medium text-xs">
                  Location
                </label>

                <LocationFilter setFilter={setFilter} />
              </div>
            </div>
          );
        } else if (item.type === 'price') {
          return (
            <PopoverSearch
              key={item.type}
              type={item.type}
              content={item.content}
              filter={filter}
              setFilter={setFilter}
              setSearch={setSearch}>
              <div
                className={cn('px-6', {
                  'bg-white': search === 'price',
                })}>
                <div className="flex flex-col gap-1">
                  <button className="flex justify-start text-xs font-medium">Budget</button>
                  <p className="text-sm text-gray-500">
                    {/* {filter?.min_price == 0 && filter?.max_price == 0
                      ? 'Min, Max, ...'
                      : `${filter?.min_price} - ${filter?.max_price}`} */}
                    Min, Max..
                  </p>
                </div>
              </div>
            </PopoverSearch>
          );
        } else {
          return (
            <PopoverSearch
              key={item.type}
              type={item.type}
              content={item.content}
              filter={filter}
              setFilter={setFilter}
              setSearch={setSearch}>
              <div
                className={cn('px-6', {
                  'bg-white': search === 'amenity',
                })}>
                <div className="flex flex-col gap-1">
                  <button className="flex gap-4 items-center justify-start text-xs font-medium">
                    Amenities
                  </button>
                  <p className="text-sm text-gray-500">Beds, Baths, ...</p>
                </div>
              </div>
            </PopoverSearch>
          );
        }
      })}

      <button onClick={onSearch} className="rounded-full bg-pink w-full md:w-max  m-2">
        <Icon name="SearchIcon" className="text-white max-sm:hidden" />
        <p className="sm:hidden text-white">Search</p>
      </button>
    </div>
  );
}
