'use client';
import React from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';

import { CONFIG, httpClient } from '@/config';
import { useToastify, useModal } from '@/hooks/shared';

interface AmenityType {
  slug?: string;
  name?: string;
  icon?: string;
  desc?: string;
}

export function useAmenityTypes() {
  const [page, setPage] = React.useState(1);
  const { successToast, errorToast } = useToastify();
  const [selectType, setSelectType] = React.useState<any>({});

  const { showModal, contentType, closeModal, openModal } = useModal();

  const columns = [
    {
      header: 'Name',
      accessorKey: 'name',
      cell: (info: any) => info.getValue(),
    },
    {
      header: 'Description',
      accessorKey: 'desc',
    },
  ];

  const dropdownActions = {
    edit: 'Edit',
    delete: 'Delete',
  };

  function action(data: { action: string; id: string; obj: any }) {
    switch (data.action) {
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
    isPending: isLoadingAmenityTypes,
    refetch,
  } = useQuery({
    queryKey: ['amenity-types', page],
    queryFn: () =>
      httpClient.get(`/amenity-types?limit=10&page=${page}`) as unknown as Promise<{
        page: number;
        total: number;
        result: AmenityType[];
      }>,
  });

  const { mutate: onCreateAmenityType, isPending: isLoadingCreateAmenityType } = useMutation({
    mutationFn: (data: { name: string; desc: string }) => {
      return httpClient.post('/admin/amenity-type', data);
    },
    onSuccess: async (data) => {
      refetch();
      closeModal();
      successToast('Amenity Type successfully created');
    },
    onError: async () => {
      errorToast('Error creating type, try again');
    },
  });
  const { mutate: onEditAmenityType, isPending: isLoadingEditAmenityType } = useMutation({
    mutationFn: (data: { name: string; desc: string }) => {
      return httpClient.put(`/admin/amenity-type/${selectType.slug}`, data);
    },
    onSuccess: async () => {
      refetch();
      closeModal();
      successToast('Amenity Type successfully edited');
    },
    onError: async () => {
      errorToast('Error editing Amenity type, try again');
    },
  });
  const { mutate: onDeleteAmenityType, isPending: isLoadingDeleteAmenityType } = useMutation({
    mutationFn: () => {
      return httpClient.delete(`/admin/amenity-type/${selectType.slug}`);
    },
    onSuccess: async () => {
      refetch();
      closeModal();
      successToast('Amenity Type successfully deleted');
    },
    onError: async () => {
      errorToast('Error deleting Amenity type, try again');
    },
  });

  return {
    columns,
    data: data?.result || [],
    page,
    setPage,
    totalPages: (data && Math.ceil(data.total / 10)) || 1,
    action,
    dropdownActions,
    showModal,
    openModal,
    contentType,
    closeModal,
    onCreateAmenityType,
    isLoadingCreateAmenityType,
    isLoadingAmenityTypes,
    onEditAmenityType,
    onDeleteAmenityType,
    isLoadingDeleteAmenityType,
    isLoadingEditAmenityType,
    selectType,
  };
}
