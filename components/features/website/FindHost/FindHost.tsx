'use client';
import React from 'react';

import { Breadcrumb } from 'flowbite-react';
import { ROUTES } from '@/utils';
import { useFilteredHost } from '@/hooks/user';
import { useHostTypes } from '@/hooks/admin';
import EmptyHost from '@/public/assets/icons/host-empty.svg';
import {
  ClientPagination,
  PropertyListSkeleton,
  Button,
  Input,
  HostCard,
  HostListSkeleton,
} from '@/components/shared';

export function FindHost() {
  const { hosts, isLoading, handleChange, filter, setFilter, totalPages } = useFilteredHost();
  const { data: hostTypes } = useHostTypes();

  /*
  * TODO: add commission and experience input boxes to filters.
  */
  return (
    <div className="container grid gap-6 py-6">
      <Breadcrumb aria-label="Default breadcrumb example">
        <Breadcrumb.Item href={ROUTES.HOME}>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Find Agents</Breadcrumb.Item>
      </Breadcrumb>

      <div className="grid gap-6">
        <div className="grid gap-4">
          <h1 className="font-bold text-xl">Find Agents</h1>

          <div className="flex flex-col md:flex-row gap-6 border p-5 rounded-lg">
            <select
              className="w-full sm:max-w-xs border border-gray-200 focus:outline-none rounded-md py-3"
              onChange={handleChange}
              name="type">
              <option>All</option>
              {hostTypes.map((type) => {
                return (
                  <>
                    <option key={type.slug} value={type.slug?.split('-')[1]} className="capitalize">
                      {type.name}
                    </option>
                  </>
                );
              })}
            </select>
            <Input
              id="Location"
              placeholder="Location"
              className="w-full sm:max-w-xs"
              name="location"
              value={filter.location}
              onChange={handleChange}
            />

            <Input
              id="name"
              placeholder="Name"
              name="name"
              className="w-full sm:max-w-xs"
              value={filter.name}
              onChange={handleChange}
            />

            <Button
              className="w-full sm:w-[150px] bg-pink"
              onClick={() => setFilter({ location: '', name: '', type: '', page: 1 })}>
              Show All
            </Button>
          </div>
        </div>
        {isLoading ? (
          <HostListSkeleton />
        ) : (
          <>
            {hosts.length === 0 ? (
              <div className="grid place-items-center h-[400px]">
                <div>
                  <EmptyHost className="w-44 h-44" />
                  <div className="grid place-items-center">
                    <h3 className="text-lg font-semibold">Ups!... no results found</h3>
                    <p className="text-sm text-gray-500">Please try another search</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid gap-2">
                <div className="flex flex-col gap-4 gap-y-8 sm:flex-row flex-wrap">
                  {hosts.map((host) => (
                    <HostCard key={host.id} host={host} className="md:!w-[275px]" />
                  ))}
                </div>

                <ClientPagination
                  page={filter.page}
                  setPage={(page) => setFilter((prev) => ({ ...prev, page }))}
                  totalPages={totalPages}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
