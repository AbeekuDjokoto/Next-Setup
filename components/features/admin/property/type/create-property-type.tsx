'use client';
import { SubmitHandler } from 'react-hook-form';

import CloseIcon from '@/public/assets/icons/circle-xmark-solid.svg';

import { PropertyTypeForm } from './property-type-form';

interface Props {
  closeModal: (...any: any) => any;
  isLoading: boolean;
  selectedType?: any;
  onCreatePropertyType: (...any: any) => any;
}

export function CreatePropertyType({
  closeModal,
  onCreatePropertyType,
  isLoading,
  selectedType,
}: Props) {
  const onSubmit: SubmitHandler<{ name: string }> = (data) => {
    onCreatePropertyType(data);
  };
  return (
    <div className="grid gap-8 bg-white rounded-md w-[550px] max-w-[90%] p-6">
      <div className="flex justify-between items-center ">
        <h2 className="font-semibold text-2xl">Create Property Type</h2>
        <CloseIcon onClick={closeModal} className="cursor-pointer w-[20px] h-[20px]" />
      </div>

      <PropertyTypeForm
        onHandleSubmit={onSubmit}
        isLoading={isLoading}
        selectedType={selectedType}
      />
    </div>
  );
}
