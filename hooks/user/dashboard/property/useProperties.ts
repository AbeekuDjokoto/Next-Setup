'use client';
import React from 'react';
import { httpClient } from '@/config';
import { ROUTES } from '@/utils';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { PropertyType } from '@/types';
import { useToastify } from '@/hooks/shared';

export function useProperties(openModal?: (contentType: string) => void, closeModal?: () => void) {
  const router = useRouter();
  const [page, setPage] = React.useState(1);
  const [query, setQuery] = React.useState('');
  const [selectProperty, setSelectProperty] = React.useState<any>({});
  const columns = [
    {
      header: 'Image',
      accessorKey: 'image',
      cell: (info: any) => info.getValue(),
    },
    {
      header: 'Name',
      accessorKey: 'name',
    },
    {
      header: 'Address',
      accessorKey: 'address',
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (info: any) => info.getValue(),
    },
    {
      header: 'Action',
      accessorKey: 'action',
      cell: (info: any) => info.getValue(),
    },
  ];

  const draftDropdownActions = {
    complete: 'complete-post',
    view: 'view',
    delete: 'delete',
    refresh: 'Refresh',
  };
  const completedDropdownActions = {
    view: 'view',
    edit: 'Edit',
    delete: 'delete',
    refresh: 'Refresh',
    suspend: 'Suspend',
    'change status': 'Change',
  };

  function action(data: { action: string; id: string; obj: any }) {
    switch (data.action) {
      case 'complete':
        setSelectProperty(data);
        router.push(
          `${ROUTES.USER.HOST.DASHBOARD.CREATE_PROPERTIES}/${data.id}#property-information`,
        );
        break;
      case 'view':
        setSelectProperty(data);
        router.push(`${ROUTES.USER.HOST.DASHBOARD.PROPERTIES}/${data.id}`);
        break;

      case 'edit':
        router.push(
          `${ROUTES.USER.HOST.DASHBOARD.CREATE_PROPERTIES}/${data.id}#property-information`,
        );
        break;
      case 'refresh':
        if (openModal) {
          setSelectProperty(data.obj);
          openModal('refresh-property');
        }
        break;
      case 'suspend':
        if (openModal) {
          setSelectProperty(data.obj);
          openModal('suspend-property');
        }
        break;

      case 'delete':
        if (openModal) {
          setSelectProperty(data);
          openModal('delete-property');
        }
        break;

      case 'change status':
        if (openModal) {
          setSelectProperty(data);
          openModal('change-property-status');
        }
        break;

      default:
        break;
    }
  }

  const { successToast, errorToast } = useToastify();

  const {
    data,
    isPending: isLoadingProperties,
    refetch,
  } = useQuery({
    queryKey: ['properties', query, page],
    queryFn: () =>
      httpClient.get(`/host/properties?limit=10&page=${page}q=${query}`) as unknown as Promise<{
        result: PropertyType[];
        total: number;
        page: number;
      }>,
  });

  const { mutate, isPending: isLoadingDeleteProperty } = useMutation({
    mutationFn: () => httpClient.delete(`host/property/${selectProperty?.id}`),
    onSuccess: () => {
      refetch();
      successToast('Property successfully deleted');
      if (closeModal) {
        closeModal();
      }
    },
    onError: () => {
      errorToast('Error deleting Property. Try again');
    },
  });

  const { mutate: onChangePropertyStatus, isPending: isChangePropertyStatusPending } = useMutation({
    mutationFn: (data: any) => {
      return httpClient.put(`/host/property/${selectProperty?.id}`, data);
    },
    onSuccess: async (data) => {
      refetch();
      successToast('Property updated successfully');
      if (closeModal) {
        closeModal();
      }
    },
    onError: async (data) => {
      errorToast('Error changing property status. Try again');
    },
  });

  const { mutate: onRefreshProperty, isPending: isRefreshingProperties } = useMutation({
    mutationFn: () => {
      return httpClient.put(`/host/property/refresh/${selectProperty?.id}`);
    },
    onSuccess: async (data) => {
      refetch();
      successToast('Property refreshed successfully');
      if (closeModal) {
        closeModal();
      }
    },
    onError: async (data) => {
      errorToast('Error refreshing property. Try again');
    },
  });

  const { mutate: onSuspendProperty, isPending: isSuspendingProperty } = useMutation({
    mutationFn: () => {
      return httpClient.put(`/host/property/suspend/${selectProperty?.id}`);
    },
    onSuccess: async (data) => {
      refetch();
      successToast('Property suspended successfully');
      if (closeModal) {
        closeModal();
      }
    },
    onError: async (data) => {
      errorToast('Error suspending property. Try again');
    },
  });

  return {
    columns,
    properties: data?.result || [],
    isLoading: isLoadingProperties,
    page,
    setPage,
    totalPages: (data && Math.ceil(data.total / 10)) || 1,
    action,
    draftDropdownActions,
    completedDropdownActions,
    onDeleteProperty: mutate,
    isLoadingDeleteProperty,
    onRefreshProperty,
    isRefreshingProperties,
    query,
    setQuery,
    onChangePropertyStatus,
    isChangePropertyStatusPending,
    onSuspendProperty,
    isSuspendingProperty,
  };
}
