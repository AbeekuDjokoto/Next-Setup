import { Spinner } from '@/components/shared/Loaders';
import { FilteredSearchProperties } from '@/components/features/website';
import { Metadata } from 'next';

import React, { Suspense } from 'react';
export const metadata: Metadata = {
  title: 'Find Your Property | Ownkey Search Results - Accra Real Estate',
  description:
    'Search and find properties that match your criteria with Ownkey. View search results for homes, apartments, and lands for sale or rent in Accra.',
  metadataBase: new URL('https://ownkey.com/about-ownkey/search'),
};
export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="container grid place-items-center h-96">
          <Spinner />
        </div>
      }>
      <FilteredSearchProperties />
    </Suspense>
  );
}
