'use client';
import { SubmitHandler } from 'react-hook-form';

import CloseIcon from '@/public/assets/icons/circle-xmark-solid.svg';

import { HostTypeForm } from './host-type-form';

interface Props {
  closeModal: (...any: any) => any;
  selectType?: any;
  isLoading: boolean;
  onEditHostType: (...args: any) => void;
}

function EditHostType({ closeModal, selectType, onEditHostType, isLoading }: Props) {
  const onSubmit: SubmitHandler<{ name: string; desc: string }> = (data) => {
    onEditHostType(data);
  };
  return (
    <div className="grid gap-8 bg-white rounded-md w-[450px] max-w-[90%] p-6">
      <div className="flex justify-between items-center ">
        <h2 className="font-semibold text-2xl">Edit Type</h2>
        <CloseIcon onClick={closeModal} className="cursor-pointer w-[20px] h-[20px]" />
      </div>

      <HostTypeForm onHandleSubmit={onSubmit} isLoading={isLoading} selectType={selectType} />
    </div>
  );
}

export { EditHostType };
