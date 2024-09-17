'use client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { httpClient } from '@/config';
import { useToastify } from '@/hooks/shared';
import React from 'react';

interface VerificationType {
  id?: number;
  status?: string;
  note?: string;
  user?: {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    country: string;
    city: string;
    street: string;
    dob: string;
    profileImage: string;
  };
}

export function useHostVerifications() {
  const { successToast, errorToast } = useToastify();
  const [query, setQuery] = React.useState('');
  const [verification, setVerification] = React.useState<VerificationType>({});

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
      header: 'Host Type',
      accessorKey: 'type',
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
  };

  function action(data: { action: string; id: string; obj: any }) {
    switch (data.action) {
      case 'view':
        setVerification(data.obj);
        openModal('view-verification-docs');
        break;

      default:
        break;
    }
  }

  const {
    data: verificationsData,
    isPending: isLoadingVerificationsData,
    refetch,
  } = useQuery({
    queryKey: ['hostVerifications'],
    queryFn: () =>
      httpClient.get('/admin/host/verifications') as unknown as Promise<VerificationType[]>,
  });

  const { data: verificationDocs, isPending: isLoadingVerificationDoc } = useQuery({
    queryKey: ['verification', verification?.id],
    queryFn: () => httpClient.get(`/admin/host/verification/${verification.id}/files`),
    enabled: !!verification.id,
  });

  const { mutate: onUpdateVerification, isPending: isLoadingUpdateVerification } = useMutation({
    mutationFn: (data: object) => {
      return httpClient.put('/admin/host/verification/update', data);
    },
    onSuccess: async (data) => {
      refetch();
      closeModal();
      successToast('Verification updated successfully');
    },
    onError: async () => {
      errorToast('Error updating verification, try again');
    },
  });

  return {
    columns,
    verification,
    verificationsData,
    verificationDocs,
    isLoadingVerificationsData,
    isLoadingVerificationDoc,
    onUpdateVerification,
    isLoadingUpdateVerification,
    action,
    dropdownActions,
    query,
    onHandleChange,
    showModal,
    closeModal,
    openModal,
    contentType,
  };
}
