'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { httpClient } from '@/config/axios-client';
import { useToastify } from '@/hooks/shared';
import { RegisterCredentials } from '@/types';
import { ROUTES } from '@/utils';
import { useAuthStore } from '@/stores';

export const useRegisterUser = (type: string) => {
  const { getRegisterCredentials, setRegisterCredentials } = useAuthStore();
  const { errorToast, successToast } = useToastify();

  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: (user: RegisterCredentials) => {
      setRegisterCredentials(user);
      return httpClient.post('/auth/register', user) as unknown as Promise<{
        verification_id: string;
      }>;
    },
    onSuccess: async (data) => {
      successToast('Successful registered user');
      if (type === 'client') {
        router.push(`${ROUTES.USER.CLIENT.AUTH.CREATE_ACCOUNT}/${data.verification_id}`);
      } else {
        router.push(`${ROUTES.USER.HOST.AUTH.CREATE_ACCOUNT}/${data.verification_id}`);
      }
    },
    onError: async (error: any) => {
      errorToast('Email already exist');
      // if (data.response.status == 409) {
      //   errorToast('Email already exist, register with a different email');
      // } else {
      //   errorToast('Error registering user try again');
      // }
    },
  });

  const resendOTP = () => {
    const credentials = getRegisterCredentials();
    if (credentials) {
      mutate(credentials);
    }
  };

  return { registerUser: mutate, isLoading: isPending, resendOTP };
};
