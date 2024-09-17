'use client';

import React from 'react';

import {
  AddAmenityToType,
  CreatePropertyType,
  EditPropertyType,
} from '@/components/features/admin';
import { Modal, Table, Button, DeletePrompt } from '@/components/shared';

import { useAmenity, usePropertyTypes } from '@/hooks/admin';
import PlusIcon from '@/public/assets/icons/circle-plus-solid.svg';

export default function PropertyTypes() {
  const {
    propertyTypes,
    dropdownActions,
    totalPages,
    page,
    setPage,
    columns,
    action,
    showModal,
    openModal,
    contentType,
    closeModal,
    onCreatePropertyType,
    isLoadingCreatePropertyType,
    onEditPropertyType,
    isLoadingEditPropertyType,
    onDeletePropertyType,
    isLoadingDeletePropertyType,
    isLoadingPropertyTypes,
    selectType,
    onAddAmenityToType,
    isLoadingAddAmenityToType,
    defaultAmenities,
  } = usePropertyTypes();

  const { data: amenityList } = useAmenity(200);

  const tableData =
    propertyTypes?.map(({ slug, name, main_type }) => {
      return {
        slug,
        name,
        main_type: main_type || '-',
      };
    }) ?? [];

  return (
    <>
      <div className="grid gap-4 py-6">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-2xl">Property Types</h1>
          <Button onClick={() => openModal('add-type')} className="flex gap-2 items-center w-max]">
            <PlusIcon /> Create Property Type
          </Button>
        </div>

        <Table
          action={action}
          dropdownActions={dropdownActions}
          page={page}
          totalPages={totalPages}
          setPage={setPage}
          columns={columns}
          data={tableData}
          isLoading={isLoadingPropertyTypes}
          isEmpty={!propertyTypes || propertyTypes.length === 0}
        />
      </div>

      <Modal show={showModal} hideModal={closeModal}>
        {contentType === 'add-type' && (
          <CreatePropertyType
            closeModal={closeModal}
            onCreatePropertyType={onCreatePropertyType}
            isLoading={isLoadingCreatePropertyType}
          />
        )}
        {contentType === 'edit-type' && (
          <EditPropertyType
            selectedType={selectType}
            closeModal={closeModal}
            onEditPropertyType={onEditPropertyType}
            isLoading={isLoadingEditPropertyType}
          />
        )}
        {contentType === 'add-amenity-to-type' && (
          <AddAmenityToType
            amenityList={amenityList}
            closeModal={closeModal}
            isLoading={isLoadingAddAmenityToType}
            selectType={selectType}
            onAddAmenityToType={onAddAmenityToType}
            defaultAmenities={defaultAmenities}
          />
        )}

        {contentType === 'delete-type' && (
          <DeletePrompt
            closeModal={closeModal}
            onSubmit={onDeletePropertyType}
            isLoading={isLoadingDeletePropertyType}
          />
        )}
      </Modal>
    </>
  );
}
