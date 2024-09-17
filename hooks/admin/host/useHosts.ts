'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

import { ROUTES } from '@/utils';
import { useMutation, useQuery } from '@tanstack/react-query';
import { httpClient } from '@/config';
import { useModal, useToastify } from '@/hooks/shared';

interface HostType {
  id?: number;
  created_at: string;
  profile?: { phone: string };
  type?: {
    id: 2407599229;
    created_at: string;
    updated_at: string;
    slug: string;
    name: string;
    icon: string;
    description: string;
  };
  user?: {
    firstname: string;
    lastname: string;
    email: string;
    id: number;
    created_at: string;
    phone: string;
    country: string;
    city: string | null;
    street: string | null;
    dob: string | null;
    profileImage: string;
    subscriberId: string;
  };
  about: string;
  experience: number;
  socials: string | null;
  sales_rate: number;
  rent_rate: number;
  identity_verified: boolean;
  website: string;
  company: string;
}

export function useHosts() {
  const router = useRouter();
  const [query, setQuery] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [selectType, setSelectType] = React.useState<HostType>({} as HostType);
  const { successToast, errorToast } = useToastify();

  const { showModal, contentType, closeModal, openModal } = useModal();

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
      header: 'Type',
      accessorKey: 'type',
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
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (info: any) => info.getValue(),
    },
  ];

  const dropdownActions = {
    view: 'View',
    suspend: 'Suspend',
  };

  function action(data: { action: string; id: string; obj: HostType }) {
    switch (data.action) {
      case 'view':
        router.push(`${ROUTES.ADMIN.DASHBOARD.HOSTS}/${data.id}`);
        break;
      case 'suspend':
        setSelectType(data.obj);
        openModal('suspend-host');
        break;

      default:
        break;
    }
  }

  const {
    data,
    isPending: isLoadingHosts,
    refetch,
  } = useQuery({
    queryKey: ['hosts', page, query],
    queryFn: () =>
      httpClient.get(`/admin/hosts?q=${query}&limit=10&page=${page}`) as unknown as Promise<{
        page: number;
        total: number;
        result: HostType[];
      }>,
  });

  const { mutate: suspendHostMutate, isPending: suspendHostPending } = useMutation({
    mutationFn: () => httpClient.put(`/admin/host/suspend/${selectType?.id}`),
    onSuccess: () => {
      refetch();
      successToast('Agent suspended successfully');
      if (closeModal) {
        closeModal();
      }
    },
    onError: () => {
      errorToast('An error occurred while suspending the agent');
    },
  });

  return {
    columns,
    isLoadingHosts,
    hosts: data?.result || [],
    page,
    setPage,
    totalPages: (data && Math.ceil(data.total / 10)) || 1,
    action,
    dropdownActions,
    query,
    onHandleChange,
    showModal,
    contentType,
    closeModal,
    openModal,
    suspendHostMutate,
    suspendHostPending,
  };
}
