import { useQuery } from '@tanstack/react-query';

import { httpClient } from '@/config';
import { ListingTypes } from '@/types';

type ListingTypesResponse = {
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  page: number;
  result: ListingTypes[];
};

export function useListingTypesList() {
  return useQuery<ListingTypesResponse, Error, ListingTypesResponse['result']>({
    queryKey: ['listing-types', { type: 'list' }],
    queryFn: () => httpClient.get('/listing-types'),
    select: (res) => res?.result ?? [],
  });
}
