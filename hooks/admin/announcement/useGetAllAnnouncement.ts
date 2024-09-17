'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

import { ROUTES } from '@/utils';

interface UserType {
  id?: number;
  firstname?: string;
  lastname?: string;
  email?: string;
}

export function useGetAllAnnouncements() {
  const router = useRouter();
  const [query, setQuery] = React.useState('');
  const [page, setPage] = React.useState(1);

  function onHandleChange(search: string) {
    setQuery(search);
  }

  var announcements = [
    { id: 1, title: 'Free Promotions', shared: 'users', date: '01-01-2023' },
    { id: 2, title: 'New Properties', shared: 'Pro Subscriptions', date: '01-01-2023' },
  ];

  const columns = [
    {
      header: 'Title',
      accessorKey: 'title',
      cell: (info: any) => info.getValue(),
    },
    {
      header: 'Shared with',
      accessorKey: 'shared',
    },

    {
      header: 'Date',
      accessorKey: 'createdAt',
    },
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

  return {
    columns,
    announcements,
    page,
    setPage,
    totalPages: 5,
    action,
    dropdownActions,
    query,
    onHandleChange,
  };
}
