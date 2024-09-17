'use client';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { useToastify } from '@/hooks/shared';
import { ROUTES } from '@/utils';
import { httpClient } from '@/config';

export const useForgotPassword = (type: string) => {
  const { errorToast, successToast } = useToastify();
  const router = useRouter();
  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: (email: string) => {
      return httpClient.post('/auth/password/reset', {
        email,
      }) as unknown as Promise<{
        key: string;
      }>;
    },
    onSuccess: async (data) => {
      successToast('Verification code send');
      if (type === 'client') {
        router.push(`${ROUTES.USER.CLIENT.AUTH.FORGOT_PASSWORD}/${data.key}`);
      } else {
        router.push(`${ROUTES.USER.HOST.AUTH.FORGOT_PASSWORD}/${data.key}`);
      }
    },
    onError: async (data) => {
      errorToast('Invalid email');
    },
  });

  return { forgotPassword: mutate, isLoading };
};
