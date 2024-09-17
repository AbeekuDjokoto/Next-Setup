'use client';
import React from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';

import { httpClient } from '@/config';
import { useToastify, useModal } from '@/hooks/shared';

interface Subscription {
  id?: number;
  desc?: string;
  listing?: number;
  slug?: string;
  name?: string;
  price?: number;
}

export function useSubscription() {
  const [page, setPage] = React.useState(3);
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
      header: 'Price',
      accessorKey: 'price',
    },
    {
      header: 'Number of Listing',
      accessorKey: 'listing',
    },
    {
      header: 'Description',
      accessorKey: 'desc',
      cell: (info: any) => info.getValue(),
    },
  ];

  const dropdownActions = {
    // view: 'View',
    edit: 'Edit',
    delete: 'Delete',
  };

  function action(data: { action: string; id: string; obj: any }) {
    switch (data.action) {
      case 'edit':
        setSelectType(data.obj);
        openModal('edit-subscription');
        break;
      case 'delete':
        setSelectType(data.obj);
        openModal('delete-subscription');


      default:
        break;
    }
  }

  const {
    data,
    isPending: isLoadingSubscriptions,
    refetch,
  } = useQuery({
    queryKey: ['subscriptions'],
    queryFn: () =>
      httpClient.get('/subscriptions') as unknown as Promise<{
        page: number;
        total: number;
        result: Subscription[];
      }>,
  });

  const { mutate: onCreateSubscription, isPending: isLoadingCreateSubscription } = useMutation({
    mutationFn: (data: { name: string; price: number; desc: string }) => {
      return httpClient.post('/admin/subscription', data);
    },
    onSuccess: async (data) => {
      refetch();
      closeModal();
      successToast('Subcription successfully created');
    },
    onError: async () => {
      errorToast('Error creating subscription, try again');
    },
  });

  return {
    columns,
    data: data?.result || [],
    page: data?.page || 1,
    setPage,
    totalPages: (data && Math.ceil(data.total / 10)) || 1,
    action,
    dropdownActions,
    showModal,
    openModal,
    contentType,
    closeModal,
    onCreateSubscription,
    isLoadingCreateSubscription,
    isLoadingSubscriptions,
    selectType,
  };
}
