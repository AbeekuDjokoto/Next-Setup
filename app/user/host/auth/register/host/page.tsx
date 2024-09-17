'use client';

import { RegisterHostForm } from '@/components/features/user';
import { useHostTypes } from '@/hooks/admin';
import { Spinner } from '@/components/shared/Loaders';
import { getLabelValue, getPayloadValues } from '@/utils';

function Page() {
  const { data, isLoadingHostTypes } = useHostTypes();

  return (
    <>
      {isLoadingHostTypes ? (
        <div className="grid place-items-center h-4/5">
          <Spinner />
        </div>
      ) : (
        <RegisterHostForm hostTypes={getLabelValue(data)} />
      )}
    </>
  );
}

export default Page;
