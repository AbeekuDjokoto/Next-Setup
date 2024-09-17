'use client';
import React from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';

import { httpClient } from '@/config';
import { useToastify, useModal } from '@/hooks/shared';

interface Amenity {
  slug: string;
  type: any;
  name: string;
  meta: string;
  icon_url?: string;
}

const columns = [
  {
    header: 'Name',
    accessorKey: 'name',
    cell: (info: any) => info.getValue(),
  },
  {
    header: 'Icon',
    accessorKey: 'icon',
    cell: (info: any) => info.getValue(),
  },
  {
    header: 'Type',
    accessorKey: 'type',
  },
  {
    header: 'Meta',
    accessorKey: 'meta',
  },
];

const dropdownActions = {
  uploadIcon: 'UploadIcon',
  edit: 'Edit',
  delete: 'Delete',
};

export function useAmenity(limit?: number) {
  const [file, setFile] = React.useState(null);

  const [page, setPage] = React.useState(1);
  const { successToast, errorToast } = useToastify();
  const [selectType, setSelectType] = React.useState<any>({});

  const { showModal, contentType, closeModal, openModal } = useModal();

  function action(data: { action: string; id: string; obj: any }) {
    switch (data.action) {
      case 'uploadIcon':
        setSelectType(data.obj);
        openModal('upload-icon');
        break;
      case 'edit':
        setSelectType(data.obj);
        openModal('edit-type');
        break;

      case 'delete':
        setSelectType(data.obj);
        openModal('delete-type');
        break;

      default:
        break;
    }
  }

  const {
    data,
    isPending: isLoadingAmenities,
    refetch,
  } = useQuery({
    queryKey: ['amenities', page, limit],
    queryFn: () =>
      httpClient.get(`/amenities?limit=${limit ?? 10}&page=${page}`) as unknown as Promise<{
        page: number;
        total: number;
        result: Amenity[];
      }>,
  });

  const { mutate: onCreateAmenity, isPending: isLoadingCreateAmenity } = useMutation({
    mutationFn: (data: {
      type: string;
      name: string;
      meta: 'TEXT' | 'BOOLEAN' | 'NUMBER' | 'UNIT';
    }) => {
      return httpClient.post('/admin/amenity', data);
    },
    onSuccess: async (data) => {
      refetch();
      closeModal();
      successToast('Amenity successfully created');
    },
    onError: async () => {
      errorToast('Error creating amenity, try again');
    },
  });

  const { mutate: onEditAmenity, isPending: isLoadingEditAmenity } = useMutation({
    mutationFn: (data: {
      type: string;
      name: string;
      meta: 'TEXT' | 'BOOLEAN' | 'NUMBER' | 'UNIT';
    }) => {
      return httpClient.put(`/admin/amenity/${selectType.slug}`, data);
    },
    onSuccess: async () => {
      refetch();
      closeModal();
      successToast('Amenity successfully edited');
    },
    onError: async () => {
      errorToast('Error updating type, try again');
    },
  });
  const { mutate: onDeleteAmenity, isPending: isLoadingDeleteAmenity } = useMutation({
    mutationFn: () => {
      return httpClient.delete(`/admin/amenity/${selectType.slug}`);
    },
    onSuccess: async () => {
      refetch();
      closeModal();
      successToast('Amenity successfully deleted');
    },
    onError: async () => {
      errorToast('Error deleting type, try again');
    },
  });

  const { mutate: onUploadAmenityIcon, isPending: isLoadingUploadAmenityIcon } = useMutation({
    mutationFn: (formData: any) => {
      return httpClient.put(`/admin/amenity/${selectType.slug}/icon`, formData);
    },
    onSuccess: async () => {
      refetch();
      closeModal();
      successToast('Amenity Icon uploaded');
      setFile(null);
    },
    onError: async () => {
      errorToast('Error uploading Amenity Icon, try again');
    },
  });

  const handleAmenityIconUpload = async () => {
    const formData = new FormData();
    if (file) {
      formData.append('icon', file);
    }

    onUploadAmenityIcon(formData);
  };

  return {
    file,
    columns,
    data: data?.result || [],
    page,
    setPage,
    setFile,
    totalPages: (data && Math.ceil(data.total / (limit ?? 10))) || 1,
    action,
    dropdownActions,
    showModal,
    openModal,
    contentType,
    closeModal,
    onCreateAmenity,
    isLoadingCreateAmenity,
    onEditAmenity,
    isLoadingEditAmenity,
    onDeleteAmenity,
    isLoadingDeleteAmenity,
    isLoadingAmenities,
    selectType,
    handleAmenityIconUpload,
    isLoadingUploadAmenityIcon,
  };
}
