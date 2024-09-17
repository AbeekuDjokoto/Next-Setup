import { httpClient } from '@/config';
import { useQuery } from '@tanstack/react-query';

export function useHostDashboard() {
  const { data, isPending: isLoading } = useQuery<any, Error, any>({
    queryKey: ['host-dashboard'],
    queryFn: () => httpClient.get('/host'),
  });
  return { data, isLoading };
}
