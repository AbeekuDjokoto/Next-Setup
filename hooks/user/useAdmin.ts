import { httpClient } from '@/config';
import { useQuery } from '@tanstack/react-query';

export function useAdmin() {
  const { data, isPending: isLoading } = useQuery({
    queryKey: ['admin'],
    queryFn: () => httpClient.get('/admin'),
  });

  return {
    data,
    isLoading,
  };
}
