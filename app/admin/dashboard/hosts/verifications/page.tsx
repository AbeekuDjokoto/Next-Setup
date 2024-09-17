'use client';

import React from 'react';

import { ViewHostVerifications } from '@/components/features/admin';
import { Search, Table } from '@/components/shared';
import { useHostVerifications } from '@/hooks/admin';
import { getStatusVariant } from '@/utils';
import { CModal } from '@/components/shared/Modal/CModal';
import { StatusTag } from '@/components/shared/StatusTag';

export default function AdminVerifications() {
  const {
    verificationsData,
    onUpdateVerification,
    isLoadingVerificationsData,
    isLoadingUpdateVerification,
    verificationDocs,
    verification,
    dropdownActions,
    columns,
    action,
    query,
    onHandleChange,
    showModal,
    contentType,
    closeModal,
  } = useHostVerifications();

  const tableData =
    verificationsData?.map(({ id, user, status }) => {
      return {
        id,
        name: `${user?.firstname} ${user?.lastname}`,
        email: user?.email,
        type: '-',
        dateRegistered: '-',
        status: <StatusTag variant={getStatusVariant(status)}>{status}</StatusTag>,
      };
    }) ?? [];

  return (
    <>
      <div className="w-full grid gap-4 py-6">
        <h1 className="font-bold text-2xl">Verifications</h1>

        <div className="grid gap-3">
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <Search
                value={query}
                onChange={onHandleChange}
                placeholder="search client"
                className="max-w-[300px]"
              />
            </div>
          </div>
          <Table
            noPagination
            action={action}
            dropdownActions={dropdownActions}
            columns={columns}
            data={tableData}
            isLoading={isLoadingVerificationsData}
            isEmpty={!verificationsData || verificationsData.length === 0}
          />
        </div>
      </div>

      <CModal show={showModal} hideModal={closeModal}>
        {contentType === 'view-verification-docs' && (
          <ViewHostVerifications
            closeModal={closeModal}
            verificationDocs={verificationDocs}
            onSubmit={onUpdateVerification}
            verification={verification}
            isLoading={isLoadingUpdateVerification}
          />
        )}
      </CModal>
    </>
  );
}
