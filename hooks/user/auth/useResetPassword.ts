'use client';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { httpClient } from '@/config';
import { useToastify } from '@/hooks/shared';
import { ResetPasswordInputs } from '@/types';
import { ROUTES } from '@/utils';

export const useResetPassword = (type: string) => {
  const { errorToast, successToast } = useToastify();

  const router = useRouter();
  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: (data: ResetPasswordInputs) => {
      return httpClient.post('/auth/password/confirm', data) as unknown as Promise<{
        key: string;
      }>;
    },
    onSuccess: async () => {
      successToast('Success');
      if (type === 'client') {
        router.push(ROUTES.USER.CLIENT.AUTH.LOGIN);
      } else {
        router.push(ROUTES.USER.HOST.AUTH.LOGIN);
      }
    },
    onError: async () => {
      errorToast('Invalid code');
    },
  });

  return { resetPassword: mutate, isLoading };
};
