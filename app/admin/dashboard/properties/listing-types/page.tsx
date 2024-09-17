'use client';

import React from 'react';

import { CreateListingType, EditListingType } from '@/components/features/admin';
import { Modal, Table, Button, DeletePrompt } from '@/components/shared';
import { useListingTypes } from '@/hooks/admin';
import PlusIcon from '@/public/assets/icons/circle-plus-solid.svg';

function ListingTypes() {
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
    onCreateListingType,
    isLoadingCreateListingType,
    onEditListingType,
    isLoadingEditListingType,
    onDeleteListingType,
    isLoadingDeleteListingType,
    isLoadingListingTypes,
    selectType,
  } = useListingTypes();

  const tableData =
    data?.map(({ slug, name }) => {
      return {
        slug,
        name,
        desc: '-',
      };
    }) ?? [];

  return (
    <>
      <div className="grid gap-4 py-6">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-2xl">Listing Types</h1>
          <Button onClick={() => openModal('add-type')} className="flex gap-2 items-center w-max">
            <PlusIcon /> Create Listing Type
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
          isLoading={isLoadingListingTypes}
          isEmpty={!data || data.length === 0}
        />
      </div>

      <Modal show={showModal} hideModal={closeModal}>
        {contentType === 'add-type' && (
          <CreateListingType
            closeModal={closeModal}
            onCreateListingType={onCreateListingType}
            isLoading={isLoadingCreateListingType}
          />
        )}
        {contentType === 'edit-type' && (
          <EditListingType
            closeModal={closeModal}
            selectedType={selectType}
            onEditListingType={onEditListingType}
            isLoading={isLoadingEditListingType}
          />
        )}
        {contentType === 'delete-type' && (
          <DeletePrompt
            closeModal={closeModal}
            onSubmit={onDeleteListingType}
            isLoading={isLoadingDeleteListingType}
          />
        )}
      </Modal>
    </>
  );
}

export default ListingTypes;
