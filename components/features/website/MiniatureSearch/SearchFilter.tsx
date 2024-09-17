'use client';

import { cn } from '@/lib/utils';
import { Chevron, Search as SearchIcon } from '@/public/assets/icons';
import { FilterType } from '@/types';
import { useState } from 'react';
import { LocationFilter } from '../LocationFilter/LocationFilter';
import { AmenityDropdown } from './AmenityDropdown';
import { CustomDropdown } from './CustomDropdown';
import { PopoverSearch } from './PopoverSearch';
import { PriceDropdown } from './PriceDropdown';

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
  { type: 'type', content: CustomDropdown },
  { type: 'location', content: () => <></> },
  { type: 'price', content: PriceDropdown },
  { type: 'amenity', content: AmenityDropdown },
];

export function SearchFilter({ filter, search, setFilter, setSearch, onSearch }: Props) {
  const [openFilters, setOpenFilters] = useState(false);
  // const { openModal, closeModal, contentType, showModal } = useModal();
  return (
    <>
      {!openFilters ? (
        <button
          className="sm:hidden flex items-center justify-between gap-2 border rounded-full overflow-hidden pl-6 text-start"
          onClick={() => setOpenFilters(true)}>
          <div>
            <p className="font-bold">Search</p>
            <p className="text-xs">Find your next home here.</p>
          </div>
          <div className="rounded-full bg-pink w-max p-4 m-2">
            <SearchIcon className="text-white" />
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
        className="!rounded-full !border max-sm:hidden !flex-row"
      />
    </>
  );
}

function PopOvers({ filter, search, setFilter, setSearch, onSearch, className }: PopOversProps) {
  return (
    <div
      className={cn(
        'w-full flex flex-col justify-between ',
        {
          '!max-sm:bg-gray-100': search !== '',
        },
        className,
      )}>
      {searchFeatures.map((item) => {
        if (item.type === 'type') {
          return (
            <PopoverSearch
              key={item.type}
              type={item.type}
              content={item.content}
              filter={filter}
              setFilter={setFilter}
              setSearch={setSearch}>
              <div
                className={cn(
                  '!max-sm:hover:bg-gray-200 min-h-full grow !max-sm:rounded-l-full px-6 flex items-center cursor-pointer border-b border-b-black py-3 md:py-0 md:rounded-none md:border-b-0',
                  {
                    'bg-white !rounded-none md:!rounded-l-full': search === 'type',
                  },
                )}>
                <div className="flex flex-col gap-1">
                  <button className="flex gap-4 items-center justify-start text-xs font-medium">
                    Property <Chevron className={cn({ 'rotate-180': search === 'type' })} />
                  </button>
                  <p className="text-sm text-gray-500 capitalize">
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
              className={cn(
                '!max-sm:hover:bg-gray-200 min-h-full grow px-6 flex items-center cursor-pointer border-b border-b-black py-3 md:py-0 md:rounded-none md:border-b-0',
                {
                  'bg-white !rounded-none md:!rounded-l-full': search === 'location',
                },
              )}>
              <div className="flex flex-col">
                <label htmlFor="location" className="font-medium text-xs">
                  Where
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
                className={cn(
                  '!max-sm:hover:bg-gray-200 min-h-full grow px-6 flex items-center cursor-pointer border-b border-b-black py-3 md:py-0 md:rounded-none md:border-b-0',
                  {
                    'bg-white !rounded-none md:!rounded-l-full': search === 'price',
                  },
                )}>
                <div className="flex flex-col gap-1">
                  <button className="flex justify-start text-xs font-medium">Budget</button>
                  <p className="text-sm text-gray-500">
                    {filter?.min_price == 0 && filter?.max_price == 0
                      ? 'Min, Max, ...'
                      : `${filter?.min_price} - ${filter?.max_price}`}
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
                className={cn(
                  '!max-sm:hover:bg-gray-200 min-h-full grow px-6 flex items-center cursor-pointer border-b border-b-black py-3 md:py-0 md:rounded-none md:border-b-0',
                  {
                    'bg-white !rounded-none md:!rounded-l-full': search === 'amenity',
                  },
                )}>
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

      <button onClick={onSearch} className="rounded-full bg-pink w-full md:w-max p-4 m-2">
        <SearchIcon className="text-white max-sm:hidden" />
        <p className="sm:hidden text-white">Search</p>
      </button>
    </div>
  );
}
