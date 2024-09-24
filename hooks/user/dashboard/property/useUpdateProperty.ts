import React from 'react';
import { httpClient } from '@/config';
import { useModal, useToastify } from '@/hooks/shared';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useUpdateProperty(
  propertySlug: string | string[],
  nextFn: () => void,
  refetchProperty: () => void,
  label: string,
  propertyImages: string[] = [],
  propertyName: string,
) {
  const [files, setFiles] = React.useState([]);
  const { showModal, contentType, openModal, closeModal } = useModal();

  const { successToast, errorToast } = useToastify();

  const { mutate, isPending, mutateAsync } = useMutation({
    mutationFn: (data: any) => {
      return httpClient.put(`/host/property/${propertySlug}`, data);
    },
    onSuccess: async (data) => {
      successToast('Property updated successfully');
      refetchProperty();
      closeModal();
      if (label !== 'Review') {
        nextFn();
      }
    },
    onError: async (data) => {
      errorToast('Error try again');
    },
  });

  const { mutateAsync: onUpdatePropertyImage, isPending: isLoadingUploadImage } = useMutation({
    mutationFn: (formData: any) => {
      return httpClient.put(`/host/properties/${propertySlug}/image`, formData);
    },
    onSuccess: async (data) => {
      successToast('Propery Images uploaded');
      refetchProperty();
      setFiles([]);
      closeModal();
      // nextFn();
    },
    onError: async (data) => {
      errorToast('Failed to update property images');
    },
  });

  const propertySlugName = propertyName?.toLowerCase().split(' ').join('-');

  const handlePropertyImageUpload = async () => {
    const newfiles = files.map((file: File, idx) => {
      return new File([file], `${propertySlugName}-${idx}-image`, {
        type: file.type,
      });
    });

    const formData = new FormData();
    newfiles?.forEach((file, index) => {
      formData.append(`image`, file);
    });

    if (files.length === 0 && propertyImages.length > 0) {
      nextFn();
      return;
    }

    await onUpdatePropertyImage(formData);
  };

  return {
    setFiles,
    showModal,
    contentType,
    mediaFiles: files,
    isLoading: isPending,
    isLoadingUploadImage,
    closeModal,
    openModal,
    onUpdateProperty: mutate,
    handlePropertyImageUpload,
    onAsyncUpdateProperty: mutateAsync,
  };
}

export function useChangePropertyStatus(propertySlug: string) {
  const { closeModal } = useModal();
  const { successToast, errorToast } = useToastify();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => {
      return httpClient.put(`/host/property/${propertySlug}`, data);
    },
    onSuccess: async (data) => {
      successToast('Property updated successfully');
      queryClient.invalidateQueries({ queryKey: ['properties', { type: 'host list' }] });
      closeModal();
    },
    onError: async (data) => {
      errorToast('Error try again');
    },
  });
}
