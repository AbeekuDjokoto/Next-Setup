'use client';

import React from 'react';

import { CreateHostType, EditHostType } from '@/components/features/admin';
import { Modal, Table, Button, DeletePrompt } from '@/components/shared';
import { useHostTypes } from '@/hooks/admin';
import PlusIcon from '@/public/assets/icons/circle-plus-solid.svg';

function HostTypes() {
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
    onCreateType,
    isLoadingCreateType,
    isLoadingHostTypes,
    isLoadingEditHostType,
    isLoadingDeleteHostType,
    onDeletHostType,
    onEditHostType,
    selectType,
  } = useHostTypes();

  const properyData =
    data?.map(({ slug, name, description }) => {
      return {
        slug,
        name,
        desc: description,
      };
    }) ?? [];

  return (
    <>
      <div className="grid gap-4 py-6">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-2xl">Host Types</h1>
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
          data={properyData}
          isLoading={isLoadingHostTypes}
          isEmpty={!data || data.length === 0}
        />
      </div>

      <Modal show={showModal} hideModal={closeModal}>
        {contentType === 'add-type' && (
          <CreateHostType
            closeModal={closeModal}
            onCreateType={onCreateType}
            isLoading={isLoadingCreateType}
          />
        )}
        {contentType === 'edit-type' && (
          <EditHostType
            closeModal={closeModal}
            selectType={selectType}
            isLoading={isLoadingEditHostType}
            onEditHostType={onEditHostType}
          />
        )}
        {contentType === 'delete-type' && (
          <DeletePrompt
            closeModal={closeModal}
            onSubmit={onDeletHostType}
            isLoading={isLoadingDeleteHostType}
          />
        )}
      </Modal>
    </>
  );
}

export default HostTypes;
