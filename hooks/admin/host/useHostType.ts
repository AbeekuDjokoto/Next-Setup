'use client';
import { useMutation, useQuery } from '@tanstack/react-query';
import React from 'react';

import { httpClient } from '@/config';
import { useModal, useToastify } from '@/hooks/shared';

interface HostType {
  slug?: string;
  name?: string;
  icon?: string;
  description?: string;
}

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

export function useHostTypes() {
  const [page, setPage] = React.useState(1);
  const { successToast, errorToast } = useToastify();
  const [selectType, setSelectType] = React.useState<HostType>({});

  const { showModal, contentType, closeModal, openModal } = useModal();

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
    isPending: isLoadingHostTypes,
    refetch,
  } = useQuery({
    queryKey: ['host-types', page],
    queryFn: () =>
      httpClient.get(`/h-types?limit=10&page=${page}`) as unknown as Promise<{
        page: number;
        total: number;
        result: HostType[];
      }>,
  });

  const { mutate: onCreateType, isPending: isLoadingCreateType } = useMutation({
    mutationFn: (data: { name: string; desc: string }) => {
      return httpClient.post('/admin/host-type', data);
    },
    onSuccess: async (data) => {
      refetch();
      closeModal();
      successToast('Type successfully created');
    },
    onError: async () => {
      errorToast('Error creating type, try again');
    },
  });
  const { mutate: onEditHostType, isPending: isLoadingEditHostType } = useMutation({
    mutationFn: (data: { name: string; desc: string }) => {
      return httpClient.put(`/admin/host-type/${selectType.slug}`, data);
    },
    onSuccess: async (data) => {
      refetch();
      closeModal();
      successToast('Host Type successfully edited');
    },
    onError: async () => {
      errorToast('Error editing Host Type, try again');
    },
  });
  const { mutate: onDeletHostType, isPending: isLoadingDeleteHostType } = useMutation({
    mutationFn: () => {
      return httpClient.delete(`/admin/host-type/${selectType.slug}`);
    },
    onSuccess: async (data) => {
      refetch();
      closeModal();
      successToast('Host Type successfully deleted');
    },
    onError: async () => {
      errorToast('Error deleting Host Type, try again');
    },
  });

  return {
    columns,
    data: data?.result || [],
    page,
    setPage,
    totalPages: (data && Math.ceil(data.total / 10)) ?? 1,
    action,
    dropdownActions,
    showModal,
    openModal,
    contentType,
    closeModal,
    onCreateType,
    onEditHostType,
    onDeletHostType,
    isLoadingDeleteHostType,
    isLoadingEditHostType,
    isLoadingCreateType,
    isLoadingHostTypes,
    selectType,
  };
}
