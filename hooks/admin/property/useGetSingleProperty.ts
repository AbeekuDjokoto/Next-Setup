import { useQuery } from '@tanstack/react-query';
import { httpClient } from '@/config';
import { PropertyType } from '@/types';

export function useGetSingleProperty(property_id: string | string[]) {
  const { data, isPending: isLoading } = useQuery<PropertyType, Error, PropertyType>({
    queryKey: ['admin-single-property', property_id],
    queryFn: () => httpClient.get(`/admin/properties/${property_id}`),
  });

  return {
    property: data,
    isLoading,
  };
}
