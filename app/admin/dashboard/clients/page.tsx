'use client';

import { Search, Table } from '@/components/shared';
import { useClients } from '@/hooks/admin';
import { formatDate } from '@/utils';

function Clients() {
  const {
    users,
    isLoadingUsers,
    dropdownActions,
    totalPages,
    page,
    setPage,
    columns,
    action,
    query,
    onHandleChange,
  } = useClients();

  const tableData =
    users?.map(({ id, firstname, lastname, email, created_at, phone }) => {
      return {
        id,
        name: `${firstname} ${lastname}`,
        email,
        phone: phone || '-',
        dateRegistered: formatDate(created_at),
      };
    }) ?? [];
  return (
    <>
      <div className="grid gap-4 py-6">
        <h1 className="font-bold text-2xl">Customer Management</h1>

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
            data={tableData}
            isLoading={isLoadingUsers}
            isEmpty={!users || users.length === 0}
          />
        </div>
      </div>
    </>
  );
}

export default Clients;
