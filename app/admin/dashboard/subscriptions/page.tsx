'use client';

import React from 'react';

import { CreateSubscription, EditSubscription } from '@/components/features/admin';
import { Modal, Table, Button } from '@/components/shared';
import { DeletePromptReason } from '@/components/shared';
import { useSubscription } from '@/hooks/admin';
import PlusIcon from '@/public/assets/icons/circle-plus-solid.svg';

function Subcriptions() {
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
    onCreateSubscription,
    isLoadingCreateSubscription,
    isLoadingSubscriptions,
  } = useSubscription();

  const tableData =
    data?.map(({ id, name, price, desc, listing }) => {
      return {
        id,
        name,
        price,
        desc: <div className="max-w-[400px]">{desc}</div>,
        listing,
      };
    }) ?? [];

  return (
    <>
      <div className="grid gap-4 py-6">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-2xl">Subscriptions</h1>
          <Button
            onClick={() => openModal('create-subscription')}
            className="flex gap-2 items-center w-max">
            <PlusIcon /> Create Subcription
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
          isLoading={isLoadingSubscriptions}
          isEmpty={!data || data.length === 0}
          noPagination
        />
      </div>

      <Modal show={showModal} hideModal={closeModal}>
        {contentType === 'create-subscription' && (
          <CreateSubscription
            closeModal={closeModal}
            onHandleSubmit={onCreateSubscription}
            isLoading={isLoadingCreateSubscription}
          />
        )}
        {contentType === 'edit-subscription' && <EditSubscription closeModal={closeModal} />}
        {contentType === 'delete-subscription' && (
          <DeletePromptReason closeModal={closeModal} onHandleSubmit={() => null} />
        )}
      </Modal>
    </>
  );
}

export default Subcriptions;
