'use client';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { httpClient } from '@/config';
import { useToastify } from '@/hooks/shared';
import { useAuthStore } from '@/stores';
import { ROUTES } from '@/utils';

export const useAdminAuth = () => {
  const { errorToast, successToast } = useToastify();

  const router = useRouter();
  const { authenticate } = useAuthStore();

  const { mutate, isPending } = useMutation({
    mutationFn: (credentials: { email: string; password: string }) => {
      return httpClient.post('/auth/login/admin', credentials) as unknown as Promise<{
        token: string;
      }>;
    },
    onSuccess: async (data) => {
      authenticate({ accessToken: data.token, refreshToken: '' });
      router.push(ROUTES.ADMIN.DASHBOARD.HOME);
      successToast('Successfully logged In');
    },
    onError: async () => {
      errorToast('Invalid email or password');
    },
  });

  return { login: mutate, isLoading: isPending };
};
