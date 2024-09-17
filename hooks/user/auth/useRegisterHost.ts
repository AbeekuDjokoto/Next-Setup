'use client';
import { useMutation } from '@tanstack/react-query';

import { useRouter } from 'next/navigation';
import { httpClient } from '@/config/axios-client';
import { useToastify } from '@/hooks/shared';
import { ROUTES } from '@/utils';
import { useAuthStore } from '@/stores';

const useRegisterHost = () => {
  const { authenticate } = useAuthStore();
  const { errorToast, successToast } = useToastify();

  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: (user: { type: string }) => {
      return httpClient.post('/user/register/host', user) as unknown as Promise<{
        token: string;
      }>;
    },
    onSuccess: async (data) => {
      authenticate({ accessToken: data.token, refreshToken: '' });

      successToast('Successfully Registered');
      router.push(ROUTES.USER.HOST.DASHBOARD.HOME);
    },
    onError: async (data) => {
      errorToast('Failed to register host');
    },
  });

  return { registerHost: mutate, isLoading: isPending };
};

export { useRegisterHost };
