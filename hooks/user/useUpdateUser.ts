import { httpClient } from '@/config';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToastify } from '@/hooks/shared';

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { successToast, errorToast } = useToastify();
  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: (data: any) => {
      return httpClient.put('/user', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      successToast('Successfully updated user profile');
    },
    onError: () => {
      errorToast('Failed to update user profile');
    },
  });

  const { mutate: onUpdateHost, isPending: isLoadingUpdateHost } = useMutation({
    mutationFn: (data: any) => {
      return httpClient.put('/host/profile', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      successToast('Successfully updated user profile');
    },
    onError: () => {
      errorToast('Failed to update user profile');
    },
  });
  return { onUpdateUser: mutate, isLoading, onUpdateHost, isLoadingUpdateHost };
}
