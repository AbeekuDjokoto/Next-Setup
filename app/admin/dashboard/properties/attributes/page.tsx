'use client';

import React from 'react';

import { CreatePropertyAttribute, EditPropertyAttribute } from '@/components/features/admin';
import { Modal, Table, Button, DeletePrompt } from '@/components/shared';
import { usePropertyAttributes } from '@/hooks/admin';
import PlusIcon from '@/public/assets/icons/circle-plus-solid.svg';

function PropertyAttributes() {
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
    onCreatePropertyAttribute,
    isLoadingCreatePropertyAttribute,
    onEditPropertyAttribute,
    isLoadingEditPropertyAttribute,
    onDeletePropertyAttribute,
    isLoadingDeletePropertyAttribute,
    isLoadingPropertyAttributes,
    selectType,
  } = usePropertyAttributes();

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
          <h1 className="font-bold text-2xl">Property Attributes</h1>
          <Button onClick={() => openModal('add-type')} className="flex gap-2 items-center w-max">
            <PlusIcon /> Create Property Attribute
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
          isLoading={isLoadingPropertyAttributes}
          isEmpty={!data || data.length === 0}
        />
      </div>

      <Modal show={showModal} hideModal={closeModal}>
        {contentType === 'add-type' && (
          <CreatePropertyAttribute
            closeModal={closeModal}
            onCreateAttribute={onCreatePropertyAttribute}
            isLoading={isLoadingCreatePropertyAttribute}
          />
        )}
        {contentType === 'edit-type' && (
          <EditPropertyAttribute
            closeModal={closeModal}
            selectedType={selectType}
            onEditAttribute={onEditPropertyAttribute}
            isLoading={isLoadingEditPropertyAttribute}
          />
        )}
        {contentType === 'delete-type' && (
          <DeletePrompt
            closeModal={closeModal}
            onSubmit={onDeletePropertyAttribute}
            isLoading={isLoadingDeletePropertyAttribute}
          />
        )}
      </Modal>
    </>
  );
}

export default PropertyAttributes;
