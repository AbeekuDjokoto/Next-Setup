'use client';

import Image from 'next/image';

import { Search, Table } from '@/components/shared';
import { useAllProperties } from '@/hooks/admin';
import { getStatusVariant } from '@/utils';
import { StatusTag } from '@/components/shared/StatusTag';

function Properties() {
  const {
    columns,
    isLoading,
    properties,
    page,
    setPage,
    totalPages,
    action,
    dropdownActions,
    query,
    onHandleChange,
  } = useAllProperties();

  const tableData =
    properties?.map(({ slug, name, location, images, status, host }) => {
      return {
        id: slug,
        image: (
          <img
            src={(images && images[0]) || ''}
            alt={name}
            className="w-[90px] h-[40px] object-cover"
          />
        ),
        name,
        host: `${host?.user?.firstname} ${host?.user?.lastname}`,
        address: location.state,
        status: <StatusTag variant={getStatusVariant(status)}>{status}</StatusTag>,
      };
    }) ?? [];
  return (
    <div className="grid gap-4 py-6">
      <h1 className="font-bold text-2xl">Properties Management</h1>

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
          isLoading={isLoading}
          isEmpty={Boolean(properties && properties.length === 0)}
        />
      </div>
    </div>
  );
}

export default Properties;
