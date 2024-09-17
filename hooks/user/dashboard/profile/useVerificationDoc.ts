import React from 'react';
import { httpClient } from '@/config';
import { useToastify } from '@/hooks/shared';
import { useMutation } from '@tanstack/react-query';

export function useVerificationDoc() {
  const { successToast, errorToast } = useToastify();
  const [files, setFiles] = React.useState([]);

  const { mutate, isPending } = useMutation({
    mutationFn: (formData: any) => {
      return httpClient.post('/host/profile/verify', formData);
    },
    onSuccess: async (data) => {
      successToast('Verification Docs uploaded');
    },
    onError: async (data) => {
      errorToast('Failed to upload verification document');
    },
  });

  const handleVerificationDoc = async () => {
    const formData = new FormData();
    files?.forEach((file, index) => {
      formData.append(`files`, file);
    });

    mutate(formData);
  };
  return {
    files,
    setFiles,
    handleVerificationDoc,
    isPending,
  };
}
