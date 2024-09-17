'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

import { ROUTES } from '@/utils';

export function useHostProperties() {
  const router = useRouter();
  const [page, setPage] = React.useState(1);
  const [query, setQuery] = React.useState('');

  function onHandleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
  }

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
  ];

  const data: any[] = [];

  const dropdownActions = {
    view: 'View',
  };

  function action(data: { action: string; id: string }) {
    switch (data.action) {
      case 'view':
        router.push(`${ROUTES.ADMIN.DASHBOARD.PROPERTIES}/${data.id}`);
        break;

      case 'edit':
        router.push(`/dashboard/properties/${data.id}`);
        break;

      default:
        break;
    }
  }

  return {
    columns,
    data,
    page,
    setPage,
    totalPages: 5,
    action,
    dropdownActions,
    query,
    onHandleChange,
  };
}
