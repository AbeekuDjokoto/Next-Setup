import { useQuery } from '@tanstack/react-query';
import { httpClient } from '@/config';
import { PropertyType } from '@/types';

export function useGetSingleProperty(property_id: string | string[]) {
  const { data, isPending: isLoading } = useQuery({
    queryKey: ['property', property_id],
    queryFn: () => httpClient.get(`property/${property_id}`) as unknown as Promise<PropertyType>,
  });

  return {
    property: data,
    isLoading,
  };
}
