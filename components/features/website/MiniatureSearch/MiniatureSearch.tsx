'use client';
import React from 'react';

import { useTabs, useFilteredProperties } from '@/hooks/shared';
import { Icons, TabsUnderline } from '@/components/shared';
import { SearchFilter } from './SearchFilter';
import { ROUTES } from '@/utils';
import { useRouter } from 'next/navigation';

export function MiniatureSearch() {
  const router = useRouter();
  const [search, setSearch] = React.useState('');
  const { setFilter, searchFn, filter, properties, isLoading } = useFilteredProperties();

  const { tabs, setActiveTab, active } = useTabs(
    [
      { label: 'Buy', value: 'FOR_SALE' },
      { label: 'Rent', value: 'FOR_RENT' },
    ],
    '',
  );

  React.useEffect(() => {
    setFilter((prev) => {
      return { ...prev, listing: active };
    });
  }, [active]);

  return (
    <div className="grid gap-4 bg-white m-auto max-w-[800px] p-6 rounded-md md:rounded-xl shadow-md relative">
      <div className="w-max m-auto">
        <TabsUnderline
          tabs={tabs}
          setActiveTab={setActiveTab}
          active={active}
          className="border-none"
        />
      </div>
      <SearchFilter
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
        onSearch={searchFn}
      />
      {filter.q.length > 0 ? (
        <>
          {isLoading ? (
            <div className="w-full h-40 flex items-center justify-center border rounded-lg">
              <Icons.spinner className="animate-spin" />
            </div>
          ) : (
            <>
              {properties.length > 0 ? (
                <div className="w-full h-max max-h-[300px] flex flex-col gap-2 overflow-y-auto border rounded-lg p-4 noscroll-indicator">
                  {properties.map((property) => {
                    return (
                      <div
                        onClick={() => {
                          router.push(`${ROUTES.PROPERTY_DETAILS}/${property.slug}`);
                        }}
                        key={property.slug}
                        className="flex gap-2">
                        <img
                          src={(property && property.images && property?.images[0]) || ''}
                          alt={'image'}
                          className="object-cover  h-12 w-[52px] rounded"
                        />
                        <div>
                          <p>{property.name}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="w-full h-40 flex items-center justify-center border rounded-lg">
                  <p className="font-semibold">No Match Found.</p>
                </div>
              )}
            </>
          )}
        </>
      ) : null}
    </div>
  );
}
