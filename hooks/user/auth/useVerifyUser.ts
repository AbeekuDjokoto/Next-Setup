'use client';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { httpClient } from '@/config';
import { useAuthStore } from '@/stores';
import { Verify } from '@/types';
import { useToastify } from '@/hooks/shared';
import { ROUTES } from '@/utils';

export const useVerifyUser = (type: string) => {
  const { successToast, errorToast } = useToastify();
  const { authenticate } = useAuthStore((state) => state);
  const router = useRouter();

  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: (verify: Verify) => {
      return httpClient.post('/auth/register/verify', verify) as unknown as Promise<{
        accessToken: string;
        refreshToken: string;
      }>;
    },
    onSuccess: async (data) => {
      authenticate(data);

      successToast('User successfully verified');
      if (type === 'client') {
        router.push(ROUTES.USER.CLIENT.DASHBOARD.PROFILE);
      } else {
        router.push(ROUTES.USER.HOST.AUTH.REGISTER_HOST);
      }
    },
    onError: async () => {
      errorToast('Invalid verification code');
    },
  });

  return { verifyUser: mutate, isLoading };
};
