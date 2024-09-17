'use client';
import React from 'react';
import { SearchFilter } from './SearchFilter';
import { FilterType } from '@/types';

type Props = {
  resetFilter: () => void;
  filter: FilterType;
  setFilter: (...args: any) => void;
};
export function MainSearch({ filter, setFilter, resetFilter }: Props) {
  const [search, setSearch] = React.useState('');

  return (
    <div className="flex items-center gap-6 overflow-x-auto noscroll-indicator">
      <SearchFilter
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
        resetFilter={resetFilter}
      />
    </div>
  );
}
