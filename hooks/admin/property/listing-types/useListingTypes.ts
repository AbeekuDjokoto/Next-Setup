'use client';
import React from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';

import { httpClient } from '@/config';
import { useToastify, useModal } from '@/hooks/shared';

interface ListingType {
  slug: string;
  name: string;
}

export function useListingTypes() {
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
    isPending: isLoadingListingTypes,
    refetch,
  } = useQuery({
    queryKey: ['listing-types', page],
    queryFn: () =>
      httpClient.get(`/listing-types?limit=10&page=${page}`) as unknown as Promise<{
        page: number;
        total: number;
        result: ListingType[];
      }>,
  });

  const { mutate: onCreateListingType, isPending: isLoadingCreateListingType } = useMutation({
    mutationFn: (data: { name: string; desc: string }) => {
      return httpClient.post('/admin/listing-type', data);
    },
    onSuccess: async (data) => {
      refetch();
      closeModal();
      successToast('Listing Type successfully created');
    },
    onError: async () => {
      errorToast('Error Listing type, try again');
    },
  });

  const { mutate: onEditListingType, isPending: isLoadingEditListingType } = useMutation({
    mutationFn: (data: { name: string; desc: string }) => {
      return httpClient.put(`/admin/listing-type/${selectType.slug}`, data);
    },
    onSuccess: async () => {
      refetch();
      closeModal();
      successToast('Listing Type successfully edited');
    },
    onError: async () => {
      errorToast('Error editing Listing type, try again');
    },
  });

  const { mutate: onDeleteListingType, isPending: isLoadingDeleteListingType } = useMutation({
    mutationFn: () => {
      return httpClient.delete(`/admin/listing-type/${selectType.slug}`);
    },
    onSuccess: async () => {
      refetch();
      closeModal();
      successToast('Listing Type successfully deleted');
    },
    onError: async () => {
      errorToast('Error deleting Listing type, try again');
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
    onCreateListingType,
    isLoadingCreateListingType,
    isLoadingListingTypes,
    onEditListingType,
    onDeleteListingType,
    isLoadingDeleteListingType,
    isLoadingEditListingType,
    selectType,
  };
}
