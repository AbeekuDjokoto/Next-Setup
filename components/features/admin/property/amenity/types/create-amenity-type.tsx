'use client';
import { SubmitHandler } from 'react-hook-form';

import CloseIcon from '@/public/assets/icons/circle-xmark-solid.svg';

import { AmenityTypeForm } from './amenity-type-form';

interface Props {
  // eslint-disable-next-line no-unused-vars
  closeModal: (...any: any) => any;
  isLoading: boolean;
  onCreateAmenityType: (...any: any) => any;
}

function CreateAmenityType({ closeModal, onCreateAmenityType, isLoading }: Props) {
  const onSubmit: SubmitHandler<{ name: string }> = (data) => {
    onCreateAmenityType(data);
  };
  return (
    <div className="grid gap-8 bg-white rounded-md w-[450px] max-w-[90%] p-6">
      <div className="flex justify-between items-center ">
        <h2 className="font-semibold text-2xl">Create Amenity Type</h2>
        <CloseIcon onClick={closeModal} className="cursor-pointer w-[20px] h-[20px]" />
      </div>

      <AmenityTypeForm onHandleSubmit={onSubmit} isLoading={isLoading} />
    </div>
  );
}

export { CreateAmenityType };
