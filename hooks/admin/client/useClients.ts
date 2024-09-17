'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

import { ROUTES } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { httpClient } from '@/config';

interface UserType {
  id?: number;
  firstname?: string;
  lastname?: string;
  email?: string;
  created_at: string;
  phone: string;
}

export function useClients(limit?: number) {
  const router = useRouter();
  const [query, setQuery] = React.useState('');
  const [page, setPage] = React.useState(1);

  function onHandleChange(search: string) {
    setQuery(search);
  }

  const columns = [
    {
      header: 'Name',
      accessorKey: 'name',
      cell: (info: any) => info.getValue(),
    },
    {
      header: 'Email Address',
      accessorKey: 'email',
    },
    {
      header: 'Phone Number',
      accessorKey: 'phone',
    },
    {
      header: 'Date Registered',
      accessorKey: 'dateRegistered',
    },
    // {
    //   header: 'Status',
    //   accessorKey: 'status',
    //   cell: (info: any) => info.getValue(),
    // },
  ];

  const dropdownActions = {
    view: 'View',
  };

  function action(data: { action: string; id: string }) {
    switch (data.action) {
      case 'view':
        router.push(`${ROUTES.ADMIN.DASHBOARD.CLIENTS}/${data.id}`);
        break;

      default:
        break;
    }
  }

  const { data, isPending: isLoadingUsers } = useQuery({
    queryKey: ['users', query, page],
    queryFn: () =>
      httpClient.get(
        `/admin/users?q=${query}&limit=${limit ?? 10}&page=${page}`,
      ) as unknown as Promise<{
        page: number;
        total: number;
        result: UserType[];
      }>,
  });

  return {
    columns,
    users: data?.result || [],
    isLoadingUsers,
    page: data?.page || 1,
    setPage,
    totalPages: (data && Math.ceil(data.total / 10)) ?? 1,
    action,
    dropdownActions,
    query,
    onHandleChange,
  };
}
