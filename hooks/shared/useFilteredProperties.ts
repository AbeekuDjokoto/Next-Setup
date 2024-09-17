'use client';

import { httpClient } from '@/config';
import { FilterType, PropertyType } from '@/types';
import { ROUTES } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

type Response = {
  total: number;
  page: number;
  result: PropertyType[];
};
const initialFilter = {
  q: '',
  listing: '',
  property_type: '',
  min_price: 0,
  max_price: 0,
  host_id: null,
  location: '',
  street_address: '',
  currency: '',
  page: 1,
};
export function useFilteredProperties(enabled = true) {
  const [enableQuery, setEnableQuery] = React.useState(enabled);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // const [page, setPage] = React.useState(1);
  const min_price = searchParams.get('min_price');
  const max_price = searchParams.get('max_price');
  const listing = searchParams.get('listing');
  const property_type = searchParams.get('property_type');
  const street_address = searchParams.get('street_address');
  const currency = searchParams.get('currency');
  const amenity = searchParams.get('amenity');
  const page = searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1;

  // {"slug": "washing-machine-2057020119", "value": 5}

  const [filter, setFilter] = useState<FilterType>({
    listing: listing ?? '',
    property_type: property_type ?? '',
    min_price: min_price ?? 0,
    max_price: max_price ?? 0,
    street_address: street_address ?? '',
    currency: currency ?? '',
    amenity: amenity ?? '',
    q: '',
    host_id: '',
    page,
  });

  const {
    data,
    isPending: isLoading,
    refetch,
  } = useQuery<Response, Error, Response>({
    queryKey: [
      'filtered-properties',
      filter.q,
      filter.listing,
      page,
      listing,
      min_price,
      max_price,
      property_type,
      filter.host_id,
      street_address,
      currency,
      amenity,
    ],
    queryFn: () =>
      httpClient.get(
        `/properties${getFilters({
          ...filter,
          host_id: filter?.host_id,
          q: filter.q,
          listing: filter.listing,
          // page,
        })}`,
      ),
    enabled: enableQuery,
  });

  function searchFn() {
    const query = getFilters({ page, ...filter });
    router.push(`${ROUTES.SEARCH_PAGE}${query}`);
  }

  function resetFilter() {
    setFilter(initialFilter);
    router.push(pathname);
  }

  function fetchSingleHostProperties(host_id: string) {
    setEnableQuery(true);
    setFilter((prev) => ({ ...prev, host_id }));
    // refetch();
  }

  useEffect(() => {
    if (pathname.startsWith('/search')) {
      router.push(`${pathname}${getFilters(filter)}`);
    }
  }, [filter, filter.amenity]);

  useEffect(() => {
    if (searchParams.get('page')) {
      setFilter((prev) => {
        return {
          ...prev,
          page: parseInt(searchParams.get('page')!),
        };
      });
    }
  }, [searchParams]);

  return {
    isLoading,
    searchFn,
    setFilter,
    filter,
    page,
    resetFilter,
    // setPage,
    total: data?.total,
    properties: data?.result ?? [],
    totalPages: (data && Math.ceil(data.total / 12)) || 1,
    refetch,
    fetchSingleHostProperties,
  };
}

function getFilters(filter: any) {
  let filterStr = '';
  Object.entries(filter).map(([key, value]) => {
    if (value) {
      if (filterStr.length > 0) {
        filterStr = `${filterStr}&${key}=${value}`;
      } else {
        filterStr = `?${key}=${value}`;
      }
    }
  });

  return filterStr;
}
