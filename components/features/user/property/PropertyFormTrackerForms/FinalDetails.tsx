'use client';

import { ToggleSwitch } from '@/components/shared';
import React from 'react';

type Props = {
  hideAddress: boolean;
  availability: boolean;
  negotiable: boolean;
  setHideAddress: React.Dispatch<React.SetStateAction<boolean>>;
  setAvailability: React.Dispatch<React.SetStateAction<boolean>>;
  setNegotiable: React.Dispatch<React.SetStateAction<boolean>>;
};
function FinalDetails({
  setHideAddress,
  setAvailability,
  setNegotiable,
  hideAddress,
  availability,
  negotiable,
}: Props) {
  return (
    <>
      <div className="grid gap-4">
        <div>
          <h2 className="text-xl font-semibold">We've added some final details to save you time</h2>
          <p className="text-gray-500">Here's what we suggest, but feel free to update anything.</p>
        </div>

        <div className="w-full flex justify-between gap-8 md:gap-20">
          <div className="flex flex-col gap-2 justify-start items-start">
            <h4 className="font-semibold">Hide Property Address</h4>
            <p>{hideAddress ? 'Yes' : 'No'}</p>
          </div>

          <ToggleSwitch enabled={hideAddress} setEnabled={setHideAddress} />
        </div>

        <div className="w-full flex justify-between gap-8 md:gap-20">
          <div className="flex flex-col gap-2 justify-start items-start">
            <h4 className="font-semibold">Property Availability</h4>
            <p>{availability ? 'Yes' : 'No'}</p>
          </div>

          <ToggleSwitch enabled={availability} setEnabled={setAvailability} />
        </div>

        <div className="w-full flex justify-between gap-8 md:gap-20">
          <div className="flex flex-col gap-2 justify-start items-start">
            <h4 className="font-semibold">Negotiable</h4>
            <p>{negotiable ? 'Yes' : 'No'}</p>
          </div>

          <ToggleSwitch enabled={negotiable} setEnabled={setNegotiable} />
        </div>
      </div>
    </>
  );
}

export { FinalDetails };
