'use client';
import { httpClient } from '@/config';
import { useToastify } from '@/hooks/shared';
import { PERMISSIONS } from '@/utils';
import { useMutation, useQuery } from '@tanstack/react-query';
import React from 'react';

interface Admin {
  id?: number;
  firstname?: string;
  lastname?: string;
  email?: string;
  roles?: any;
}

export function useAdmins() {
  const [query, setQuery] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [selectAdmin, setSelectAdmin] = React.useState<any>({});

  const { errorToast, successToast } = useToastify();

  const initialState = { showModal: false, contentType: '' };

  function simpleModalreducer(state: any, action: any) {
    return { ...state, ...action };
  }

  const [{ showModal, contentType }, setModalType] = React.useReducer(
    simpleModalreducer,
    () => initialState,
  );

  function openModal(contentType: string) {
    setModalType({ showModal: true, contentType });
  }
  function closeModal() {
    setModalType({ showModal: false, contentType: '' });
  }

  function onHandleChange(search: string) {
    setQuery(search);
  }

  const columns: any = [
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
      header: 'Role',
      accessorKey: 'role',
    },
    // {
    //   header: 'Status',
    //   accessorKey: 'status',
    //   cell: (info: any) => info.getValue(),
    // },
  ];

  const {
    data,
    isPending: isLoadingAdmins,
    refetch,
  } = useQuery({
    queryKey: ['admins', query],
    queryFn: () =>
      httpClient.get(`/admin/admins?q=${query}`) as unknown as Promise<{
        page: number;
        total: number;
        result: Admin[];
      }>,
  });
  const { data: adminRoles, isPending: isLoadingAdminRoles } = useQuery({
    queryKey: ['admins-roles', query],
    queryFn: () =>
      httpClient.get(`/admin/roles`) as unknown as Promise<{
        permissions: string[];
      }>,
  });

  const { mutate: onCreateAdmin, isPending: isLoadingCreateAdmin } = useMutation({
    mutationFn: (data: { type: string }) => {
      return httpClient.post('/admin', data);
    },
    onSuccess: async () => {
      refetch();
      openModal('invite-admin-success');
      successToast('Admin successfully created');
    },
    onError: async () => {
      errorToast('Error creating Admin, try again');
    },
  });

  const { mutate: onEditAdmin, isPending: isLoadingEditAdmin } = useMutation({
    mutationFn: (data: { type: string }) => {
      return httpClient.put(`/admin/${selectAdmin?.id}/perm`, data);
    },
    onSuccess: async () => {
      refetch();
      closeModal();
      successToast('Admin edited successfully created');
    },
    onError: async () => {
      errorToast('Error editing Admin, try again');
    },
  });

  const dropdownActions = {
    edit: 'Edit',
    // deactivate: 'Deactivate',
  };

  function action(data: { action: string; id: string; obj: any }) {
    switch (data.action) {
      case 'edit':
        setSelectAdmin(data.obj);
        openModal('edit-admin-role');
        break;
      default:
        break;
    }
  }

  return {
    columns,
    data: data?.result || [],
    permissions: PERMISSIONS,
    isLoadingCreateAdmin,
    page: data?.page || 1,
    totalPages: (data && Math.ceil(data.total / 10)) || 1,
    dropdownActions,
    query,
    showModal,
    contentType,
    isLoadingAdmins,
    selectAdmin,
    isLoadingEditAdmin,
    action,
    setPage,
    openModal,
    closeModal,
    onEditAdmin,
    onCreateAdmin,
    onHandleChange,
  };
}
