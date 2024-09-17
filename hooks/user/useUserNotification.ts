import { httpClient } from '@/config';
import { INotification } from '@/types';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { useToastify } from '@/hooks/shared';

export function useUserNotification() {
  const queryClient = useQueryClient();
  const { successToast, errorToast } = useToastify();
  const { data, isPending: isLoading } = useQuery({
    queryKey: ['user-notifications'],
    queryFn: () =>
      httpClient.get('/user/notifications') as unknown as Promise<{
        page: number;
        result: INotification[];
        total: number;
      }>,
  });

  const { mutate: onReadNotification, isPending: isLoadingUpdateNotification } = useMutation({
    mutationFn: (id: number) => httpClient.put(`/user/notifications/${id}`),
    onSuccess: () => {
      successToast('Notification updated');
      queryClient.invalidateQueries({ queryKey: ['user-notifications'] });
    },
    onError: () => errorToast('Error updating notification'),
  });

  return {
    notifications: data?.result ?? [],
    isLoading,
    onReadNotification,
    isLoadingUpdateNotification,
  };
}
