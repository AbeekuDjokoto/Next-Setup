import { httpClient } from '@/config';
import { useToastify } from '@/hooks/shared';
import { useMutation } from '@tanstack/react-query';

export function useHostSubscription() {
  const { errorToast } = useToastify();

  const { mutate } = useMutation({
    mutationFn: (payload: { subscription_id: number }) => {
      return httpClient.post('/host/subscription', payload);
    },
    onSuccess: async (data: any) => {
      window.location.href = data?.authorization_url;
      return data;
    },
    onError: async (data) => {
      console.log(data);
      errorToast('Failed to initialize payment');
    },
  });

  return {
    initPayment: mutate,
  };
}
