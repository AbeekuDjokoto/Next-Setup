'use client';

import React from 'react';

import { CreateAmenityType, EditAmenityType } from '@/components/features/admin';
import { Modal, Table, Button, DeletePrompt } from '@/components/shared';
import { useAmenityTypes } from '@/hooks/admin';
import PlusIcon from '@/public/assets/icons/circle-plus-solid.svg';

function AmenityTypes() {
  const {
    data,
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
    onCreateAmenityType,
    isLoadingCreateAmenityType,
    onEditAmenityType,
    isLoadingEditAmenityType,
    onDeleteAmenityType,
    isLoadingDeleteAmenityType,
    isLoadingAmenityTypes,
    selectType,
  } = useAmenityTypes();

  const tableData =
    data?.map(({ slug, name, desc }) => {
      return {
        slug,
        name,
        desc,
      };
    }) ?? [];

  return (
    <>
      <div className="grid gap-4 py-6">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-2xl">Amenity Types</h1>
          <Button
            onClick={() => openModal('add-type')}
            className="flex gap-2 items-center max-w-[160px]">
            <PlusIcon /> Create Type
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
          isLoading={isLoadingAmenityTypes}
          isEmpty={!data || data.length === 0}
        />
      </div>

      <Modal show={showModal} hideModal={closeModal}>
        {contentType === 'add-type' && (
          <CreateAmenityType
            closeModal={closeModal}
            onCreateAmenityType={onCreateAmenityType}
            isLoading={isLoadingCreateAmenityType}
          />
        )}
        {contentType === 'edit-type' && (
          <EditAmenityType
            closeModal={closeModal}
            selectType={selectType}
            onEditAmenityType={onEditAmenityType}
            isLoading={isLoadingEditAmenityType}
          />
        )}
        {contentType === 'delete-type' && (
          <DeletePrompt
            closeModal={closeModal}
            onSubmit={onDeleteAmenityType}
            isLoading={isLoadingDeleteAmenityType}
          />
        )}
      </Modal>
    </>
  );
}

export default AmenityTypes;
