import { httpClient } from '@/config';
import { useQuery } from '@tanstack/react-query';

type Response = {
  page: number;
  result: any[];
  total: number;
};
export function useFeaturedProperties() {
  const { data, isPending: isLoading } = useQuery<Response, Error, Response>({
    queryKey: ['featured-properties'],
    queryFn: () => httpClient.get('properties/featured'),
  });

  return {
    properties: data?.result ?? [],
    isLoading,
  };
}
