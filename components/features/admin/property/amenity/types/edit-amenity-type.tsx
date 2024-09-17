'use client';
import { SubmitHandler } from 'react-hook-form';

import CloseIcon from '@/public/assets/icons/circle-xmark-solid.svg';

import { AmenityTypeForm } from './amenity-type-form';

interface Props {
  closeModal: () => any;
  isLoading: boolean;
  onEditAmenityType: (...any: any) => any;
  selectType?: any;
}

function EditAmenityType({ closeModal, onEditAmenityType, isLoading, selectType }: Props) {
  const onSubmit: SubmitHandler<{ name: string }> = (data) => {
    onEditAmenityType(data);
  };
  return (
    <div className="grid gap-8 bg-white rounded-md w-[450px] max-w-[90%] p-6">
      <div className="flex justify-between items-center ">
        <h2 className="font-semibold text-2xl">Edit Amenity Type</h2>
        <CloseIcon onClick={closeModal} className="cursor-pointer w-[20px] h-[20px]" />
      </div>

      <AmenityTypeForm onHandleSubmit={onSubmit} isLoading={isLoading} selectType={selectType} />
    </div>
  );
}

export { EditAmenityType };
