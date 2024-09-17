'use client';
import React from 'react';

import { useQuery, useMutation } from '@tanstack/react-query';
import { httpClient } from '@/config';
import { useModal, useToastify } from '@/hooks/shared';

interface Promotion {
  name: string;
  price: number;
  desc: string;
  duration: number;
}
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
    header: 'Description',
    accessorKey: 'desc',
  },
  {
    header: 'Duration',
    accessorKey: 'duration',
  },
];

export function usePromotions() {
  const { errorToast, successToast } = useToastify();
  const { openModal, closeModal, contentType, showModal } = useModal();
  const [page, setPage] = React.useState(1);

  const dropdownActions = {
    view: 'View',
  };

  function action(data: { action: string; id: string }) {
    switch (data.action) {
      case 'view':
        break;

      default:
        break;
    }
  }

  const {
    data,
    isPending: isLoadingUsers,
    refetch,
  } = useQuery({
    queryKey: ['promotions', page],
    queryFn: () =>
      httpClient.get(`/promotions?limit=10&page=${page}`) as unknown as Promise<{
        page: number;
        total: number;
        result: Promotion[];
      }>,
  });

  const { mutate: onCreatePromotion, isPending: isLoadingCreatePromotion } = useMutation({
    mutationFn: (data: { name: string; price: number; desc: string; duration: number }) => {
      return httpClient.post('/admin/promotion', data);
    },
    onSuccess: () => {
      refetch();
      closeModal();
      successToast('Promotion successfully created');
    },
    onError: () => {
      errorToast('Error creating Promotion');
    },
  });

  return {
    openModal,
    closeModal,
    contentType,
    onCreatePromotion,
    isLoadingCreatePromotion,
    showModal,
    columns,
    promotions: data?.result || [],
    isLoadingUsers,
    page: data?.page || 1,
    setPage,
    totalPages: (data && Math.ceil(data.total / 10)) ?? 1,
    action,
    dropdownActions,
  };
}
