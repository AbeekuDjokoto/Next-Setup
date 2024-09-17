import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React from 'react';

import Dots from '@/public/assets/icons/three-dots-vertical.svg';

import { TablePagination } from '../Pagination';
import { EmptyState } from '../EmptyState';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../index';
import styles from './Table.module.scss';
import { CubicLoader } from '../Loaders';

interface Props {
  data: any;
  columns: any;
  isLoading: boolean;
  isEmpty: boolean;
  totalPages?: number;
  page?: number;
  // eslint-disable-next-line no-unused-vars
  setPage?: (page: number) => void;
  // eslint-disable-next-line no-unused-vars
  action?: (data: { action: string; id: string; obj: any }) => void;
  dropdownActions?: any;
  emptyType?: string;
  emptyOpenModal?: () => void;
  noPagination?: boolean;
}
export function Table({
  data,
  columns,
  isLoading,
  isEmpty,
  setPage,
  page,
  totalPages,
  action,
  dropdownActions,
  emptyType,
  emptyOpenModal,
  noPagination,
}: Props) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      {isLoading ? (
        <div className="h-[450px] w-full grid place-items-center">
          <CubicLoader />
        </div>
      ) : (
        <>
          {isEmpty ? (
            <div className="w-full flex justify-center items-center border py-8 rounded-md">
              <EmptyState type={emptyType} openModal={emptyOpenModal} />
            </div>
          ) : (
            <>
              <div className={styles.table_wrapper}>
                <table>
                  <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <th key={header.id}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(header.column.columnDef.header, header.getContext())}
                          </th>
                        ))}
                        {action ? <th className="max-w-max-content">Action</th> : null}
                      </tr>
                    ))}
                  </thead>
                  <tbody>
                    {table.getRowModel().rows.map((row) => (
                      <tr key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                          <td key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        ))}
                        {action ? (
                          <td className="max-w-[50px]">
                            <ActionDowndown
                              id={(row.original as { id: string })?.id}
                              dropdownActions={dropdownActions}
                              action={action}
                              obj={row.original}
                            />
                          </td>
                        ) : null}
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    {table.getFooterGroups().map((footerGroup) => (
                      <tr key={footerGroup.id}>
                        {footerGroup.headers.map((header) => (
                          <th key={header.id}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(header.column.columnDef.footer, header.getContext())}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </tfoot>
                </table>
              </div>
              {!noPagination && page && setPage && totalPages && (
                <TablePagination page={page} setPage={setPage} totalPages={totalPages} />
              )}
            </>
          )}
        </>
      )}
    </>
  );
}

export function ActionDowndown({
  dropdownActions,
  action,
  id,
  obj,
}: {
  dropdownActions: any;
  action: any;
  id: any;
  obj?: any;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <div>
          <span className="sr-only">Actions</span>
          <Dots />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(dropdownActions).map(([key]) => {
          return (
            <DropdownMenuItem
              key={key}
              onSelect={() => action({ action: key, id, obj })}
              className="capitalize">
              {key}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
