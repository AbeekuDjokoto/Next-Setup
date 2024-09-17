import { useQuery } from '@tanstack/react-query';
import { httpClient } from '@/config';
import { PropertyType } from '@/types';

export function useGetSingleHostProperty(property_id: string | string[]) {
  const {
    data,
    isPending: isLoading,
    refetch,
  } = useQuery({
    queryKey: ['property', property_id],
    queryFn: () =>
      httpClient.get(`/host/property/${property_id}`) as unknown as Promise<PropertyType>,
  });

  return {
    property: data,
    isLoading,
    refetchProperty: refetch,
  };
}
