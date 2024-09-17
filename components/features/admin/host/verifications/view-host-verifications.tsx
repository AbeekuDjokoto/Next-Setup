import CloseIcon from '@/public/assets/icons/circle-xmark-solid.svg';
import React from 'react';
import { DenyApprove } from './deny-approve';
import { ViewVerifications } from './view-verifications';

interface Props {
  closeModal: (...args: any) => any;
  verification: any;
  verificationDocs: any;
  onSubmit: (...args: any) => void;
  isLoading: boolean;
}
export function ViewHostVerifications({
  closeModal,
  verification,
  verificationDocs,
  onSubmit,
  isLoading,
}: Props) {
  return (
    <div className="grid gap-4 bg-white max-sm:w-[380px] md:w-[600px] lg:w-[700px] p-6 rounded-md">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-2xl">Verification Documents</h2>
        <CloseIcon onClick={closeModal} className="cursor-pointer w-5 h-5" />
      </div>

      <ViewVerifications docs={verificationDocs} />

      <DenyApprove onHandleSubmit={onSubmit} verification={verification} isLoading={isLoading} />
    </div>
  );
}
