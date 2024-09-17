'use client';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { httpClient } from '@/config';
import { useAuthStore } from '@/stores';
import { Verify } from '@/types';
import { useToastify } from '@/hooks/shared';
import { ROUTES } from '@/utils';

export const useVerifyOTP = (type: string, to?: string, closeModal?: () => void) => {
  const { successToast, errorToast } = useToastify();
  const { authenticate } = useAuthStore((state) => state);
  const router = useRouter();

  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: (verify: Verify) => {
      return httpClient.post('/auth/login/confirm', verify) as unknown as Promise<{
        accessToken: string;
        refreshToken: string;
      }>;
    },
    onSuccess: async (data) => {
      authenticate(data);

      successToast('Login successfully');
      if (to) {
        router.push(to);
      } else {
        if (type === 'client') {
          router.push(ROUTES.USER.CLIENT.DASHBOARD.PROFILE);
        } else {
          router.push(ROUTES.USER.HOST.DASHBOARD.HOME);
        }
      }

      if (closeModal) {
        closeModal();
      }
    },
    onError: async () => {
      errorToast('Invalid verification code');
    },
  });

  return { verifyOTP: mutate, isLoading };
};
