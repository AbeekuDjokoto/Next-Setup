'use client';
import { httpClient } from '@/config';
import { useToastify } from '@/hooks/shared';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/utils';
import { useCreatePropertyStore } from '@/stores';

export function useCreateProperty() {
  const router = useRouter();
  const { reset } = useCreatePropertyStore();
  const { successToast, errorToast } = useToastify();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => {
      return httpClient.post('/host/property', data) as unknown as Promise<any>;
    },
    onSuccess: async (data) => {
      if (!data?.slug) {
        errorToast(data?.message);
        return;
      }
      router.push(`${ROUTES.USER.HOST.DASHBOARD.CREATE_PROPERTIES}/${data?.slug}`);
      successToast('Property initialized');
      reset();
    },
    onError: async (data) => {
      errorToast(data?.message ?? 'Error try again');
    },
  });

  return {
    isLoading: isPending,
    onCreateProperty: mutate,
  };
}
