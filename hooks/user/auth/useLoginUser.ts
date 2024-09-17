'use client';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { httpClient } from '@/config';
import { useToastify } from '@/hooks/shared';
import { LoginCredentials } from '@/types';
import { ROUTES } from '@/utils';
import { useAuthStore } from '@/stores';

export const useLoginUser = (type: string, to?: string, openModal?: () => void) => {
  const { errorToast, successToast } = useToastify();
  const { setLoginCredentials, getLoginCredentials } = useAuthStore();

  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: (credentials: LoginCredentials) => {
      setLoginCredentials(credentials);
      return httpClient.post('/auth/login/verify', credentials) as unknown as Promise<{
        verification_id: string;
      }>;
    },
    onSuccess: async (data: any) => {
      if (!data.verification_id) {
        errorToast(data?.message);
        return;
      }
      successToast('OTP sent successfully');
      if (type === 'client') {
        router.push(
          to
            ? `${to}?code=${data.verification_id}`
            : `${ROUTES.USER.CLIENT.AUTH.VERIFY}/${data.verification_id}`,
        );
      } else {
        router.push(`${ROUTES.USER.HOST.AUTH.VERIFY}/${data?.verification_id}`);
      }
      if (openModal) {
        openModal();
      }
    },
    onError: async (data: any) => {
      errorToast(data?.message);
    },
  });

  const resendOTP = () => {
    const credentials = getLoginCredentials();
    if (credentials) {
      mutate(credentials);
    }
  };

  return { login: mutate, isLoading: isPending, resendOTP };
};
