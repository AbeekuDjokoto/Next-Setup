'use client';

import { MyPropertyCard } from '@/components/features/user';
import {
  ClientPagination,
  PropertyCardGrid,
  PropertyListSkeleton,
  ViewType,
} from '@/components/shared';
import { useFilteredProperties } from '@/hooks/shared';
import EmptyHouse from '@/public/assets/icons/house-empty.svg';
import React from 'react';
import { MainSearch } from '../MainSearch';
// import GoogleMap from '@/components/shared/Map/GoogleMap';

export function FilteredSearchProperties() {
  const [viewType, setViewType] = React.useState<string>('grid');
  const {
    properties,
    isLoading,
    // page,
    // setPage,
    totalPages,
    total,
    filter,
    setFilter,
    resetFilter,
  } = useFilteredProperties();

  // const [mapData, setMapData] = React.useState<any>([]);

  // const _onDrawComplete = (polygon: string) => {
  //   setMapData([polygon]);
  // };

  // const _onMapClear = () => setMapData([]);

  // console.log('MAPDATA', mapData);

  return (
    <div className="container relative grid gap-8 py-6">
      <MainSearch filter={filter} setFilter={setFilter} resetFilter={resetFilter} />

      {/* <GoogleMap
        onClear={_onMapClear}
        onComplete={_onDrawComplete}
        zoom={12}
        center={{ lat: 40.712776, lng: -73.700272 }}
      /> */}
      {/* <DrawableMap /> */}

      <div className="flex flex-col gap-4 justify-between relative">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <p className="text-xs py-2">
              <strong>{total}</strong> results
            </p>

            <ViewType viewType={viewType} setViewType={setViewType} />
          </div>
          {isLoading ? (
            <div className="grid gap-4">
              <PropertyListSkeleton />
              <PropertyListSkeleton />
            </div>
          ) : (
            <>
              {properties.length === 0 ? (
                <div className="grid place-items-center py-12">
                  <EmptyHouse className="w-44 h-44" />
                  <div className="grid place-items-center">
                    <h3 className="text-lg font-semibold">Ups!... no results found</h3>
                    <p className="text-sm text-gray-500">Please try another search</p>
                  </div>
                </div>
              ) : (
                <div className="grid gap-8">
                  {viewType === 'list' ? (
                    <div className="flex items-center gap-2 flex-wrap">
                      {properties.map((property) => (
                        <MyPropertyCard property={property} />
                      ))}
                    </div>
                  ) : (
                    <PropertyCardGrid properties={properties} />
                  )}

                  <div className="flex justify-center">
                    <ClientPagination
                      page={filter.page}
                      setPage={(page) => setFilter((prev) => ({ ...prev, page }))}
                      totalPages={totalPages}
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
