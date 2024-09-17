'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

import { ROUTES } from '@/utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { httpClient } from '@/config';
import { PropertyType } from '@/types';
import { useToastify } from '@/hooks/shared';

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
    header: 'Host',
    accessorKey: 'host',
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
];

const dropdownActions = {
  view: 'View',
};
export function useAllProperties(host?: string | string[]) {
  const queryClient = useQueryClient();

  const router = useRouter();
  const [page, setPage] = React.useState(1);
  const [query, setQuery] = React.useState('');
  const { successToast, errorToast } = useToastify();

  function onHandleChange(search: string) {
    setQuery(search);
  }

  const {
    data,
    isPending: isLoadingProperties,
    refetch,
  } = useQuery({
    queryKey: ['properties', page, host],
    queryFn: () =>
      httpClient.get(`/admin/properties?limit=5&page=${page}&host=${host}`) as unknown as Promise<{
        page: number;
        total: number;
        result: PropertyType[];
      }>,
  });

  const { mutate: onVerifyProperty, isPending: isLoadingVerifyProperty } = useMutation({
    mutationFn: (data: {
      property: string | string[];
      status: 'ACCEPTED' | 'REJECTED';
      reason?: string;
    }) => {
      return httpClient.post('/admin/property/verify', data);
    },
    onSuccess: async (data) => {
      refetch();
      queryClient.invalidateQueries({ queryKey: ['admin-single-property'] });
      successToast('successfully');
    },
    onError: async () => {
      errorToast('Error verifying property, try again');
    },
  });

  function action(data: { action: string; id: string }) {
    switch (data.action) {
      case 'view':
        router.push(`${ROUTES.ADMIN.DASHBOARD.PROPERTIES}/${data.id}`);
        break;

      default:
        break;
    }
  }

  return {
    columns,
    isLoading: isLoadingProperties,
    isLoadingVerifyProperty,
    onVerifyProperty,
    properties: data?.result || [],
    page,
    setPage,
    totalPages: (data && Math.ceil(data.total / 5)) ?? 1,
    action,
    dropdownActions,
    query,
    onHandleChange,
  };
}
