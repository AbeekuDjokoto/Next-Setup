import React from 'react';

import { Carousel, mockFilter, Search } from '@/components';
import { FilterType } from '@/types';

export function Header() {
  const [search, setSearch] = React.useState('');
  const [filter, setFilter] = React.useState(mockFilter);

  return (
    <header className="px-4">
      <div className="relative">
        <Carousel />
        <div className="max-w-[800px] w-full flex flex-col gap-1 absolute top-[325px] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-col gap-1 max-w-[419px] w-full text-center text-4xl font-bold text-white mx-auto">
            <h2>Discover. Own. Thrive In Accra</h2>
          </div>

          <div className="max-w-[697px] w-full flex flex-col gap-[10px] mx-auto">
            <ul className="bg-white opacity-70 h-12 rounded-full flex max-w-[212px] w-full items-center mx-auto">
              <li className="px-4 py-3">
                Buy
                <div className="h-[2px] w-[9px] bg-[var(--red-100)] mx-auto" />
              </li>
              <li className="px-4 py-3">Rent</li>
              <li className="px-4 py-3">Stays</li>
            </ul>

            <Search
              search={search}
              setSearch={setSearch}
              filter={{
                listing: undefined,
                property_type: undefined,
                min_price: undefined,
                max_price: undefined,
                host_id: undefined,
                street_address: '',
                q: '',
                currency: '',
                amenity: undefined,
                page: undefined,
              }}
              setFilter={function (value: React.SetStateAction<FilterType>): void {
                throw new Error('Function not implemented.');
              }}
              onSearch={function (): void {
                throw new Error('Function not implemented.');
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
