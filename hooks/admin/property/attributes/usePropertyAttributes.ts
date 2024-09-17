'use client';
import { useMutation, useQuery } from '@tanstack/react-query';
import React from 'react';

import { httpClient } from '@/config';
import { useToastify, useModal } from '@/hooks/shared';

interface ListingType {
  slug: string;
  name: string;
}

export function usePropertyAttributes(limit: number = 10) {
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
    isPending: isLoadingPropertyAttributes,
    refetch,
  } = useQuery({
    queryKey: ['property-attributes', page],
    queryFn: () =>
      httpClient.get(`/property-attributes?limit=${limit}&page=${page}`) as unknown as Promise<{
        page: number;
        total: number;
        result: ListingType[];
      }>,
  });

  const { mutate: onCreatePropertyAttribute, isPending: isLoadingCreatePropertyAttribute } =
    useMutation({
      mutationFn: (data: { name: string; desc: string }) => {
        return httpClient.post('/admin/property-attribute', data);
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

  const { mutate: onEditPropertyAttribute, isPending: isLoadingEditPropertyAttribute } =
    useMutation({
      mutationFn: (data: { name: string; desc: string }) => {
        return httpClient.put(`/admin/property-attribute/${selectType.slug}`, data);
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

  const { mutate: onDeletePropertyAttribute, isPending: isLoadingDeletePropertyAttribute } =
    useMutation({
      mutationFn: () => {
        return httpClient.delete(`/admin/property-attribute/${selectType.slug}`);
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
    totalPages: (data && Math.ceil(data.total / limit)) || 1,
    action,
    dropdownActions,
    showModal,
    openModal,
    contentType,
    closeModal,
    onCreatePropertyAttribute,
    isLoadingCreatePropertyAttribute,
    isLoadingPropertyAttributes,
    onEditPropertyAttribute,
    onDeletePropertyAttribute,
    isLoadingDeletePropertyAttribute,
    isLoadingEditPropertyAttribute,
    selectType,
  };
}
