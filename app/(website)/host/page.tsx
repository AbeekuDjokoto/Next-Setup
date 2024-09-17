import { Metadata } from 'next';
import { FindHost } from '@/components/features/website';
import { Suspense } from 'react';
import { Spinner } from '@/components/shared/Loaders';

export const metadata: Metadata = {
  title: 'Find Real Estate Agents in Accra | Ownkey - Connect with the Best',
  description:
    ' Connect with experienced real estate agents in Accra. Ownkey’s Find Agents page helps you discover professionals to guide you through buying, selling, or renting properties.',
  metadataBase: new URL('https://ownkey.com/host'),
};

export default function FindHostPage() {
  return (
    <Suspense
      fallback={
        <div className="container grid place-items-center h-96">
          <Spinner />
        </div>
      }>
      <FindHost />
    </Suspense>
  );
}
