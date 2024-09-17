'use client';

import { Modal, Search, SuspendPrompt, Table } from '@/components/shared';
import { StatusTag } from '@/components/shared/StatusTag';
import { useHosts } from '@/hooks/admin';
import { formatDate, getStatusVariant } from '@/utils';

function Hosts() {
  const {
    hosts,
    dropdownActions,
    totalPages,
    isLoadingHosts,
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
    suspendHostPending,
    suspendHostMutate
  } = useHosts();

  const properyData =
    hosts?.map(({ id, type, profile, user, created_at, identity_verified }) => {
      return {
        id: user?.id,
        name: `${user?.firstname} ${user?.lastname}`,
        email: user?.email,
        type: type?.name,
        phone: user?.phone,
        status: (
          <StatusTag variant={identity_verified ? 'success' : 'destructive'}>
            {identity_verified ? 'Verified' : 'Not Verified'}
          </StatusTag>
        ),
        dateRegistered: formatDate(created_at),
      };
    }) ?? [];

  // function onSuspendHost() {}

  return (
    <>
      <div className="grid gap-4 py-6">
        <h1 className="font-bold text-2xl">Host Management</h1>

        <div className="grid gap-3">
          <div className="flex justify-between">
            <Search
              value={query}
              onChange={onHandleChange}
              placeholder="search client"
              className="max-w-[300px]"
            />
          </div>
          <Table
            action={action}
            dropdownActions={dropdownActions}
            page={page}
            totalPages={totalPages}
            setPage={setPage}
            columns={columns}
            data={properyData}
            isLoading={isLoadingHosts}
            isEmpty={!hosts || hosts.length === 0}
          />
        </div>
      </div>
      <Modal show={showModal} hideModal={closeModal}>
        {contentType === 'suspend-host' && (
          <SuspendPrompt
            closeModal={closeModal}
            onSubmit={suspendHostMutate}
            isLoading={suspendHostPending}
          />
        )}
      </Modal>
    </>
  );
}

export default Hosts;
