import { useQuery } from '@tanstack/react-query';
import { httpClient } from '@/config';

interface UserType {
  user: any;
  profile: any;
  type: any;
}

export function useGetSingleHost(host_id: string | string[]) {
  const { data, isPending: isLoading } = useQuery({
    queryKey: ['users', host_id],
    queryFn: () => httpClient.get(`/admin/hosts/${host_id}`) as unknown as Promise<UserType>,
  });

  return {
    host: data,
    isLoading,
  };
}
