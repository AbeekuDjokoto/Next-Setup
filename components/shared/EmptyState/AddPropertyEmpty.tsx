'use client';

import Image from 'next/image';

import { Button } from '@/components/shared';
import PlusIcon from '@/public/assets/icons/circle-plus-solid.svg';
import { useAuthStore } from '@/stores/auth';

interface Props {
  openModal: () => void;
}
function AddPropertyEmpty({ openModal }: Props) {
  const { user } = useAuthStore();
  return (
    <div className="w-full max-w-[500px] flex flex-col gap-6">
      <Image src="/assets/images/add-house.png" width={300} height={120} alt="add property image" />
      <div className="grid gap-3">
        <div className="font-semibold">
          <h2 className="text-2xl">Hi, {user?.firstname}! Ready to add your property?</h2>
          <p className="text-sm">Providing some basic information is the first step</p>
        </div>
        <p className="text-gray-600 font-light">
          Once you publish your listing, it would be visible on the Ownkey for buyers and renters to
          find.
        </p>
      </div>
      <Button variant="default" onClick={openModal} className="flex gap-2 items-center w-max">
        <PlusIcon /> Add Property
      </Button>
    </div>
  );
}

export { AddPropertyEmpty };
