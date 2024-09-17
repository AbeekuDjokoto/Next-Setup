import { httpClient } from '@/config';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useToastify } from '.';

type Response = { total: number; page: number; result: any[] };

export function useHostReview(host_id: string | string[]) {
  const queryClient = useQueryClient();
  const { successToast, errorToast } = useToastify();
  const { data, isPending: isLoading, refetch } = useQuery<Response, Error>({
    queryKey: ['reviews'],
    queryFn: () => httpClient.get(`/reviews/${host_id}`),
    enabled: false
  });

  const { mutate: onAddReview, isPending: isLoadingCreateReview } = useMutation({
    mutationFn: (data: any) =>
      httpClient.post('/user/host-reviews', { host_id: Number(host_id), ...data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      successToast('review added successfully');
    },
    onError: () => {
      errorToast('error adding review');
    },
  });

  return { reviews: data?.result ?? [], isLoading, onAddReview, isLoadingCreateReview, refetch };
}
