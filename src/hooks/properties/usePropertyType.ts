'use client';
import React from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { CONFIG, httpClient } from '@/config';
import { useModal, useToastify } from '@/shared';

interface PropertyType {
  slug?: string;
  name?: string;
  main_type?: string;
}

export function usePropertyTypes(limit?: number) {
  const queryClient = useQueryClient();

  const [page, setPage] = React.useState(1);
  const { successToast, errorToast } = useToastify();
  const [selectType, setSelectType] = React.useState<PropertyType>({});

  const { showModal, contentType, closeModal, openModal } = useModal();

  const columns = [
    {
      header: 'Name',
      accessorKey: 'name',
      cell: (info: any) => info.getValue(),
    },
    {
      header: 'Main Type',
      accessorKey: 'main_type',
    },
  ];

  const dropdownActions = {
    AssignDefaultAmenities: 'AssignDefaultAmenities',
    edit: 'Edit',
    delete: 'Delete',
  };

  function action(data: { action: string; id: string; obj: any }) {
    switch (data.action) {
      case 'edit':
        setSelectType(data.obj);
        openModal('edit-type');
        break;

      case 'AssignDefaultAmenities':
        setSelectType(data.obj);
        openModal('add-amenity-to-type');
        break;

      case 'delete':
        setSelectType(data.obj);
        openModal('delete-type');
        break;

      default:
        break;
    }
  }

  const {
    data,
    isPending: isLoadingPropertyTypes,
    refetch,
  } = useQuery({
    queryKey: ['property-types', page],
    queryFn: () =>
      httpClient.get(`/property-types?limit=${limit ?? 10}&page=${page}`) as unknown as Promise<{
        result: PropertyType[];
        page: number;
        total: number;
      }>,
  });

  const { data: defaultAmenities, isPending: isLoadingDefaultAmenities } = useQuery({
    queryKey: ['defaultAmenities', selectType.slug],
    queryFn: () =>
      httpClient.get(`/property/${selectType.slug}/amenities`) as unknown as Promise<
        { slug: string; name: string; meta: string }[]
      >,
    enabled: !!selectType.slug,
  });

  const { mutate: onCreatePropertyType, isPending: isLoadingCreatePropertyType } = useMutation({
    mutationFn: (data: { type: string }) => {
      return httpClient.post('/admin/property-type', data);
    },
    onSuccess: async (data) => {
      refetch();
      closeModal();
      successToast('Type successfully created');
    },
    onError: async () => {
      errorToast('Error creating type, try again');
    },
  });
  const { mutate: onEditPropertyType, isPending: isLoadingEditPropertyType } = useMutation({
    mutationFn: (data: { type: string }) => {
      return httpClient.put(`/admin/property-type/${selectType.slug}`, data);
    },
    onSuccess: async (data) => {
      refetch();
      closeModal();
      successToast('Property Type successfully created');
    },
    onError: async () => {
      errorToast('Error creating type, try again');
    },
  });
  const { mutate: onDeletePropertyType, isPending: isLoadingDeletePropertyType } = useMutation({
    mutationFn: () => {
      return httpClient.delete(`/admin/property-type/${selectType.slug}`);
    },
    onSuccess: async () => {
      refetch();
      closeModal();
      successToast('Property Type successfully deleted');
    },
    onError: async () => {
      errorToast('Error deleting Property type, try again');
    },
  });

  const { mutate: onAddAmenityToType, isPending: isLoadingAddAmenityToType } = useMutation({
    mutationFn: (data: { data: string[] }) => {
      return httpClient.post(`/admin/property-types/${selectType.slug}/amenities`, data);
    },
    onSuccess: async (data) => {
      refetch();
      queryClient.invalidateQueries({ queryKey: ['defaultAmenities'] });
      closeModal();
      successToast('Amenity successfully added');
    },
    onError: async () => {
      errorToast('Error creating type, try again');
    },
  });

  return {
    columns,
    propertyTypes: data?.result || [],
    page,
    setPage,
    totalPages: (data && Math.ceil(data.total / 10)) || 1,
    action,
    dropdownActions,
    showModal,
    openModal,
    contentType,
    closeModal,
    onCreatePropertyType,
    onEditPropertyType,
    isLoadingEditPropertyType,
    onDeletePropertyType,
    isLoadingDeletePropertyType,
    setSelectType,
    isLoadingCreatePropertyType,
    isLoadingPropertyTypes,
    selectType,
    onAddAmenityToType,
    isLoadingAddAmenityToType,
    defaultAmenities: defaultAmenities ?? [],
    isLoadingDefaultAmenities,
  };
}
