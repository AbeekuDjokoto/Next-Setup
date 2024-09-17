'use client';
import { SubmitHandler } from 'react-hook-form';

import CloseIcon from '@/public/assets/icons/circle-xmark-solid.svg';

import { PropertyAttributeForm } from './property-attribute-form';

interface Props {
  closeModal: (...any: any) => any;
  isLoading: boolean;
  selectedType?: any;
  onCreateAttribute: (...any: any) => any;
}

export function CreatePropertyAttribute({ closeModal, onCreateAttribute, isLoading }: Props) {
  const onSubmit: SubmitHandler<{ name: string }> = (data) => {
    onCreateAttribute(data);
  };
  return (
    <div className="grid gap-8 bg-white rounded-md w-[450px] max-w-[90%] p-6">
      <div className="flex justify-between items-center ">
        <h2 className="font-semibold text-2xl">Create Property Attribute</h2>
        <CloseIcon onClick={closeModal} className="cursor-pointer w-[20px] h-[20px]" />
      </div>

      <PropertyAttributeForm onHandleSubmit={onSubmit} isLoading={isLoading} />
    </div>
  );
}
