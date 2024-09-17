'use client';
import { SubmitHandler } from 'react-hook-form';

import CloseIcon from '@/public/assets/icons/circle-xmark-solid.svg';

import { HostTypeForm } from './host-type-form';

interface Props {
  // eslint-disable-next-line no-unused-vars
  closeModal: (...any: any) => any;
  isLoading: boolean;
  // eslint-disable-next-line no-unused-vars
  onCreateType: (...any: any) => any;
}

function CreateHostType({ closeModal, onCreateType, isLoading }: Props) {
  const onSubmit: SubmitHandler<{ name: string }> = (data) => {
    onCreateType(data);
  };
  return (
    <div className="grid gap-8 bg-white rounded-md w-[450px] max-w-[90%] p-6">
      <div className="flex justify-between items-center ">
        <h2 className="font-semibold text-2xl">Create Type</h2>
        <CloseIcon onClick={closeModal} className="cursor-pointer w-[20px] h-[20px]" />
      </div>

      <HostTypeForm onHandleSubmit={onSubmit} isLoading={isLoading} />
    </div>
  );
}

export { CreateHostType };
