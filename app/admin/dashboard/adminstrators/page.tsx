'use client';

import React from 'react';

import { EditAdminRole, InviteAdmin, InviteSuccess } from '@/components/features/admin';
import { CModal } from '@/components/shared/Modal/CModal';
import { DeletePromptReason, Search, Table, Button } from '@/components/shared';
import { useAdmins } from '@/hooks/admin';
import PlusIcon from '@/public/assets/icons/circle-plus-solid.svg';

export default function Administrators() {
  const {
    data,
    dropdownActions,
    totalPages,
    page,
    setPage,
    columns,
    action,
    query,
    onHandleChange,
    showModal,
    contentType,
    closeModal,
    openModal,
    permissions,
    onCreateAdmin,
    isLoadingAdmins,
    isLoadingCreateAdmin,
    selectAdmin,
    onEditAdmin,
    isLoadingEditAdmin,
  } = useAdmins();

  const properyData =
    data?.map(({ id, firstname, lastname, email, roles }) => {
      return {
        id,
        name: `${firstname} ${lastname}`,
        email,
        role: `${roles && roles[0]}`,
        // status: <Status variant={getStatusVariant('pending')}>pending</Status>,
      };
    }) ?? [];

  return (
    <>
      <div className="grid gap-4 py-6">
        <h1 className="font-bold text-2xl">Administrators</h1>

        <div className="grid gap-3">
          <div className="flex justify-between gap-4 max-sm:flex-col">
            <Search
              value={query}
              onChange={onHandleChange}
              placeholder="search Admin"
              className="max-w-[300px]"
            />

            <Button
              onClick={() => openModal('invite-admin')}
              className="flex gap-2 items-center w-max">
              <PlusIcon /> Create Admin
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
            isLoading={isLoadingAdmins}
            isEmpty={!data || data.length === 0}
          />
        </div>
      </div>

      <CModal show={showModal} hideModal={closeModal}>
        {contentType === 'invite-admin' && (
          <InviteAdmin
            closeModal={closeModal}
            permissions={permissions}
            isLoading={isLoadingCreateAdmin}
            onHandleSubmit={onCreateAdmin}
          />
        )}
        {contentType === 'invite-admin-success' && <InviteSuccess />}
        {contentType === 'edit-admin-role' && (
          <EditAdminRole
            selectedAdmin={selectAdmin}
            closeModal={closeModal}
            permissions={permissions}
            isLoading={isLoadingEditAdmin}
            onHandleSubmit={onEditAdmin}
          />
        )}
        {contentType === 'deactivate-admin' && (
          <DeletePromptReason closeModal={closeModal} onHandleSubmit={() => null} />
        )}
      </CModal>
    </>
  );
}
