import { httpClient } from '@/config';
import { useQuery } from '@tanstack/react-query';

export function useNewlyListedProperties() {
  const { data, isPending: isLoading } = useQuery({
    queryKey: ['newly-listed-properties'],
    queryFn: () =>
      httpClient.get('properties/new') as unknown as Promise<{
        page: number;
        result: any[];
        total: number;
      }>,
  });

  const properties = data?.result?.slice(0, 12) ?? [];

  return {
    properties,
    isLoading,
  };
}
